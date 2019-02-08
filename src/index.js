let beerURL = `http://localhost:3000/beers`
let allBeers = []

document.addEventListener("DOMContentLoaded", function(event) {
  //console.log("DOM fully loaded and parsed");

  const beerList = document.querySelector('.list-group')
  const beerInfo = document.getElementById('beer-detail')
  fetch(beerURL)
  .then(response => response.json())
  .then(data => {
    allBeers = data
    //console.log(allBeers);
    let beers = allBeers.map(beer => {
      return `<li data-id=${beer.id}="list-group-item">${beer.name}</li>`
    }).join("")
    beerList.innerHTML += beers
  }) //fetches all beer names and appends to HTML


  beerList.addEventListener('click', e => {
    // console.log(e.target);
    let clickedBeer = allBeers.find(beer => {
      return parseInt(e.target.dataset.id) === beer.id
      console.log(e.target.dataset.id);
    })
    beerInfo.innerHTML =
    `
      <h1>${clickedBeer.name}</h1>
        <img src="${clickedBeer.image_url}">
        <h3>"${clickedBeer.tagline}"</h3>
        <textarea>${clickedBeer.description}</textarea>
        <button id="${clickedBeer.id}" data-id="edit-beer" class="btn btn-info">
          Save
        </button>
    `
  })

  beerInfo.addEventListener('click', e => {
    if (e.target.dataset.id === "edit-beer"){
      //Not sure how exactly to grab the value of the new text and push that up to the DOM. I know that I am
      //90% of the way there. Not sure how exactly to
      // let beerDescription = e.target.previousElementSibling.innerText //Don't think I need to set a variable for the old description since I am simply replacing the text on the DOM
      // console.log('e.target');
      let beerId = e.target.id

      let currentBeer = allBeers.find(beer => {
        return beer.id === parseInt(beerId)
      })
      let indexOfCurrentBeer = allBeers.indexOf(currentBeer) //find where in my allBeers array the current beer lives
      // console.log(currentBeer);
      let newBeerDescription = e.target.parentElement.querySelector('textarea').value //Where the description will live on the DOM
      // console.log(newBeerDescription);
      //
      fetch(`http://localhost:3000/beers/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: newBeerDescription
        })
      })
      .then (response => response.json())  //Parse the response and set the newbeer description to where the old beer description lived
      .then (newBeer => {
        allBeers[indexOfCurrentBeer] = newBeer
      })//fetch
    }
  })
})//end of DOMContentLoaded
