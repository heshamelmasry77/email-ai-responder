import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: 'if the api is working, just write "test is ok"',
  temperature: 0.6,
  max_tokens: 10,
});
const response = completion.data.choices[0].text;

app.get('/', (req, res) => {
  res.send(response);
});

app.listen(3001, () => {
  console.log('Listening on port 3000');
});
