<script>
  let ndc = '';
  let expiry = '';
  let result = null;
  let loading = false;
  let showTestData = false;
  
  // Backend URL - use environment variable or default to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  // Sample test data
  const sampleNDCs = [
    { ndc: '0002-7510-01', name: 'Humulin R (insulin)' },
    { ndc: '0069-2587-10', name: 'Lyrica (pregabalin)' },
    { ndc: '55111-118-78', name: 'Ibuprofen' },
    { ndc: '0781-5092-10', name: 'Amoxicillin' },
    { ndc: '0071-0155-23', name: 'Lipitor' },
    { ndc: '12345-678-90', name: 'Test Medicine' }
  ];
  
  function getResultIcon(status) {
    switch(status) {
      case 'verified': return '✅';
      case 'expired': return '⚠️';
      case 'fake': return '❌';
      default: return '❌';
    }
  }
  
  function getResultClass(status) {
    switch(status) {
      case 'verified': return 'verified';
      case 'expired': return 'expired';
      case 'fake': return 'fake';
      default: return 'error';
    }
  }
  
  function useSampleNDC(sampleNdc) {
    ndc = sampleNdc;
    showTestData = false;
    // Set a future date for testing
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expiry = futureDate.toISOString().split('T')[0];
  }
  
  function useExpiredDate() {
    // Set an expired date for testing
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    expiry = pastDate.toISOString().split('T')[0];
  }
  
  async function handleSubmit() {
    if (!ndc || !expiry) {
      result = {
        status: 'error',
        message: 'Please fill in both NDC code and expiry date'
      };
      return;
    }
    
    loading = true;
    result = null;
    
    try {
      const response = await fetch(`${API_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ndc, expiry })
      });
      
      const data = await response.json();
      result = data;
    } catch (error) {
      result = {
        status: 'error',
        message: 'Failed to connect to verification service. Please try again.'
      };
    } finally {
      loading = false;
    }
  }
  
  function resetForm() {
    ndc = '';
    expiry = '';
    result = null;
  }
</script>

<main>
  <div class="container">
    <header>
      <h1>🛡️ PharmaGuard</h1>
      <p>Medicine Authenticity Checker</p>
    </header>
    
    <!-- Test Data Helper -->
    <div class="test-data-section">
      <button 
        type="button" 
        class="btn btn-outline" 
        on:click={() => showTestData = !showTestData}
      >
        🧪 {showTestData ? 'Hide' : 'Show'} Test Data
      </button>
      
      {#if showTestData}
        <div class="test-data-panel">
          <h3>Sample NDC Codes for Testing</h3>
          <p>Click any NDC code below to auto-fill the form:</p>
          
          <div class="test-grid">
            {#each sampleNDCs as sample}
              <button 
                type="button" 
                class="test-item"
                on:click={() => useSampleNDC(sample.ndc)}
              >
                <strong>{sample.ndc}</strong>
                <span>{sample.name}</span>
              </button>
            {/each}
          </div>
          
          <div class="test-actions">
            <p><strong>Quick Actions:</strong></p>
            <button type="button" class="btn btn-sm" on:click={useExpiredDate}>
              📅 Set Expired Date
            </button>
            <button type="button" class="btn btn-sm" on:click={() => expiry = new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]}>
              📅 Set Future Date
            </button>
          </div>
        </div>
      {/if}
    </div>
    
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="ndc">NDC Code</label>
        <input 
          type="text" 
          id="ndc" 
          bind:value={ndc}
          placeholder="e.g., 0002-7510-01"
          title="Enter NDC code with hyphens (e.g., 0002-7510-01)"
        />
        <small>Enter the National Drug Code found on the medicine packaging</small>
      </div>
      
      <div class="form-group">
        <label for="expiry">Expiry Date</label>
        <input 
          type="date" 
          id="expiry" 
          bind:value={expiry}
        />
        <small>Select the expiration date printed on the medicine</small>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn btn-primary" disabled={loading}>
          {#if loading}
            <span class="loading"></span>
          {/if}
          {loading ? 'Verifying...' : 'Verify Medicine'}
        </button>
        
        {#if result}
          <button type="button" class="btn btn-secondary" on:click={resetForm}>
            Check Another
          </button>
        {/if}
      </div>
    </form>
    
    {#if result}
      <div class="result {getResultClass(result.status)}">
        <div class="result-icon">{getResultIcon(result.status)}</div>
        <div class="result-message">{result.message}</div>
        
        {#if result.fda_data}
          <div class="fda-data">
            <h4>Medicine Information</h4>
            {#if result.fda_data.brand_name}
              <p><strong>Brand Name:</strong> {result.fda_data.brand_name}</p>
            {/if}
            {#if result.fda_data.generic_name}
              <p><strong>Generic Name:</strong> {result.fda_data.generic_name}</p>
            {/if}
            {#if result.fda_data.dosage_form}
              <p><strong>Dosage Form:</strong> {result.fda_data.dosage_form}</p>
            {/if}
            {#if result.fda_data.labeler_name}
              <p><strong>Manufacturer:</strong> {result.fda_data.labeler_name}</p>
            {/if}
            {#if result.fda_data.marketing_status}
              <p><strong>Status:</strong> {result.fda_data.marketing_status}</p>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    padding: 1rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--light-gray);
  }
  
  header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  header p {
    margin: 0;
    color: #666;
    font-size: 1.1rem;
  }
  
  .test-data-section {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .test-data-panel {
    margin-top: 1rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    text-align: left;
  }
  
  .test-data-panel h3 {
    margin: 0 0 1rem 0;
    color: var(--text-color);
  }
  
  .test-data-panel p {
    margin: 0 0 1rem 0;
    color: #666;
  }
  
  .test-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .test-item {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    background: var(--white);
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }
  
  .test-item:hover {
    border-color: var(--primary-color);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transform: translateY(-1px);
  }
  
  .test-item strong {
    color: var(--primary-color);
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  .test-item span {
    color: #666;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
  
  .test-actions {
    border-top: 1px solid #e9ecef;
    padding-top: 1rem;
    margin-top: 1rem;
  }
  
  .test-actions p {
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .btn-outline {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
  }
  
  .btn-outline:hover {
    background: var(--primary-color);
    color: var(--white);
  }
  
  .btn-secondary {
    background: #6c757d;
    color: var(--white);
  }
  
  .btn-secondary:hover {
    background: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    background: var(--secondary-color);
    color: var(--white);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn-sm:hover {
    background: #6a4c93;
    transform: translateY(-1px);
  }
  
  small {
    display: block;
    margin-top: 0.25rem;
    color: #666;
    font-size: 0.875rem;
  }
</style> 