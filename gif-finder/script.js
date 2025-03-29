
"use strict"
// 1
  window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};

// 2
let displayTerm = "";

// 3
function searchButtonClicked(){
    console.log("searchButtonClicked() called");

    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";
    
    let GIPHY_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;
    
    // take in val from textbox
    let term = document.querySelector("#searchterm").value;

    // store the search term
    displayTerm = term;

    // trim
    term = term.trim();

    //encode
    term = encodeURIComponent(term);

    // stop if the term is nothing
    if (term.length < 1) return;

    // add the term to the url
    url += "&q=" + term;

    // take in the limit
    let limit = document.querySelector("#limit").value;

    // add the limit to the url
    url += "&limit=" + limit;

    // update UI
    document.querySelector("#status").innerHTML = "<b>Searching for " + displayTerm + "</b>";

    console.log(url);

    // 12 Request data!
    getData(url);

    document.querySelector("#results").innerHTML = "";

}

function dataLoaded(e) {
    let xhr = e.target;

    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results found for " + displayTerm + "</b>";
        return;
    }

    let results = obj.data;

    console.log("results.length = " + results.length);

    let bigString = "<p><i>Here are " + results.length + " results for " + displayTerm + "</i></p>";

    let resultDiv = document.querySelector("#results");

    for (let i in results) {
        let result = results[i];
        
        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;

        
        let line = document.createElement("div");
        line.className = "result";
        line.innerHTML = `<img src='${smallURL}' title = '${result.id}'><span><a target = '_blank' href = '${url}'>View on Giphy</a></span> <span><p>Rating: ${result.rating.toUpperCase()}</p></span>`;
        
        resultDiv.append(line);
    }

    document.querySelector("#contentParagraph").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}


function dataError(e) {
    console.log("as the dutch would say, oepsie woepsie")
}

function getData(url) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}

