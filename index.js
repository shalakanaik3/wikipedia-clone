let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendResult(result) {
    let {
        link,
        title,
        description
    } = result;

    let divEl = document.createElement("div");
    divEl.className = "result-item";

    let titleEl = document.createElement("a");
    Object.assign(titleEl, {
        className: "result-title",
        href: link,
        target: "_blank",
        textContent: title
    });
    divEl.appendChild(titleEl);
    let titleLineBreakEl = document.createElement("br");
    divEl.appendChild(titleLineBreakEl);

    let linkEl = document.createElement("a");
    Object.assign(linkEl, {
        className: "result-url",
        href: link,
        target: "_blank",
        textContent: link
    });
    divEl.appendChild(linkEl);
    let linkLineBreakEl = document.createElement("br");
    divEl.appendChild(linkLineBreakEl);

    let descriptionEl = document.createElement("p");
    Object.assign(descriptionEl, {
            className: "link-description",
            textContent: description
        }),
        divEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(divEl);

}


function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {

        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                // console.log(response);
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(search_results);
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);