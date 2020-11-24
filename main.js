
const apiKey = 'api_key=OAyL35F8mcAF0ba3i5nxeBgTVzbw9FW4';

let trendElement = document.getElementById("trend-results");
let trendContainer = document.getElementById("trend-container");
let randomContainer = document.getElementById("random-container");
let randomElement = document.getElementById("random-result");
let searchElement = document.getElementById("search-results");
let searchContainer = document.getElementById("search-container")
let categoryElement = document.getElementById("category-results");
let categoryContainer = document.getElementById("category-container");
let categoryOuter = document.getElementById("category-outer");

// clear workspace

function clearSearch() {
    trendElement.innerHTML = "";
    trendContainer.innerHTML = "";
    randomElement.innerHTML = "";
    randomContainer.innerHTML = "";
    searchElement.innerHTML = "";
    searchContainer.innerHTML = "";
    categoryContainer.innerHTML = "";
    categoryElement.innerHTML = "";
    categoryOuter.innerHTML = "";

    if (categoryContainer.parentNode) {
        categoryContainer.parentNode.removeChild(categoryContainer)
    } 
}

// get trending results

async function getTrends() {
    const trendUrl = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=24`
    const response = await fetch(trendUrl);
    const result = await response.json();
    return result
}

// function createGifGrid(data) {
//     let gifElement = document.createElement("img");
//     gifElement.src = data.images.fixed_width.url;
//     return gifElement
// }

function createGifDiv(data) {
    let gifElement = document.createElement("div")
    gifElement.id = "element-div"
    gifElement.innerHTML = `
        <a href="${data.url}" target="blank"><img src="${data.images.fixed_width.url}"></a>
    `
    return gifElement
}

async function displayTrends() {

    clearSearch()

    let trendTitle = document.createElement("h2");
    trendTitle.id = "category-title"
    trendTitle.textContent = `Trending Gifs`

    trendContainer.appendChild(trendTitle)

    let separator = document.createElement("div");
    separator.id = "gradient-separator"

    trendContainer.appendChild(separator)

    const result = await getTrends();
    for (let i = 0; i <result.data.length; i++) {
        let trendingGif = createGifDiv(result.data[i]);
        trendElement.appendChild(trendingGif)
        trendContainer.appendChild(trendElement)
    }
}

// get random gif

async function getRandom() {
    const trendUrl = `https://api.giphy.com/v1/gifs/random?${apiKey}`
    const response = await fetch(trendUrl);
    const result = await response.json();
    console.log(result);
    return result
}

async function displayRandom() {

    const result = await getRandom()

    clearSearch()

    let randomTitle = document.createElement("h2");
    randomTitle.id = "category-title"
    randomTitle.textContent = `Random Gif`

    randomContainer.appendChild(randomTitle)

    let separator = document.createElement("div");
    separator.id = "gradient-separator"

    randomContainer.appendChild(separator)

    // let newRandomElement = document.createElement("img");
    // newRandomElement.src = result.data.images.original.url;

    let newRandomElement = document.createElement("div")
    newRandomElement.innerHTML = `
        <a href="${result.data.url}" target="blank"><img src="${result.data.images.original.url}"></a>
    `

    randomElement.appendChild(newRandomElement)
    randomContainer.appendChild(randomElement)
}
// search results

async function searchGif() {
    
  let search = document.getElementById("search-box");
  let searchGif = search.value;
  let searchUrl = `https://api.giphy.com/v1/gifs/search?q=${searchGif}&${apiKey}&limit=24`;

  const response = await fetch(searchUrl);
  const result = await response.json();
  return result
}

async function displaySearch() {

    let search = document.getElementById("search-box");
        
    // limpa a área de trabalho antes de mostrar novos resultados
    clearSearch()

    let searchTitle = document.createElement("h2");
    searchTitle.id = "category-title"
    searchTitle.textContent = `Search Results`

    searchContainer.appendChild(searchTitle)

    let separator = document.createElement("div");
    separator.id = "gradient-separator"

    searchContainer.appendChild(separator)
    
    
    const result = await searchGif();
    for (let i = 0; i <result.data.length; i++) {
        let searchedGif = createGifDiv(result.data[i]);
        searchElement.appendChild(searchedGif)
        searchContainer.appendChild(searchElement)
    }
    search.value = "";
}

// Categories

async function getCategory() {
    const trendUrl = `https://api.giphy.com/v1/gifs/categories?${apiKey}`
    const response = await fetch(trendUrl);
    const result = await response.json();
    return result
}

function createCategory(data) {
    let categoryDiv = document.createElement("div");
    categoryDiv.id = "category-div"
    categoryDiv.innerHTML = `
        <h5>${data.name}</h5>
        <a href="https://giphy.com/categories/${data.name}" target="blank"><img src="${data.gif.images.fixed_width.url}"></a>
    `
    return categoryDiv
}

async function displayCategory() {

    clearSearch()

    let categoryTitle = document.createElement("h2");
    categoryTitle.id = "category-title"
    categoryTitle.textContent = `Categories`

    categoryContainer.appendChild(categoryTitle)

    let separator = document.createElement("div");
    separator.id = "gradient-separator"

    categoryContainer.appendChild(separator)

    const result = await getCategory();
    for (let i = 0; i < 27; i++) {
        let showCategory = createCategory(result.data[i]);
        categoryElement.appendChild(showCategory);
    }
    
    categoryContainer.appendChild(categoryElement);
    categoryOuter.appendChild(categoryContainer);
}
displayCategory();
