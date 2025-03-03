// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find the API content container
    const apiContent = document.getElementById('api-content');
    
    // Create a button element
    const factButton = document.createElement('button');
    factButton.textContent = 'Show Random Fact';
    factButton.className = 'fact-button';
    factButton.style.backgroundColor = '#A4B080';
    factButton.style.color = '#424206';
    factButton.style.border = 'none';
    factButton.style.padding = '10px 20px';
    factButton.style.borderRadius = '5px';
    factButton.style.cursor = 'pointer';
    factButton.style.margin = '20px 0';
    factButton.style.fontWeight = 'bold';
    
    // Create a container for the fact
    const factContainer = document.createElement('div');
    factContainer.id = 'fact-container';
    factContainer.style.marginTop = '20px';
    
    // Add button to the API section
    apiContent.appendChild(factButton);
    apiContent.appendChild(factContainer);
    
    // Add event listener to button
    factButton.addEventListener('click', function() {
        // Show loading message
        factContainer.textContent = 'Loading random fact...';
        
        // Fetch a random fact from the Useless Facts API
        fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch fact');
                }
                return response.json();
            })
            .then(factData => {
                // Clear previous content
                factContainer.innerHTML = '';
                
                // Create fact card
                const factCard = document.createElement('div');
                factCard.className = 'fact-card';
                factCard.style.backgroundColor = '#DEE7B0';
                factCard.style.padding = '20px';
                factCard.style.borderRadius = '8px';
                factCard.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                factCard.style.maxWidth = '600px';
                
                // Create fact text element
                const factText = document.createElement('p');
                factText.textContent = factData.text;
                factText.style.fontSize = '18px';
                factText.style.color = '#424206';
                factText.style.lineHeight = '1.6';
                factText.style.marginBottom = '15px';
                
                // Create source element
                const factSource = document.createElement('p');
                factSource.innerHTML = `<strong>Source:</strong> <a href="${factData.source_url}" target="_blank">${factData.source}</a>`;
                factSource.style.fontSize = '14px';
                factSource.style.color = '#6D492F';
                
                // Add elements to card
                factCard.appendChild(factText);
                factCard.appendChild(factSource);
                
                // Add fact card to container
                factContainer.appendChild(factCard);
            })
            .catch(error => {
                console.error('Error:', error);
                factContainer.textContent = 'Failed to load fact. Please try again.';
            });
    });
});