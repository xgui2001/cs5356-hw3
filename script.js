// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find the API content container
    const apiContent = document.getElementById('api-content');
    
    // Create a button element
    const catButton = document.createElement('button');
    catButton.textContent = 'Show me a cat!';
    catButton.className = 'cat-button';
    catButton.style.backgroundColor = '#A4B080';
    catButton.style.color = '#424206';
    catButton.style.border = 'none';
    catButton.style.padding = '10px 20px';
    catButton.style.borderRadius = '5px';
    catButton.style.cursor = 'pointer';
    catButton.style.margin = '20px 0';
    catButton.style.fontWeight = 'bold';
    
    // Create a container for the cat image
    const catContainer = document.createElement('div');
    catContainer.id = 'cat-container';
    catContainer.style.marginTop = '20px';
    
    // Add button to the API section
    apiContent.appendChild(catButton);
    apiContent.appendChild(catContainer);
    
    // Add event listener to button
    catButton.addEventListener('click', function() {
        // Show loading message
        catContainer.textContent = 'Loading cat...';
        
        // Fetch a cat from The Cat API
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cat');
                }
                return response.json();
            })
            .then(data => {
                // The API returns an array with one object
                const catData = data[0];
                
                // Clear previous content
                catContainer.innerHTML = '';
                
                // Create image element
                const img = document.createElement('img');
                img.src = catData.url;
                img.alt = 'Random cat';
                img.style.width = '100%';
                img.style.maxWidth = '500px';
                img.style.borderRadius = '8px';
                img.style.marginBottom = '10px';
                
                // Create a caption
                const caption = document.createElement('p');
                caption.textContent = "Here's a cat!";
                caption.style.textAlign = 'center';
                caption.style.fontWeight = 'bold';
                caption.style.color = '#6D492F';
                
                // Create container for displaying cat info from JSON
                const info = document.createElement('div');
                info.style.backgroundColor = '#DEE7B0';
                info.style.padding = '10px';
                info.style.borderRadius = '5px';
                info.style.marginTop = '10px';
                
                // Add some data from the JSON response
                info.innerHTML = `
                    <p><strong>Cat ID:</strong> ${catData.id}</p>
                    <p><strong>Width:</strong> ${catData.width}px</p>
                    <p><strong>Height:</strong> ${catData.height}px</p>
                `;
                
                // Add elements to container
                catContainer.appendChild(img);
                catContainer.appendChild(caption);
                catContainer.appendChild(info);
            })
            .catch(error => {
                console.error('Error:', error);
                catContainer.textContent = 'Failed to load cat. Please try again.';
            });
    });

    <script data-goatcounter="https://xgui2001.goatcounter.com/count"
    async src="//gc.zgo.at/count.js"></script>
});