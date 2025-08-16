import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { transcript, customPrompt } = req.body;

  if (!transcript || !customPrompt) {
    return res.status(400).json({ error: 'Transcript and prompt are required.' });
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert meeting summarizer. Your goal is to provide clear, structured summaries of transcripts based on the user\'s specific instructions.'
        },
        {
          role: 'user',
          content: `Instruction: "${customPrompt}"\n\nTranscript:\n---\n${transcript}`,
        },
      ],
      model: 'llama3-8b-8192', // A fast and capable model
    });

    const summary = completion.choices[0]?.message?.content || '';
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to generate summary from AI.' });
  }
}