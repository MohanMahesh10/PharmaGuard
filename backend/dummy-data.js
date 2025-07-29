// Dummy FDA NDC data for testing purposes
const dummyNDCData = {
  "0002-7510-01": {
    brand_name: "Humulin R",
    generic_name: "insulin human",
    dosage_form: "INJECTION",
    route: "SUBCUTANEOUS;INTRAVENOUS",
    marketing_status: "Prescription",
    labeler_name: "Eli Lilly and Company"
  },
  "0069-2587-10": {
    brand_name: "Lyrica",
    generic_name: "pregabalin",
    dosage_form: "CAPSULE",
    route: "ORAL",
    marketing_status: "Prescription",
    labeler_name: "Pfizer Laboratories Div Pfizer Inc"
  },
  "50090-4406-0": {
    brand_name: "Metformin Hydrochloride",
    generic_name: "metformin hydrochloride",
    dosage_form: "TABLET",
    route: "ORAL",
    marketing_status: "Prescription",
    labeler_name: "A-S Medication Solutions"
  },
  "55111-118-78": {
    brand_name: "Ibuprofen",
    generic_name: "ibuprofen",
    dosage_form: "TABLET",
    route: "ORAL",
    marketing_status: "Over the Counter",
    labeler_name: "Dr. Reddy's Laboratories Limited"
  },
  "0781-5092-10": {
    brand_name: "Amoxicillin",
    generic_name: "amoxicillin",
    dosage_form: "CAPSULE",
    route: "ORAL",
    marketing_status: "Prescription",
    labeler_name: "Sandoz Inc"
  },
  "0071-0155-23": {
    brand_name: "Lipitor",
    generic_name: "atorvastatin calcium",
    dosage_form: "TABLET",
    route: "ORAL",
    marketing_status: "Prescription",
    labeler_name: "Parke-Davis"
  },
  "0378-6055-77": {
    brand_name: "Lisinopril",
    generic_name: "lisinopril",
    dosage_form: "TABLET",
    route: "ORAL",
    marketing_status: "Prescription",
    labeler_name: "Mylan Pharmaceuticals Inc."
  },
  "0093-0058-01": {
    brand_name: "Omeprazole",
    generic_name: "omeprazole",
    dosage_form: "CAPSULE, DELAYED RELEASE",
    route: "ORAL",
    marketing_status: "Prescription",
    labeler_name: "Teva Pharmaceuticals USA, Inc."
  },
  "16714-063-01": {
    brand_name: "Aspirin",
    generic_name: "aspirin",
    dosage_form: "TABLET",
    route: "ORAL",
    marketing_status: "Over the Counter",
    labeler_name: "NorthStar RxLLC"
  },
  "12345-678-90": {
    brand_name: "Test Medicine",
    generic_name: "test compound",
    dosage_form: "TABLET",
    route: "ORAL",
    marketing_status: "Prescription",
    labeler_name: "Test Pharmaceuticals"
  }
};

// Function to check if NDC exists in dummy data
function findDummyNDC(ndc) {
  return dummyNDCData[ndc] || null;
}

// Function to get all available NDC codes for testing
function getAllDummyNDCs() {
  return Object.keys(dummyNDCData);
}

module.exports = {
  findDummyNDC,
  getAllDummyNDCs,
  dummyNDCData
}; 