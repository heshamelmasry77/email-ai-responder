import './App.css';
import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('');
  const [language, setLanguage] = useState('');
  const [response, setResponse] = useState('');
  async function formSubmit(e) {
    e.preventDefault();
    try {
      const apiResponse = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, mood, language }),
      });
      const data = await apiResponse.json();
      setResponse(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="">
      <form onSubmit={formSubmit} className="flex flex-col gap-2 max-w-lg">
        <select className="border p-3" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="Norwegian"> Norwegian </option>
          <option value="English"> English </option>
          <option value="Swedish"> Swedish </option>
          <option value="German"> German </option>
        </select>
        <select className="border p-3" value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="proffesional"> proffesional </option>
          <option value="funny"> funny </option>
          <option value="angry"> angry </option>
          <option value="friendly"> friendly </option>
        </select>
        <textarea className="border h-[250px]" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" className="border p-4">
          Submit
        </button>
        <div>{response}</div>
      </form>
    </main>
  );
}

export default App;
