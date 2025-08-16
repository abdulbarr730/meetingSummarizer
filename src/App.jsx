import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Basic styli

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize this meeting in clear, concise bullet points.');
  const [summary, setSummary] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleGenerateSummary = async () => {
    if (!transcript) {
      setStatusMessage('Please paste a transcript first.');
      return;
    }
    setIsLoading(true);
    setStatusMessage('Generating summary...');
    try {
      const response = await axios.post('/api/summarize', {
        transcript,
        customPrompt: prompt,
      });
      setSummary(response.data.summary);
      setStatusMessage('Summary generated successfully!');
    } catch (error) {
      console.error('Error generating summary:', error);
      setStatusMessage('Failed to generate summary. Please check the console.');
    }
    setIsLoading(false);
  };

  const handleShare = async () => {
    if (!summary || !recipientEmail) {
      setStatusMessage('Please generate a summary and enter a recipient email.');
      return;
    }
    setStatusMessage(`Sending to ${recipientEmail}...`);
    try {
      await axios.post('/api/share', {
        summaryText: summary,
        recipientEmail,
      });
      setStatusMessage(`Summary successfully sent to ${recipientEmail}!`);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>🤖 AI Meeting Notes Summarizer</h1>
      
      <div className="section">
        <h2>1. Upload Transcript</h2>
        <textarea
          rows="10"
          placeholder="Paste your meeting transcript here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
      </div>

      <div className="section">
        <h2>2. Set Instruction</h2>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerateSummary} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>

      <div className="section">
        <h2>3. Review & Edit Summary</h2>
        <textarea
          rows="10"
          placeholder="Your AI-generated summary will appear here..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      
      <div className="section">
        <h2>4. Share via Email</h2>
        <div className="share-section">
          <input
            type="email"
            placeholder="recipient@example.com"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
          <button onClick={handleShare}>Share</button>
        </div>
      </div>

      {statusMessage && <p className="status">{statusMessage}</p>}
    </div>
  );
}

export default App;