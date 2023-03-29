const openai = require('openai');
const api_key = 'YOUR_API_KEY_HERE';

const openai_api = new openai(api_key);
const express = require('express');
const app = express();
const port = 3000;

// Set up middleware to handle JSON requests
app.use(express.json());

// Define route for receiving messages
app.post('/chat', async (req, res) => {
  const message = req.body.message;

  // Call OpenAI API to generate a response
  const response = await openai_api.completions.create({
    engine: 'davinci',
    prompt: `User: ${message}\nAI:`,
    max_tokens: 60,
    n: 1,
    stop: '\n',
  });

  // Send response back to client
  res.json({ message: response.choices[0].text.trim() });
});

// Start the server
app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`);
});
