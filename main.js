
const apiKey = 'api_key=OAyL35F8mcAF0ba3i5nxeBgTVzbw9FW4';

let trendElement = document.getElementById("trend-results");
let randomElement = document.getElementById("random-result");
let searchElement = document.getElementById("search-results");
let categoryElement = document.getElementById("category-results")
let categoryContainer = document.getElementById("category-container")
let categoryOuter = document.getElementById("category-outer")

// clear workspace

function clearSearch() {
    trendElement.innerHTML = "";
    randomElement.innerHTML = "";
    searchElement.innerHTML = "";
    categoryContainer.innerHTML = "";
    categoryElement.innerHTML = "";
    categoryOuter.innerHTML = "";

    if (categoryContainer.parentNode) {
        categoryContainer.parentNode.removeChild(categoryContainer)
    } 
}

// get trending results

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

    clearSearch()

    const result = await getTrends();
    for (let i = 0; i <result.data.length; i++) {
        let trendingGif = createGifGrid(result.data[i]);
        trendElement.appendChild(trendingGif)
    }
}

// get random gif

async function getRandom() {
    const trendUrl = `https://api.giphy.com/v1/gifs/random?${apiKey}`
    const response = await fetch(trendUrl);
    const result = await response.json();
    return result
}

async function displayRandom() {

    const result = await getRandom()

    clearSearch()

    let newRandomElement = document.createElement("img");
    newRandomElement.src = result.data.images.original.url;

    randomElement.appendChild(newRandomElement)
}
// search results

async function searchGif() {
    
  let search = document.getElementById("search-box");
  let searchGif = search.value;
  let searchUrl = `https://api.giphy.com/v1/gifs/search?q=${searchGif}&${apiKey}&limit=20`;

  const response = await fetch(searchUrl);
  const result = await response.json();
  return result
}

async function displaySearch() {

    let search = document.getElementById("search-box");
        
    // limpa a área de trabalho antes de mostrar novos resultados
    clearSearch()
    
    
    const result = await searchGif();
    for (let i = 0; i <result.data.length; i++) {
        let searchedGif = createGifGrid(result.data[i]);
        searchElement.appendChild(searchedGif)
    }
    search.value = "";
}

// Categories

async function getCategory() {
    const trendUrl = `https://api.giphy.com/v1/gifs/categories?${apiKey}`
    const response = await fetch(trendUrl);
    const result = await response.json();
    console.log(result);
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

    const result = await getCategory();
    for (let i = 0; i < 27; i++) {
        let showCategory = createCategory(result.data[i]);
        categoryElement.appendChild(showCategory);
        categoryContainer.appendChild(categoryElement);
        categoryOuter.appendChild(categoryContainer);
    }
}
displayCategory();
