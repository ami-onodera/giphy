
const apiKey = 'api_key=OAyL35F8mcAF0ba3i5nxeBgTVzbw9FW4';

async function getTrends() {
    const trendUrl = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=12`
    const response = await fetch(trendUrl);
    const result = await response.json();
    return result
}

function createGifGrid(data) {
    let gifElement = document.createElement("img");
    gifElement.src = data.images.fixed_width.url;
    return gifElement
}

async function displayTrends() {
    let resultElement = document.getElementById("trendResults");
    let randomElement = document.getElementById("randomResult")

    // limpa a área de trabalho antes de mostrar novos resultados
    randomElement.innerHTML = "";

    const result = await getTrends();
    for (let i = 0; i <result.data.length; i++) {
        let trendingGif = createGifGrid(result.data[i]);
        resultElement.appendChild(trendingGif)
    }
}

async function getRandom() {
    const trendUrl = `https://api.giphy.com/v1/gifs/random?${apiKey}`
    const response = await fetch(trendUrl);
    const result = await response.json();
    return result
}

async function displayRandom() {
    let trendElement = document.getElementById("trendResults")
    let resultElement = document.getElementById("randomResult");

    const result = await getRandom()

    // limpa a área de trabalho antes de mostrar novos resultados
    trendElement.innerHTML = "";
    resultElement.innerHTML = "";

    let randomElement = document.createElement("img");
    randomElement.src = result.data.images.original.url;
    resultElement.appendChild(randomElement)
    // resultElement.innerHTML = "";
}

function clearSearch() {
    let trendElement = document.getElementById("trendResults");
    let randomElement = document.getElementById("randomResult")

    trendElement.innerHTML = "";
    randomElement.innerHTML = "";
}



// async function searchGif() {
//     // fetch API response
//   let search = document.getElementById("search");
//   let searchCountry = search.value;
//   let url = `https://restcountries.eu/rest/v2/name/${searchCountry}`;

//   let response = await fetch(url);
//   let result = await response.json();

// }