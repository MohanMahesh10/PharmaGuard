const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { findDummyNDC, getAllDummyNDCs } = require('./dummy-data');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to validate NDC format
function validateNDCFormat(ndc) {
  // NDC can be in formats: XXXXX-XXX-XX, XXXXX-XXXX-X, or XXXX-XXXX-XX
  const ndcPattern = /^\d{4,5}-\d{3,4}-\d{1,2}$/;
  return ndcPattern.test(ndc);
}

// Helper function to check if medicine is expired
function isExpired(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  return expiry < today;
}

// Helper function to call Gemini API (optional)
async function generateGeminiMessage(ndc, expiryDate, status, fdaData) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  try {
    const productName = fdaData?.brand_name || fdaData?.generic_name || 'Medicine';
    const prompt = `Give a friendly explanation for this medicine's authenticity check: NDC = ${ndc}, Expiry = ${expiryDate}, Status = ${status}, Product = ${productName}. Keep it under 50 words.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.candidates[0]?.content?.parts[0]?.text || null;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    return null;
  }
}

// Helper function to check FDA API with dummy data fallback
async function checkNDC(ndc) {
  try {
    // First try the real FDA API
    console.log(`Checking NDC: ${ndc} against FDA API...`);
    const fdaResponse = await axios.get(
      `https://api.fda.gov/drug/ndc.json?search=product_ndc:${ndc}&limit=1`,
      { timeout: 5000 } // 5 second timeout
    );

    if (fdaResponse.data.results && fdaResponse.data.results.length > 0) {
      console.log(`✅ Found in FDA API: ${ndc}`);
      return fdaResponse.data.results[0];
    }
  } catch (error) {
    console.log(`⚠️  FDA API unavailable or NDC not found: ${error.message}`);
  }

  // Fallback to dummy data
  console.log(`🔍 Checking dummy data for: ${ndc}`);
  const dummyData = findDummyNDC(ndc);
  if (dummyData) {
    console.log(`✅ Found in dummy data: ${ndc}`);
    return dummyData;
  }

  console.log(`❌ NDC not found: ${ndc}`);
  return null;
}

// Main verification endpoint
app.post('/verify', async (req, res) => {
  try {
    const { ndc, expiry } = req.body;

    // Validate input
    if (!ndc || !expiry) {
      return res.status(400).json({
        status: 'error',
        message: 'NDC code and expiry date are required'
      });
    }

    if (!validateNDCFormat(ndc)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid NDC format. Use format: XXXXX-XXX-XX'
      });
    }

    // Check NDC using FDA API with dummy data fallback
    const fdaData = await checkNDC(ndc);

    if (!fdaData) {
      return res.json({
        status: 'fake',
        message: 'NDC not found in database. This medicine may be counterfeit.',
        fda_data: null
      });
    }
    
    // Check expiry date
    const expired = isExpired(expiry);
    let status, message;

    if (expired) {
      status = 'expired';
      message = `${fdaData.brand_name || fdaData.generic_name} has expired on ${expiry}. Do not use.`;
    } else {
      status = 'verified';
      message = `${fdaData.brand_name || fdaData.generic_name} is verified and valid until ${expiry}.`;
    }

    // Try to get Gemini-generated message
    const geminiMessage = await generateGeminiMessage(ndc, expiry, status, fdaData);
    
    res.json({
      status,
      message: geminiMessage || message,
      fda_data: {
        brand_name: fdaData.brand_name,
        generic_name: fdaData.generic_name,
        dosage_form: fdaData.dosage_form,
        route: fdaData.route,
        marketing_status: fdaData.marketing_status,
        labeler_name: fdaData.labeler_name
      }
    });

  } catch (error) {
    console.error('Verification error:', error.message);
    
    res.status(500).json({
      status: 'error',
      message: 'Server error during verification'
    });
  }
});

// Test data endpoint - shows available NDC codes for testing
app.get('/test-data', (req, res) => {
  const availableNDCs = getAllDummyNDCs();
  res.json({
    message: 'Available NDC codes for testing',
    ndcs: availableNDCs,
    examples: [
      {
        ndc: '0002-7510-01',
        name: 'Humulin R (insulin)',
        description: 'Prescription insulin injection'
      },
      {
        ndc: '0069-2587-10',
        name: 'Lyrica (pregabalin)',
        description: 'Prescription pain medication'
      },
      {
        ndc: '55111-118-78',
        name: 'Ibuprofen',
        description: 'Over-the-counter pain reliever'
      },
      {
        ndc: '12345-678-90',
        name: 'Test Medicine',
        description: 'Sample test medicine for demo'
      }
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PharmaGuard API is running' });
});

app.listen(PORT, () => {
  console.log(`PharmaGuard backend running on port ${PORT}`);
  console.log(`🧪 Test data available at: http://localhost:${PORT}/test-data`);
}); 