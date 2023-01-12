import './App.css';
import React, { useState } from 'react';
import EmailResponseComponent from './EmailResponseComponent';
import LoadingSpinner from './LoadingSpinner';

const variables = {
  apiURL: import.meta.env.VITE_API_URL,
  chatAiURL: import.meta.env.VITE_CREATE_AI_URL,
};
console.log("react variable test", variables.apiURL + variables.chatAiURL);
function App() {
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('proffesional');
  const [language, setLanguage] = useState('english-uk');
  const [emailType, setEmailType] = useState('personal');
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState('');

  let copyButton;

  async function formSubmit(e) {
    copyButton = '';
    e.preventDefault();
    try {
      setResponse(<LoadingSpinner />);
      const apiResponse = await fetch(variables.apiURL + variables.chatAiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          mood,
          context,
          emailType,
          name,
          language,
        }),
      });
      const data = await apiResponse.json();
      setResponse(data.message);
    } catch (error) {
      // console.log(error);
      setResponse(error);
    }
  }

  if (!response) copyButton = '';
  if (response) {
    copyButton = <EmailResponseComponent response={response} />;
  }

  const test = () => {
    if (emailType === 'buisness') return 'Your companys name';
    return 'Your name';
  };
  return (
    <main className="flex flex-col-reverse md:flex-row w-full gap-10 text-left text-gray-200 h-fit relative backdrop-blur-sm">
      <div className="md:sticky md:top-5 flex flex-col gap-4 p-8 rounded-3xl w-full md:w-2/4 h-fit min-h-[150px] bg-[#121212]/80 break-words">
        {/* <h2 className="font-medium border-b text-xl pb-3"> Email Response </h2> */}
        <pre className="flex flex-col gap-4 whitespace-pre-wrap font-inter">
          {response}
        </pre>
        {copyButton}
      </div>
      <form
        onSubmit={formSubmit}
        className="flex flex-col gap-6 w-full md:w-2/4 rounded-3xl p-12 text-left bg-[#282828]/80"
      >
        <h1 className=" text-2xl font-bold">Email Responder Generator</h1>
        <div className="flex gap-4 w-full">
          <label
            className="w-full flex flex-col gap-2 font-bold"
            htmlFor="language"
          >
            language
            <select
              id="language"
              className="input w-full"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english-uk">🇬🇧 English (UK)</option>
              <option value="english-us">🇺🇸 English (US)</option>
              <option value="norwegian">🇳🇴 Norwegian</option>
              <option value="german">🇩🇪 German</option>
            </select>
          </label>
          <label
            className="font-bold w-full flex flex-col gap-2"
            htmlFor="emailType"
          >
            Email Type
            <select
              id="emailType"
              className="input w-full"
              value={emailType}
              onChange={(e) => setEmailType(e.target.value)}
            >
              <option value="personal"> personal </option>
              <option value="buisness"> buisness </option>
            </select>
          </label>
        </div>
        <label
          className="font-bold w-full flex flex-col gap-2"
          htmlFor="responseTone"
        >
          Tone of response
          <select
            id="responseTone"
            className="input"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="proffesional"> proffesional </option>
            <option value="funny"> funny </option>
            <option value="negative"> negative </option>
            <option value="formal"> formal </option>
            <option value="friendly"> friendly </option>
          </select>
        </label>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="yourName">
            {test()}
          </label>
          <input
            id="yourName"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={test()}
          />
        </div>
        <label className="font-bold flex flex-col gap-2" htmlFor="addContext">
          Add Extra Context
          <input
            id="addContext"
            className="input"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Extra Context"
          />
        </label>
        <label className="font-bold flex flex-col gap-2" htmlFor="emailToReply">
          Email you want to respond to
          <textarea
            id="emailToReply"
            className="font-normal input h-[250px]"
            placeholder="Place the text of the email you want to respond to here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!message} className="btn-orange">
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
