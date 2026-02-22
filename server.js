import express from 'express';
import cors from 'cors';
import { OpenRouter } from '@openrouter/sdk';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// OpenRouter API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, apiKey, model, maxTokens, temperature } = req.body;
    
    console.log('Received chat request:', { 
      messages: messages.length, 
      model, 
      apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'none'
    });
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }
    
    console.log('Calling OpenRouter API directly...');
    
    // Use direct fetch to OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:8081',
        'X-Title': 'Pixel Perfect Studio Chatbot',
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-4o-mini',
        messages: messages,
        max_tokens: maxTokens || 1000,
        temperature: temperature || 0.8,
      }),
    });

    console.log('OpenRouter API response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenRouter API error:', error);
      return res.status(response.status).json({ 
        error: error.error?.message || error.error || 'Failed to generate response' 
      });
    }

    const data = await response.json();
    console.log('OpenRouter API success:', {
      choices: data.choices?.length || 0,
      content: data.choices?.[0]?.message?.content?.substring(0, 100) + '...' || 'no content'
    });
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No choices returned from OpenRouter API');
    }
    
    res.json({ 
      content: data.choices[0].message.content 
    });
  } catch (error) {
    console.error('Server error:', {
      message: error.message,
      stack: error.stack,
      status: error.status,
      code: error.code
    });
    res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 OpenRouter proxy ready at http://localhost:${PORT}/api/chat`);
});
