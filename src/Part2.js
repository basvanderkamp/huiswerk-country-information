import axios from "axios";


const sectionCountries = document.getElementById('country-information');
let errorMessage = "";


async function fetchDataSearch(countryName) {

    try {

        const dataCountry = await axios.get(`https://restcountries.com/v2/name/${countryName}`);


        // Leeg de lijst
        sectionCountries.replaceChildren();
        errorMessage.replaceChildren();



        // Map door de data heen
        dataCountry.data.map( ( country ) => {

            //maak variable aan uit arrays
            const {flags:{png}, name, capital, subregion, currencies, population, languages} = country;


            //make array list of needed names.
            let coinString;
            const coinArray = currencies.map((coin) => {
                return coin.name;
            })

            // print strings
            if (currencies.length === 1) {
                coinString = `you can pay with ${coinArray[0]}`;
            }else {
                coinString = `you can pay with ${coinArray[0]} and ${coinArray[1]}`;
            }



            let languagesString;
            const languagesArray= languages.map((lan) => {
                return lan.name;
            })

               if (languagesArray.length === 1) {
                   languagesString = `they speak ${languagesArray[0]}`;
               } else if (languages.length === 2) {
                       languagesString = `they speak ${languagesArray[0]} and ${languagesArray[1]}`;
               }else {
                       languagesString = `they speak ${languagesArray[0]}, ${languagesArray[1]} and ${languagesArray[2]}`;
               }



            // Create new element with attributes
            const countryInfo = document.createElement('p');
            countryInfo.setAttribute('class', 'info');
            countryInfo.textContent = `${name} is situated in ${subregion}. It has a population of ${population} people.`;

            const countryMoney = document.createElement('p');
            countryMoney.setAttribute('class', 'money');
            countryMoney.textContent = `The capital is ${capital} ${coinString}`

            const countryLanguages = document.createElement('p');
            countryLanguages.setAttribute('class', 'languages');
            countryLanguages.textContent = `${languagesString}`;

            const articleImage = document.createElement('img');
            articleImage.setAttribute('class', 'article-image');
            articleImage.setAttribute('src', png);



            // Voeg alle items toe aan list
            sectionCountries.appendChild(countryInfo);
            sectionCountries.appendChild(countryMoney);
            sectionCountries.appendChild(countryLanguages);
            sectionCountries.appendChild(articleImage);

        } )

    } catch ( error ) {

        sectionCountries.replaceChildren();

        // Verwijzing naar error message
        errorMessage = document.getElementById('error-message');

        // Check welke error message van toepassing is
        if ( error.response.status === 404 ) {
            errorMessage.textContent = "I dont know that Country | Page Not Found | 404"
        }
        if ( error.response.status === 500 ) {
            errorMessage.textContent = "Internal Server Error | 500"
        }

    }

}

// 2. Event Listeners
// Create reference

let value = "";
function textValue(input) {
    value = input.target.value;
}

const userInput = document.getElementById( 'user-input');
userInput.addEventListener("keyup", textValue);
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("button").click();
        fetchDataSearch(value);
        userInput.value = "";
    }
});



const button = document.getElementById( 'button' )
button.addEventListener( 'click', () => {
   fetchDataSearch(value);
    userInput.value = "";
})






