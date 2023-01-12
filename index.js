import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;

const configuration = new Configuration({
  apiKey: process.env.CHAT_GPT_KEY,
});
const openai = new OpenAIApi(configuration);

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
