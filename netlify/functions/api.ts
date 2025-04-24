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

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  console.log('Received request:', {
    method: event.httpMethod,
    path: event.path,
    body: event.body
  });

  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'text/plain'
      },
      body: '',
    };
  }

  // Handle contact form submission
  if (event.httpMethod === 'POST' && event.path === '/contact') {
    try {
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
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Email sent successfully' }),
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: 'Error sending email',
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
      };
    }
  }

  // Handle GitHub repos request
  if (event.httpMethod === 'GET' && event.path === '/github-repos') {
    try {
      console.log('Fetching GitHub repos');
      const response = await fetch('https://api.github.com/users/CarlosHFZ/repos', {
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

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(repos),
      };
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: 'Error fetching GitHub repos',
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
      };
    }
  }

  // Handle 404 for unknown routes
  console.log('Route not found:', event.path);
  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Not found' }),
  };
};

export default handler;
