const URL = `http://localhost:3000/beers`                     // RESTful URL for all requests
const sideBar = document.getElementById("list-group")         // grab the list-group (sidebar) id
const showBeer = document.getElementById("beer-detail")       // grab the beer-detail to show individual beers

let allBeers = []                                             // create local variable
let clickedBeer;                                              // local variable for when a user clicks a beer
let updateDescription;                                        // local varialbe to store textarea value when a user clicks save

// wait until all content loaded
document.addEventListener("DOMContentLoaded", function(event) {

  // initial get request to display all beers on the sideBar
  fetchBeers(URL)

  // listen for clicks on the sideBar
  sideBar.addEventListener("click", e => {
    //fetch request to URL/individual beer id, and reders pessimistically to the DOM
    fetchSingleBeer(`${URL}/${e.target.dataset.id}`)
  })

  // listens for a user clicking on the save button
  showBeer.addEventListener("click", e => {
    clickedBeer = findBeer(e.target.dataset.id)

    // delegate listener action for just clicks on the 'Save' button
    if (e.target.id === "edit-beer") {
      // grab DOM textarea element
      const textArea = document.getElementById(`${clickedBeer.name}`)
      // save the value to a local variable
      let updateDescription = textArea.value

      // fetch for PATCH to update the DB
      fetchUpdateBeerDescription(`${URL}/${e.target.dataset.id}`, updateDescription)
    }
  })
}) // end DOMContentLoaded


// ------------------------------ Fetch ----------------------------------------

// initial fetch to GET all beers from the DB
function fetchBeers(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(beers => {
      allBeers = beers
      sideBar.innerHTML = createSideBar(allBeers)
    })
}

// fetch to GET clicked beer from sideBar to the and render to showBeer container
function fetchSingleBeer(url) {
  fetch(url)
    .then( resp => resp.json())
    .then ( beer => {
      // render pessimistically
      showBeer.innerHTML = showClickedBeer([beer])
    })
}

// fetch request to PATCH -- this updates the DB when a user updates the beer description
// after clicking save on showBeer container
// no need to change DOM because the change are made directing to the user textarea
function fetchUpdateBeerDescription(url, updateDescription) {
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      description: updateDescription
    })
  })
}

// ------------------------------ Create HTML ----------------------------------

// creates all HTML for the sideBar after the intial fetch request
function createSideBar(beers) {
  return beers.map(beer => {
    return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
  }).join("")
}

// creates HTML for an individual beer after a user clicks on one beer from the sideBar
function showClickedBeer(beer) {
  return beer.map( info => {
    return `<h1>${info.name}</h1>
            <img src="${info.image_url}" alt="Picture of ${info.name}">
            <h3>${info.tagline}</h3>
            <textarea id="${info.name}">${info.description}</textarea>
            <button id="edit-beer" class="btn btn-info" data-id="${info.id}"> Save </button>`
  })
}

// ------------------------------ Helpers --------------------------------------

// find helper function to find a beer from our local variable
// finds by id 
function findBeer(id) {
  return allBeers.find( beer => beer.id === parseInt(id))
}
