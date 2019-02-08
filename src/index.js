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
        <button data-id="${clickedBeer.id}" class="btn btn-info">
          Save
        </button>
    `
  })

  beerInfo.addEventListener('submit', e => {
    e.preventDefault()
    if (e.target.className === "btn btn-info"){
      //Not sure how exactly to grab the value of the new text and push that up to the DOM. I know that I am
      //90% of the way there. Not sure how exactly to
      // let beerDescription = e.target.previousElementSibling.innerText //Don't think I need to set a variable for the old description since I am simply replacing the text
      let newBeerDescription = be.target.previousElementSibling.innerText

      fetch(`http://localhost:3000/beers/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: newBeerDescription
        })
      })
    }
  })
})//end of DOMContentLoaded
