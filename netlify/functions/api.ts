import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { z } from "zod";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.error('SENDGRID_API_KEY is not set');
}

// Zod validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10)
});

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://carloshfz.netlify.app' 
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json'
};

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  console.log('Node version:', process.version);
  console.log('Received request:', {
    method: event.httpMethod,
    path: event.path,
    body: event.body
  });

  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    // Handle contact form submission
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/api/contact') {
      console.log('Processing contact form submission');
      const body = JSON.parse(event.body || '{}');
      console.log('Parsed body:', body);
      
      const validatedData = contactSchema.parse(body);
      console.log('Validated data:', validatedData);

      const toEmail = process.env.TO_EMAIL || "kalizehnder@gmail.com";
      const senderEmail = process.env.FROM_EMAIL || 'kalizehnder@outlook.com';

      console.log('Sending email to:', toEmail);
      console.log('From:', senderEmail);

      const msg = {
        to: toEmail,
        from: senderEmail,
        subject: validatedData.subject,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\n${validatedData.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `,
        replyTo: validatedData.email
      };

      await sgMail.send(msg);
      console.log('Email sent successfully');

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Email sent successfully' }),
      };
    }

    // Handle GitHub repos request
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/api/github-repos') {
      console.log('Fetching GitHub repos');
      const response = await fetch('https://api.github.com/users/CarlosHFZ/repos?sort=updated&per_page=100', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'request'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub repos: ${response.status} ${response.statusText}`);
      }

      const repos = await response.json();
      console.log(`Fetched ${repos.length} repos`);

      const ignoredRepos = ["personal-portfolio", "gntech-test-carlos", "sistema_ponto", "ponto_web"];
      console.log("Repositories to include:", ignoredRepos);

      const filteredRepos = repos
        .filter((repo: any) => {
          const repoName = repo.name.trim().toLowerCase();
          console.log("Checking repository:", repoName);
          const shouldInclude = ignoredRepos.includes(repoName);
          console.log("Should include:", shouldInclude);
          return shouldInclude;
        })
        .map((repo: any, index: number) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "No description provided",
          image: `/github_images/${index}.png`,
          technologies: repo.topics || [],
          repository: repo.html_url,
          demo: repo.homepage || null
        }));

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(filteredRepos),
      };
    }

    // Handle 404 for unknown routes
    console.log('Route not found:', event.path);
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Not found' }),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export default handler;
