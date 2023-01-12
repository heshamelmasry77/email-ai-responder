import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

// process.env.NODE_ENV; // "development"

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.post('/api/createai', async (req, res) => {
  const { message, mood, context, emailType, name, language } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Write a response to the following email in ${language}. Please ensure that the response is written in the same language as the email, unless otherwise specified. The tone of the response should be ${mood}. This is a(n) ${emailType}. Your name is ${name}. If necessary, please use the following additional context to inform your response: ${context} Email provided: '${message}'`,
    temperature: 1,
    max_tokens: 700,
  });

  if (completion) {
    if (completion.data) {
      const response = completion.data.choices[0].text;
      // prettier-ignore
      const dummyResponse = 'Dear, \n\nThank you for your email. We appreciate your interest in our company. We will contact you regularly with important updates that we think you should know about. \n\nKind regards';
      res.json({
        message: response,
        dummy: dummyResponse,
      });
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port 3000');
  console.log(process.env.NODE_ENV);
});
