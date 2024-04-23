const countryCards = document.getElementById('countryCards');
const sortBtn = document.getElementById('sortBtn');

sortBtn.addEventListener('click', () => {
    fetchCountries('?sort=population&order=desc');
});

function fetchCountries(sortQuery) {
    fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries${sortQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data structure
            if (!data || !data.data) {
                throw new Error('Invalid data format');
            }
            displayCountries(data.data);
        })
        .catch(error => console.error('Error fetching countries:', error.message));
}

function displayCountries(countries) {
    const countryCardsHTML = countries.map(country => `
        <div class="card">
            <h2>${country.country}</h2>
            <p>Population: ${country.population}</p>
            <p>id: ${country.id}</p>
            <p>Rank: ${country.Rank}</p>
        </div>
    `).join('');
    countryCards.innerHTML = countryCardsHTML;
}

// Initially fetch countries without sorting
fetchCountries('');
