document.addEventListener('DOMContentLoaded', () => {
  const beerList = document.querySelector('#list-group')
  const beerDetail = document.querySelector('#beer-detail')
  let URL = 'http://localhost:3000/beers'

  fetchAllBeer();

  // Event Listeners

  beerList.addEventListener('click', e => {
    if (e.target.tagName = 'li') {
      fetch(`${URL}/${e.target.dataset.id}`)
        .then(r => r.json())
        .then(beer => showBeerDetail(beer))
    }
  })

  beerDetail.addEventListener('click', e => {
    if (e.target.innerText === 'Save') {
      let updatedDescription = beerDetail.querySelector('textarea').value

      fetch(`${URL}/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: updatedDescription
        })
      }) // end of PATCH fetch
    }
  })

  // helper functions

  function fetchAllBeer(allBeer) {
    fetch(URL)
      .then(r => r.json())
      .then(beer => {
        renderAllBeer(beer)
      })
  }

  function renderSingleBeer(b) {
    return `
    <li data-id=${b.id} class="list-group-item">${b.name}</li>`
  }

  function renderAllBeer(b) {
    beerList.innerHTML = b.map(renderSingleBeer).join('')
  }

  function showBeerDetail(b) {
    beerDetail.innerHTML =
      `<h1>${b.name}</h1>
      <img src=${b.image_url}>
      <h3>${b.tagline}</h3>
      <textarea>${b.description}</textarea>
      <button data-id=${b.id} id="edit-beer" class="btn btn-info">
        Save
      </button>`
  }

}) // end of DOMContentLoaded
