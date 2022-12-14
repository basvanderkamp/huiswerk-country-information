import axios from "axios";

console.log('Script is running');


const list = document.getElementById("country-list");

//api koppelen
async function fetchData() {
    const URI = 'https://restcountries.com/v2/all'
    const ENDPOINT = 'countries'

    try {
        const response = await axios.get(URI)
        console.log(response);

        //sort de array
        response.data.sort ((a,b) => (a.population - b.population));

        //leeg de lijst
        list.replaceChildren();

        //map door data heen
        response.data.map((country) => {
            //create element with atrributes
            const itemName = document.createElement("li");
            itemName.setAttribute('class', 'country-name');
            itemName.textContent = country.name;

            const itemPop = document.createElement("li");
            itemPop.setAttribute('class', 'country-pop');
            itemPop.textContent = `has a population of ${country.population} poeple`;

            const itemImg = document.createElement("img");
            itemImg.setAttribute('class', 'country-flag');
            itemImg.setAttribute('src', country.flag);

            const itemRegion = document.createElement("li");
            itemRegion.setAttribute('class', 'country-region');
            itemRegion.textContent = country.region;


            switch (country.region) {
                case "Africa":
                    itemName.setAttribute('id', 'africa');
                    break;
                case "Americas":
                    itemName.setAttribute('id', 'americas');
                    break;
                case "Europe":
                    itemName.setAttribute('id', 'europe');
                    break;
                case "Asia":
                    itemName.setAttribute('id', 'asia');
                    break;
                case "Oceania":
                    itemName.setAttribute('id', 'oceania');
                    break;
                case "Polar":
                    itemName.setAttribute('id', 'polar');
                    break;
                default:
                    itemName.setAttribute('id', 'unknown')
            }


            //voeg items toe aan list
            list.appendChild(itemName);
            list.appendChild(itemPop);
            list.appendChild(itemRegion);
            list.appendChild(itemImg);

        })

    } catch (err) {
        const errorMessage = document.getElementById("error-message");

        if (err.response.data.status === 404) {
            errorMessage.textContent = "Page Not Found | 404"
            console.log(err);
        }
        if (err.response.data.status === 500) {
            errorMessage.textContent = "Internal Server Error | 500"
        }
    }

}
fetchData()




