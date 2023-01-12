import express from 'express';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import bodyParser from 'body-parser';

dotenv.config();

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

const app = express();
app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:3001',
  'http://127.0.0.1:5173',
  'https://email-ai-responder-seven.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

const PORT = 3001;

const configuration = new Configuration({
  apiKey: process.env.CHAT_GPT_KEY,
});
const openai = new OpenAIApi(configuration);

// add middlewares
app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.post(process.env.CREATE_AI_URL, async (req, res) => {
  const {
    message, mood, context, emailType, name, language,
  } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Write a response to the following email in ${language}. Please ensure that the response is written in the same language as the email, unless otherwise specified. The tone of the response should be ${mood}. This is a(n) ${emailType}. Your name is ${name}. If necessary, please use the following additional context to inform your response: ${context} Email provided: '${message}'`,
      temperature: 1,
      max_tokens: 700,
    });
    if (response.data) {
      const responseText = response.data.choices[0].text;
      // prettier-ignore
      const dummyResponse = 'Dear, \n\nThank you for your email. We appreciate your interest in our company. We will contact you regularly with important updates that we think you should know about. \n\nKind regards';
      res.json({
        message: responseText,
        dummy: dummyResponse,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`> Ready on http://localhost:${PORT}`);
  console.log(process.env.CREATE_AI_URL);
});
