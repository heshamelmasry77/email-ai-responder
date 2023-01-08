import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
  const { message, mood, language } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `write an ${mood} response to this email in ${language}:${message}`,
    temperature: 1,
    max_tokens: 400,
  });
  const response = completion.data.choices[0].text;
  res.json({
    message: response,
  });
});

app.listen(3001, () => {
  console.log('Listening on port 3000');
});
