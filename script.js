document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const countryInput = document.getElementById('country-input');
    const resultsSection = document.getElementById('result-section');
    
    // Search when button is clicked
    searchBtn.addEventListener('click', searchCountry);
    
    
    function searchCountry() {
        const countryName = countryInput.value.trim();
        
        if (!countryName) {
            showError('Please enter a country name');
            return;
        }
        
        // Show loading state
        resultsSection.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching for country information...</div>';
        
        // Fetch data from API
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Country not found');
                }
                return response.json();
            })
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }
    
    function displayResults(countries) {
        // Clear previous results
        resultsSection.innerHTML = '';
        
        // Process each country in the response
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            
            // Extract currency information
            let currencies = 'N/A';
            if (country.currencies) {
                currencies = Object.values(country.currencies)
                    .map(currency => `${currency.name} (${currency.symbol || 'No symbol'})`)
                    .join(', ');
            }
            
            // Extract languages
            let languages = 'N/A';
            if (country.languages) {
                languages = Object.values(country.languages).join(', ');
            }
            
            // Extract timezones
            let timezones = 'N/A';
            if (country.timezones) {
                timezones = country.timezones.join(', ');
            }
            
            // Create country card HTML
            countryCard.innerHTML = `
                <div class="country-header">
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="country-flag">
                    <h2 class="country-name">${country.name.common}</h2>
                </div>
                
                <div class="country-details">
                    <div class="detail-item">
                        <span class="detail-label">Official Name:</span>
                        <span class="detail-value">${country.name.official}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Capital:</span>
                        <span class="detail-value">${country.capital ? country.capital.join(', ') : 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Region:</span>
                        <span class="detail-value">${country.region}${country.subregion ? ` (${country.subregion})` : ''}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Population:</span>
                        <span class="detail-value">${country.population.toLocaleString()}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Currency:</span>
                        <span class="detail-value">${currencies}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Languages:</span>
                        <span class="detail-value">${languages}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Timezones:</span>
                        <span class="detail-value">${timezones}</span>
                    </div>
                </div>
            `;
            
            resultsSection.appendChild(countryCard);
        });
    }
    
    function showError(message) {
        resultsSection.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
    }
});