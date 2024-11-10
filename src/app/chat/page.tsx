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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 max-w-xl">

      Fai una domanda riguardo ai{" "}
        <a
          href="https://www.credem.it/content/dam/credem/documenti/Trasparenza/-conti-correnti---fascicoli-dei-servizi-accessori-al-conto/00001_010_FA_P_C_CFA21_P10831.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline inline-flex items-center"
        >
          Servizi accessori al Conto Credem Facile
          <span className="ml-2">📄</span>
        </a>
        
      </h1>
        <div className="flex items-center gap-4 mb-4 w-full max-w-lg">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-700 text-gray-900"
        />
        <button
          onClick={askQuestion}
          className="px-4 py-2 bg-blue-600 text-black font-medium rounded-md hover:bg-blue-700 transition"
        >
          Ask
        </button>
      </div>
      <p className="text-lg text-gray-700 bg-white p-4 rounded-md shadow-md w-full max-w-lg">
        {answer}
      </p>
    </div>
  );
}