
 document.addEventListener("DOMContentLoaded", function(){
  const beerList = document.querySelector(".list-group")
  const showBeer = document.querySelector("#beer-detail")
  const beersURL = "http://localhost:3000/beers"

  fetch(beersURL)
    .then(r => r.json())
    .then(beers =>{
      let beerHTML = beers.map(beer =>{
        return `
        <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
        `
      })//end map
      beerList.innerHTML = beerHTML.join('')

    })//end then

  beerList.addEventListener("click", (e)=>{
  //console.log(e.target)
    if(e.target.className === "list-group-item"){
    let chosenBeer = parseInt(e.target.dataset.id)
    //console.log(chosenBeer);
      fetch(`http://localhost:3000/beers/${chosenBeer}`)
        .then(r => r.json())
        .then(beer =>{
          let chosenBeerHTML=`
          <h1>${beer.name}</h1>
          <img src=${beer.image_url}>
          <h3>${beer.tagline}</h3>
          <textarea>${beer.description}</textarea>
          <button class="edit-beer" data-id=${beer.id} class="btn btn-info">
            Save
          </button>
          `
          showBeer.innerHTML = chosenBeerHTML

        })//end then

      }//end of if

    })//end addEventListener
  showBeer.addEventListener('click', function(event){
    if(event.target.className === "edit-beer"){
    //console.log(event.target);
    let currentBeerId = parseInt(event.target.dataset.id)
    let updatedDescription = event.target.previousElementSibling.value
    console.log(updatedDescription);
    fetch(`http://localhost:3000/beers/${currentBeerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        description: updatedDescription
      })

    })//end fetch
    }
  })//end addEventListener


})//end DOMContentLoaded
