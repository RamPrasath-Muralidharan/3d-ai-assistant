const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const chatResponse = await openai.chat.completions.create({
            model: 'llama-3.3-70b-versatile', // or 'gpt-3.5-turbo'
            messages: [{ role: 'user', content: userMessage }],
        });

        const answer = chatResponse.choices[0].message.content;
        res.json({ response: answer });
    } catch (error) {
        console.error('LLM Error:', error.message);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});