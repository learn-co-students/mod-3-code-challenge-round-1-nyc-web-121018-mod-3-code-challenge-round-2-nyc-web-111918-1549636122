const url = "http://localhost:3000/beers"
let allBeers = []
let listGroup
let beerDetail
let editBeer


function apiGet() {
  fetch(url)
    .then(r => {
      return r.json()
    })
    .then(r => {
      allBeers = r
    })
    .then(r => {
      showAllBeers()
    })
}

function apiPatch(id, description) {
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      description: description,
    })
  })
  .then( r => { getBeerById(id).description = description})
  .then(r => {  showBeer(id)})
}

function showAllBeers() {
  for (let beer of allBeers) {
    listGroup.innerHTML +=
      `
    <li data-id="${beer.id}" class="list-group-item">${beer.name}</li>
    `
  }
}

function getBeerById(id) {
  let found = allBeers.find(element => {
    return element.id == id
  })
  return found
}

function showBeer(id) {
  beer = getBeerById(id)
  beerDetail.innerHTML =
    `
  <h1>${beer.name}</h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea id="new-beer-description">${beer.description}</textarea>
<button data-id="${beer.id}" id="edit-beer" class="btn btn-info">
  Save
</button>
  `
}



document.addEventListener("DOMContentLoaded", e => {
  listGroup = document.querySelector('#list-group')
  beerDetail = document.querySelector('#beer-detail')


  apiGet()

  listGroup.addEventListener('click', e => {

    id = e.target.dataset.id
    showBeer(id)

    editBeer = document.querySelector('#edit-beer')


    editBeer.addEventListener('click', e => {
      let newBeerDescription = document.querySelector('#new-beer-description').value
      e.preventDefault()
      // console.log(id, newBeerDescription);
      apiPatch(id, newBeerDescription)
    }) // end of editBeer listener

  }) // end of listGroup event listener



  console.log("hello");
}) // end of dom event listener
