const url = 'http://localhost:3000/beers'
let allBeers = []
document.addEventListener("DOMContentLoaded", function(event) {
  const listGroup = document.querySelector('#list-group')
  const beerDetail = document.querySelector('#beer-detail')

  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    allBeers = data
    listGroup.innerHTML = allBeers.map(addHTMLforBeerList).join('')
  })

  listGroup.addEventListener('click', e => {
    currentId = e.target.dataset.id
    currentBeer = allBeers.find(b => b.id === parseInt(currentId))
    beerDetail.innerHTML = addHTMLforBeerDetail(currentBeer)
  })

  beerDetail.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      currentId = e.target.dataset.id
      currentBeer = allBeers.find(b => b.id === parseInt(currentId))
      newDescription = e.target.parentElement.querySelector('textarea').value

      //update local variables
      currentBeer.description = newDescription

      //update the DOM
      beerDetail.innerHTML = addHTMLforBeerDetail(currentBeer)

      //update the Database
      fetch(`${url}/${currentBeer.id}`,{
        method:'PATCH',
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: newDescription
        })
      })
    }
  })



});

function addHTMLforBeerList(beer) {
  return `<li data-id="${beer.id}"class="list-group-item">${beer.name}</li>`
}

function addHTMLforBeerDetail(beer) {
  return `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <button data-id="${beer.id} id="edit-beer" class="btn btn-info">
    Save
  </button>
  `
}
