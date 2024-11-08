"use client";
import { useState } from "react";


export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askQuestion = async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    setAnswer(data.reply);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Fai una domanda riguardo ai "Servizi accessori al Conto Credem Facile"</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
      />
      <button onClick={askQuestion}>Ask</button>
      <p>{answer}</p>
    </div>
  );
}