let searchInput = document.getElementById("search-box");
const autocompleteContainer = document.getElementById("list") 

async function getAutoComplete(word) {

    autocompleteContainer.innerHTML = "";

    if (word === "") {
        return;
    }
    console.log(word);
    
  let searchGif = word;
  let searchUrl = `https://api.giphy.com/v1/gifs/search/tags?q=${searchGif}&${apiKey}&limit=24`;

  const response = await fetch(searchUrl);
  const result = await response.json();
  console.log(result);


    for (let i = 0; i < 5; i++) {
        let suggestion = result.data[i].name
        let suggestionBox = document.createElement("li");
        suggestionBox.id = `suggestion-item`;
        suggestionBox.setAttribute("onclick", `selectedOption('${suggestion}')`);

        suggestionBox.innerText = suggestion;

        autocompleteContainer.appendChild(suggestionBox)   
    }
  return result
}

let selectedOption = function(value) {
    let search = document.getElementById("search-box");
    let button = document.getElementById("search-button")
    search.value = value
    button.click()

    autocompleteContainer.innerHTML = "";
    console.log(value);
} 
