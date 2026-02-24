// Test EmailJS configuration
import emailjs from '@emailjs/browser';

console.log('Testing EmailJS configuration...');

// Test the service and template
emailjs.init('-LZ-LhucadphQa8cb');

// Test with minimal data
const testParams = {
  service_id: 'service_d72fmah',
  template_id: 'template_8u9gx89',
  user_id: '-LZ-LhucadphQa8cb',
  template_params: {
    user_name: 'Test User',
    user_email: 'test@example.com',
    message: 'This is a test message from RootNexis contact form.'
  }
};

console.log('📧 Sending test email...');
console.log('📋 Test params:', testParams);

emailjs.send('service_d72fmah', 'template_8u9gx89', testParams.template_params, '-LZ-LhucadphQa8cb')
  .then((result) => {
    console.log('✅ EmailJS test SUCCESS!', result.text);
  })
  .catch((error) => {
    console.error('❌ EmailJS test FAILED...', error);
    console.error('🔍 Full error:', error);
  });
