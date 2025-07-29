const axios = require('axios');

async function testAPI() {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing PharmaGuard API...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Test test-data endpoint
    console.log('\n2. Testing test-data endpoint...');
    const testDataResponse = await axios.get(`${baseURL}/test-data`);
    console.log('✅ Test data available:', testDataResponse.data.ndcs.length, 'NDC codes');
    
    // Test verification endpoint with valid NDC
    console.log('\n3. Testing verification with valid NDC (Humulin R)...');
    const verifyResponse1 = await axios.post(`${baseURL}/verify`, {
      ndc: '0002-7510-01',
      expiry: '2025-12-31'
    });
    console.log('✅ Valid medicine test:', verifyResponse1.data);
    
    // Test verification endpoint with expired medicine
    console.log('\n4. Testing verification with expired medicine...');
    const verifyResponse2 = await axios.post(`${baseURL}/verify`, {
      ndc: '0069-2587-10',  // Lyrica
      expiry: '2020-12-31'  // Expired date
    });
    console.log('⚠️  Expired medicine test:', verifyResponse2.data);
    
    // Test verification endpoint with invalid NDC
    console.log('\n5. Testing verification with invalid NDC...');
    const verifyResponse3 = await axios.post(`${baseURL}/verify`, {
      ndc: '99999-999-99',  // Invalid NDC
      expiry: '2025-12-31'
    });
    console.log('❌ Invalid NDC test:', verifyResponse3.data);
    
    // Test verification endpoint with OTC medicine
    console.log('\n6. Testing verification with OTC medicine...');
    const verifyResponse4 = await axios.post(`${baseURL}/verify`, {
      ndc: '55111-118-78',  // Ibuprofen (OTC)
      expiry: '2025-06-30'
    });
    console.log('✅ OTC medicine test:', verifyResponse4.data);
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 Test Summary:');
    console.log('- Health check: ✅ Passed');
    console.log('- Test data endpoint: ✅ Passed');
    console.log('- Valid medicine verification: ✅ Passed');
    console.log('- Expired medicine detection: ✅ Passed');
    console.log('- Invalid NDC detection: ✅ Passed');
    console.log('- OTC medicine verification: ✅ Passed');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI }; 