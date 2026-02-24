// Simple API key test
const testKey = async () => {
  try {
    console.log('Testing API key...');
    
    const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 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'
      }
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ API key is valid');
    } else {
      console.log('❌ API key error:', data);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testKey();
