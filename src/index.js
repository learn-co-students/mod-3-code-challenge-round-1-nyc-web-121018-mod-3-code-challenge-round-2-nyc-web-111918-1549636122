document.addEventListener('DOMContentLoaded', (e) =>{

//**** VARS ****//
  let beerList = document.getElementById('list-group')
  let beerDetail = document.getElementById('beer-detail')
  let allBeers = []
//**** VARS ****//


//**** FETCH ****//
  fetch('http://localhost:3000/beers')
  .then(r => r.json())
  .then(beers => {
    allBeers = beers
    const beerTitles = allBeers.map(beer => {
      return beerListHTML(beer)
    })
    beerList.innerHTML += beerTitles.join('')
  })//end of .then
//**** FETCH ****//


//**** EVENT LISTENERS ****//

  beerList.addEventListener('click', (e) => {
    if(e.target.tagName = "LI"){
      let foundBeer = allBeers.find(beer => {
        return beer.id === parseInt(e.target.id)
      })//end of .find
      beerDetail.innerHTML = displayBeer(foundBeer)
    }//end of if stmt
  })//end of beerlist event listener

  beerDetail.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){

      let currentBeer = allBeers.find(beer => {
        return beer.id === parseInt(e.target.parentElement.id)
      })
      let indexCurrentBeer = allBeers.indexOf(currentBeer)
      console.log(indexCurrentBeer);
      let beerDescription = document.getElementById('description').value
      const beerId = e.target.parentElement.id

      fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: `${beerDescription}`
        })
      })//end of fetch
      .then(r => r.json())
      .then(newBeer => {
        beerDetail.innerHTML = displayBeer(newBeer)
        allBeers[indexCurrentBeer] = newBeer
      })// then of .then // pessimistically render new description in the beerDetail field // update local variables
    } // end of if stmt
  })//end of beer detail event listener

//**** EVENT LISTENERS ****//


})//end of DOM Content Loaded

//**** FUNCTIONS ****//

function beerListHTML(beer){
  return `
  <li id="${beer.id}"class="list-group-item">${beer.name}</li>
  `
}

function displayBeer(beer){
  return `
  <div id="${beer.id}">
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id="description">${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">Save</button>
  </div>
  `
}

//**** FUNCTIONS ****//
