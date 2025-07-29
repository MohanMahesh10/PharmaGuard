# 🧪 PharmaGuard Testing Guide

## Overview

PharmaGuard includes comprehensive dummy data for testing the medicine verification functionality. This allows you to test all features without relying on external APIs.

## Available Test Data

The application includes the following sample NDC codes:

### Prescription Medicines

| NDC Code | Brand Name | Generic Name | Type |
|----------|------------|--------------|------|
| `0002-7510-01` | Humulin R | insulin human | Injection |
| `0069-2587-10` | Lyrica | pregabalin | Capsule |
| `50090-4406-0` | Metformin Hydrochloride | metformin hydrochloride | Tablet |
| `0781-5092-10` | Amoxicillin | amoxicillin | Capsule |
| `0071-0155-23` | Lipitor | atorvastatin calcium | Tablet |
| `0378-6055-77` | Lisinopril | lisinopril | Tablet |
| `0093-0058-01` | Omeprazole | omeprazole | Capsule |

### Over-the-Counter Medicines

| NDC Code | Brand Name | Generic Name | Type |
|----------|------------|--------------|------|
| `55111-118-78` | Ibuprofen | ibuprofen | Tablet |
| `16714-063-01` | Aspirin | aspirin | Tablet |

### Test Medicine

| NDC Code | Brand Name | Generic Name | Type |
|----------|------------|--------------|------|
| `12345-678-90` | Test Medicine | test compound | Tablet |

## Testing Scenarios

### 1. Valid Medicine Verification ✅

**Test Case**: Valid NDC with future expiry date
- **NDC**: `0002-7510-01`
- **Expiry**: Any future date (e.g., `2025-12-31`)
- **Expected Result**: `verified` status with medicine details

### 2. Expired Medicine Detection ⚠️

**Test Case**: Valid NDC with past expiry date
- **NDC**: `0069-2587-10`
- **Expiry**: Any past date (e.g., `2020-12-31`)
- **Expected Result**: `expired` status with warning message

### 3. Counterfeit Medicine Detection ❌

**Test Case**: Invalid/unknown NDC
- **NDC**: `99999-999-99`
- **Expiry**: Any date
- **Expected Result**: `fake` status indicating potential counterfeit

### 4. Over-the-Counter Medicine ✅

**Test Case**: OTC medicine verification
- **NDC**: `55111-118-78`
- **Expiry**: Future date
- **Expected Result**: `verified` status with OTC marking

## How to Test

### Using the Web Interface

1. **Open the application**: http://localhost:5173
2. **Click "🧪 Show Test Data"** to see available samples
3. **Click any NDC code** to auto-fill the form
4. **Use Quick Actions** to set expired or future dates
5. **Click "Verify Medicine"** to test

### Using API Endpoints

#### Get Available Test Data
```bash
curl http://localhost:3000/test-data
```

#### Test Valid Medicine
```bash
curl -X POST http://localhost:3000/verify \
  -H "Content-Type: application/json" \
  -d '{"ndc":"0002-7510-01","expiry":"2025-12-31"}'
```

#### Test Expired Medicine
```bash
curl -X POST http://localhost:3000/verify \
  -H "Content-Type: application/json" \
  -d '{"ndc":"0069-2587-10","expiry":"2020-12-31"}'
```

#### Test Invalid NDC
```bash
curl -X POST http://localhost:3000/verify \
  -H "Content-Type: application/json" \
  -d '{"ndc":"99999-999-99","expiry":"2025-12-31"}'
```

### Using the Test Script

Run the comprehensive test suite:

```bash
cd backend
node test-api.js
```

This will automatically test:
- Health check endpoint
- Test data endpoint
- Valid medicine verification
- Expired medicine detection
- Invalid NDC detection
- OTC medicine verification

## API Behavior

### Fallback System

The API uses a intelligent fallback system:

1. **Primary**: Attempts to query the real FDA NDC API
2. **Fallback**: Uses local dummy data if FDA API is unavailable
3. **Result**: Returns "fake" only if NDC is found in neither source

### Response Format

All verification responses follow this format:

```json
{
  "status": "verified|expired|fake|error",
  "message": "Human-readable explanation",
  "fda_data": {
    "brand_name": "Medicine Brand Name",
    "generic_name": "generic name",
    "dosage_form": "TABLET|CAPSULE|INJECTION",
    "route": "ORAL|SUBCUTANEOUS|etc",
    "marketing_status": "Prescription|Over the Counter",
    "labeler_name": "Manufacturer Name"
  }
}
```

## Troubleshooting

### No Test Data Showing
- Ensure the backend is running on port 3000
- Check Docker containers: `docker compose ps`
- Verify API endpoint: `curl http://localhost:3000/test-data`

### Verification Always Returns "Fake"
- Check backend logs: `docker compose logs backend`
- Ensure dummy-data.js is properly loaded
- Verify NDC format matches exactly (including hyphens)

### Frontend Not Loading Test Data
- Check browser console for errors
- Verify frontend can reach backend API
- Ensure CORS is properly configured

## Development Notes

### Adding New Test Data

To add new dummy medicines, edit `backend/dummy-data.js`:

```javascript
"NEW-NDC-CODE": {
  brand_name: "Medicine Name",
  generic_name: "generic name",
  dosage_form: "TABLET",
  route: "ORAL",
  marketing_status: "Prescription",
  labeler_name: "Manufacturer"
}
```

### Modifying Test Scenarios

Update the sample NDCs in `frontend/src/App.svelte`:

```javascript
const sampleNDCs = [
  { ndc: 'NEW-NDC-CODE', name: 'Medicine Name' }
];
``` 