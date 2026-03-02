const SearchButton = document.getElementById("search-btn");
const CountryInput = document.getElementById("country-input");
const Spinner = document.getElementById("spinner");
const CountryInfo = document.getElementById("country-info");
const BorderingCountries = document.getElementById("bordering-countries");
const ErrorMessage = document.getElementById("error-messages");

async function searchCountry(countryName) {
    try {
        // Show loading spinner
        // Fetch country data
        // Update DOM
        // Fetch bordering countries
        // Update bordering countries section
    } catch (error) {
        // Show error message
    } finally {
        // Hide loading spinner
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});