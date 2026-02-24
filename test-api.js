// Test OpenRouter API
const API_KEY = "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";

const testAPI = async () => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'http://localhost:8080',
        'X-Title': 'RootNexis Chatbot',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello, how are you?' }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

testAPI();
