import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";
import axios from "axios";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
    return {
      async sendMail(options: any) {
        const msg = {
          to: options.to,
          from: 'portfolio@carloshenrique.dev', // Use a verified sender
          subject: options.subject,
          text: options.text,
          html: options.html,
          replyTo: options.from
        };
        
        try {
          const response = await sgMail.send(msg);
          return { 
            messageId: response[0]?.headers['x-message-id'] || 'sent-with-sendgrid',
            response: response[0]
          };
        } catch (error) {
          console.error('SendGrid error:', error);
          throw error;
        }
      }
    };
  } else {
    // Fallback to JSON transport if SendGrid not configured
    return nodemailer.createTransport({
      jsonTransport: true
    });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactSchema.parse(req.body);
      
      // Get appropriate email service (SendGrid or development transport)
      const emailService = getEmailService();
      
      // Email content
      const mailOptions = {
        from: validatedData.email,
        to: "kalizehnder@gmail.com", // The recipient email address
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
      
      // Send email
      const info = await emailService.sendMail(mailOptions);
      console.log("Email sent:", info.messageId || 'Mail sent successfully');
      
      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof z.ZodError 
          ? "Invalid form data" 
          : "Failed to send message" 
      });
    }
  });

  // API to fetch GitHub repositories
  app.get("/api/github-repos", async (req, res) => {
    try {
      const username = "CarlosHFZ";
      const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
      
      // Transform the data to match our project format
      const repositories = response.data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Default image
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
