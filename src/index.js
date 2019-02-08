
allBeers = []
document.addEventListener("DOMContentLoaded", e => {
  const beerDetail = document.getElementById("beer-detail")
  const beerList = document.getElementById("list-group")


  fetch("http://localhost:3000/beers")
  .then(r => r.json())
  .then(data => {
    allBeers = data
    allBeers.map(beer => {
      beerList.innerHTML += `
      <ul class="list-group">
    <li data-id=${beer.id}class="list-group-item">${beer.name}</li>
    </ul>
      `
    })
  })

  beerList.addEventListener('click', e => {
    foundBeer = allBeers.find(beer => {
      if(beer.id === parseInt(e.target.dataset.id)) {

        fetch(`http://localhost:3000/beers/${beer.id}`)
        .then(r => r.json())
        .then(foundBeer => {

          beerDetail.innerHTML += `
          <h1>${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea id="new-description">${beer.desription}</textarea>
          <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
          Save
          </button>
          `
        })

        }

      })

    })

    beerDetail.addEventListener("submit", e => {
       // let newDescription = document.getElementById("new-      description").value
       // console.log(newDescription);
      if (e.target.id === "edit-beer") {
        e.preventDefault()

      }
      // if (e.target.id === "new-description"){
      //   let newDescription = document.getElementById("new-      description").value
      //   console.log(newDescription);
      //}


    //   foundBeer = allBeers.find(beer => {
    //     if(beer.id === parseInt(e.target.dataset.id)) {
    //
    //    let newDescription = document.getElementById("new-      description").value
    //
    //    // fetch(`http://localhost:3000/beers/${beer.id}`, {
    //    //   method: "PATCH",
    //    //   headers: {
    //    //     "Content-Type": "application/json",
    //    //     "Accept": "application/json"
    //    //   },
    //    //   body: JSON.stringify ({
    //    //     desription: newDescription
    //    //   })
    //    //
    //    // })
    //
    //   // }

     })//beerdetail event listener

  })//end of DOM
