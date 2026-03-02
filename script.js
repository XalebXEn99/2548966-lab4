const URL = "https://restcountries.com/v3.1";

const SearchButton = document.getElementById("search-btn");
const CountryInput = document.getElementById("country-input");
const Spinner = document.getElementById("loading-spinner");
const CountryInfo = document.getElementById("country-info");
const BorderingCountries = document.getElementById("bordering-countries");
const ErrorMessage = document.getElementById("error-message");

function ShowElement(element){
    element.classList.remove('hidden');
}
function HideElement(element){
    element.classList.add('hidden');
}

async function searchCountry(countryName) {
    try {
        // Show loading spinner
        CountryInfo.innerHTML= "";
        BorderingCountries.innerHTML = "";
        ErrorMessage.textContent = "";
        ShowElement(Spinner);
        // Fetch country data
        const response = await fetch(`${URL}/name/${countryName}`);
        if(!response.ok){
            throw new Error("That's not a real country, try again");
        }
        const data = await response.json();
        const country = data[0];
        // Update DOM
        CountryInfo.innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
    <p><strong>Population:</strong> ${country.population ? country.population.toLocaleString() : 'N/A'}</p>
    <p><strong>Region:</strong> ${country.region || 'N/A'}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
`;

        // Fetch bordering countries
        if (country.borders && country.borders.length > 0) {
            for (const code of country.borders) {
                try {
                    const BorderResponse = await fetch(`${URL}/alpha/${code}`);
                    if (!BorderResponse.ok) continue;
                    const BorderData = await BorderResponse.json();
                    const Neighbour = BorderData[0];
                    const NeighbourView = document.createElement("section");
                    NeighbourView.classList.add("neighbour-view");
                    NeighbourView.innerHTML = `
                <h4>${Neighbour.name.common}</h4>
                <img src="${Neighbour.flags.svg}" alt="${Neighbour.name.common} flag" width="120">
                `;
                    BorderingCountries.appendChild(NeighbourView);
                } catch (err) {
                    console.log("No border buddy", err);
                }
            }
        } else {
            BorderingCountries.innerHTML = "<p>No neighbours, i.e. hermit country</p>";
        }
    } catch (error) {
        // Show error message
        ErrorMessage.textContent = error.message;
    } finally {
        HideElement(Spinner);
    }
}

// Event listeners
SearchButton.addEventListener('click', () => {
    const country = CountryInput.value.trim();
    if (country) searchCountry(country);
});

CountryInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter"){
        const country = CountryInput.value.trim();
        if (country) searchCountry(country);
    }
});