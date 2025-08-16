import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
// IMPORTANT: This 'from' email must be a domain you have verified with Resend.
const fromEmail = 'onboarding@resend.dev'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { summaryText, recipientEmail } = req.body;

  if (!summaryText || !recipientEmail) {
    return res.status(400).json({ error: 'Summary and recipient email are required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Meeting Summary <${fromEmail}>`,
      to: [recipientEmail],
      subject: 'Your AI-Generated Meeting Summary',
      // Using 'text' for a basic email. You could use 'html' for richer formatting.
      text: `Here is the meeting summary you requested:\n\n---\n\n${summaryText}`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json(error);
    }

    res.status(200).json({ message: 'Email sent successfully!', data });
  } catch (error) {
    console.error('Email Sending Error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
}