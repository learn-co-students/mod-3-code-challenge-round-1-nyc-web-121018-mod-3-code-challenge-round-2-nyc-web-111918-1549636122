const url = "http://localhost:3000/beers"

// when page is loaded, do these
document.addEventListener("DOMContentLoaded", (e)=>{
  // the script tag is at the bottom of the page so these could be outside DOMContentLoaded
  // but i think this is more consistent
  let beerList = document.querySelector(".list-group")
  let beerDetail = document.querySelector("#beer-detail")

// fetching
  function fetchAllBeers(){
    fetch(url)
      .then(r => r.json())
//      .then(parsed =>console.log(parsed))
      .then(beers => displayBeerList(beers))
  }

  function fetchSingleBeer(id){
    fetch(`${url}/${id}`)
      .then(r => r.json())
      .then(beer => displaySingleBeer(beer))
  }

  function postBeerEdits(id, newDescription){
    console.log(newDescription)
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({description: newDescription})
    })
      .then(r => r.json())
      .then(console.log)
  }

//displaying
  // TODO breakout into helper
  function displayBeerList(beers){
    beerList.innerHTML += beers.map(function(beer){
      return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
    }).join("")
  }

  function displaySingleBeer(beer){
    beerDetail.innerHTML= `<h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">Save</button>`
  }

// event listeners
  beerList.addEventListener("click",(e)=>{
    //console.log(e.target.dataset.id)
    let singleBeer = fetchSingleBeer(e.target.dataset.id)
//    beerDetail.innerHTML = displaySingleBeer(singleBeer)
// tried to get this to work for cleaner more compartmentalized code
// but couldn't get desired return value from fetch
  })

  beerDetail.addEventListener("click", (e)=>{
    if (e.target.className.includes("btn")){
      //console.log(e.target)
      //console.log(e.target.dataset.id)
      //console.log(e.target.previousElementSibling.innerHTML)
      let beerId = e.target.dataset.id
      let newDescription = e.target.previousElementSibling.value
      postBeerEdits(beerId, newDescription)
    }
  })

// run
fetchAllBeers()
}) //end of DOMContentLoaded
