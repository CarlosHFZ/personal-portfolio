import { Handler } from '@netlify/functions';
import { z } from "zod";
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

const handler: Handler = async (event) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  // Handle contact form submission
  if (event.httpMethod === 'POST' && event.path === '/api/contact') {
    try {
      const body = JSON.parse(event.body || '{}');
      const validatedData = contactSchema.parse(body);

      const toEmail = process.env.TO_EMAIL || "kalizehnder@gmail.com";
      const senderEmail = process.env.FROM_EMAIL || 'kalizehnder@outlook.com';

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

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Email sent successfully' }),
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Error sending email' }),
      };
    }
  }

  // Handle GitHub repos request
  if (event.httpMethod === 'GET' && event.path === '/api/github-repos') {
    try {
      const response = await fetch('https://api.github.com/users/CarlosHFZ/repos', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'request'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repos');
      }

      const repos = await response.json();

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(repos),
      };
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Error fetching GitHub repos' }),
      };
    }
  }

  // Handle 404 for unknown routes
  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'Not found' }),
  };
};

export { handler };
