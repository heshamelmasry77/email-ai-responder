import './App.css';
import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  // const [response, setResponse] = useState('');
  function formSubmit(e) {
    e.preventDefault();
    // const response = fetch('http://localhost:3000/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ message }),
    // });
  }

  return (
    <main className="">
      <form onSubmit={formSubmit} className="flex flex-col gap-2 max-w-lg">
        <textarea className="border h-[250px]" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" className="border p-4">
          Submit
        </button>
      </form>
      {/* <div>{response}</div> */}
    </main>
  );
}

export default App;
