
const apiKey = 'api_key=OAyL35F8mcAF0ba3i5nxeBgTVzbw9FW4';

async function getTrends() {
    const trendUrl = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=10`
    const response = await fetch(trendUrl);
    const result = await response.json();
    return result
}

function createTrendingGifs(data) {
    let gifElement = document.createElement("img");
    gifElement.src = data.images.original.url;
    return gifElement
}

async function displayTrends() {
    let resultElement = document.getElementById("trendResults");

    const result = await getTrends();
    for (let i = 0; i <result.data.length; i++) {
        let trendingGif = createTrendingGifs(result.data[i]);
        resultElement.appendChild(trendingGif)
    }
}

displayTrends();


// async function searchGif() {
//     // fetch API response
//   let search = document.getElementById("search");
//   let searchCountry = search.value;
//   let url = `https://restcountries.eu/rest/v2/name/${searchCountry}`;

//   let response = await fetch(url);
//   let result = await response.json();

// }