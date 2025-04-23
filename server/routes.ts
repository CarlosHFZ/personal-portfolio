import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";
import axios from "axios";
import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv';

dotenv.config();
// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  console.log("Initializing SendGrid with API key");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("SendGrid initialized successfully");
} else {
  console.log("WARNING: No SendGrid API key found in environment variables");
}

// Zod validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10)
});

// Email service configuration
const getEmailService = () => {
  // Use SendGrid if API key is available
  if (process.env.SENDGRID_API_KEY) {
    console.log("Using SendGrid email service");
    return {
      async sendMail(options: any) {
        // Use verified sender email from env vars or fallback to a default
        const senderEmail = process.env.FROM_EMAIL || 'kalizehnder@outlook.com';
        console.log(`Using sender email: ${senderEmail}`);
        
        const msg = {
          to: options.to,
          from: senderEmail, // Use a verified sender from env vars
          subject: options.subject,
          text: options.text,
          html: options.html,
          replyTo: options.from // Set reply-to as the form submitter's email
        };
        
        console.log("Preparing to send email via SendGrid:", {
          to: msg.to,
          from: msg.from,
          subject: msg.subject,
          replyTo: msg.replyTo
        });
        
        try {
          const response = await sgMail.send(msg);
          console.log("SendGrid API response:", JSON.stringify(response[0]?.statusCode));
          return { 
            messageId: response[0]?.headers['x-message-id'] || 'sent-with-sendgrid',
            response: response[0]
          };
        } catch (error: any) {
          console.error('SendGrid error:', error);
          if (error.response) {
            console.error('SendGrid error details:', error.response.body);
          }
          throw error;
        }
      }
    };
  } else {
    // Fallback to JSON transport if SendGrid not configured
    console.log("SendGrid not configured, using JSON transport fallback");
    return nodemailer.createTransport({
      jsonTransport: true
    });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received:", req.body);
      
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      console.log("Form data validation passed");
      
      // Get recipient email from environment or use default
      const toEmail = process.env.TO_EMAIL || "kalizehnder@gmail.com";
      console.log(`Using recipient email: ${toEmail}`);
      
      // Get appropriate email service (SendGrid or development transport)
      const emailService = getEmailService();
      
      // Email content
      const mailOptions = {
        from: validatedData.email, // This will be used as replyTo by SendGrid service
        to: toEmail,
        subject: `Portfolio Contact: ${validatedData.subject}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          
          Message:
          ${validatedData.message}
        `,
        html: `
          <h3>New contact from portfolio</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `
      };
      
      console.log("Preparing to send email with options:", {
        to: mailOptions.to,
        from: mailOptions.from, // This will be used as replyTo
        subject: mailOptions.subject
      });
      
      // Send email
      try {
        const info = await emailService.sendMail(mailOptions);
        console.log("Email sent successfully:", info);
        
        if (info && info.messageId) {
          console.log("Email message ID:", info.messageId);
        }
        
        res.status(200).json({ success: true, message: "Message sent successfully" });
      } catch (emailError: any) {
        console.error("Error in sendMail function:", emailError);
        
        if (emailError.response && emailError.response.body) {
          console.error("SendGrid API error details:", emailError.response.body);
        }
        
        throw new Error("Failed to send email: " + (emailError.message || "Unknown error"));
      }
    } catch (error: any) {
      console.error("Error in contact form submission:", error);
      
      res.status(400).json({ 
        success: false, 
        message: error instanceof z.ZodError 
          ? "Invalid form data" 
          : error.message || "Failed to send message" 
      });
    }
  });

  // API to fetch GitHub repositories
  app.get("/api/github-repos", async (req, res) => {
    try {
      const username = "CarlosHFZ";
      const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      
      const ignoredRepos = ["personal-portfolio", "gntech-test-carlos", "sistema_ponto", "ponto_web"];

      // Transform the data to match our project format
      const repositories = response.data
      .filter((repo: any) => ignoredRepos.includes(repo.name.trim().toLowerCase()))
      .map((repo: any, index: number) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided",
        image: `/github_images/${index}.png`,
        technologies: repo.topics || [],
        repository: repo.html_url,
        demo: repo.homepage || null
      }));
      
      res.status(200).json(repositories);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      res.status(500).json({ error: "Failed to fetch GitHub repositories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}