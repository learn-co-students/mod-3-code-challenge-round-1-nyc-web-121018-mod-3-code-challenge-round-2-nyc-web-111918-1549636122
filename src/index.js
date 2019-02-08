document.addEventListener("DOMContentLoaded", () => {

  const beerDetail = document.querySelector('#beer-detail')
  const beerList = document.querySelector('#list-group')
  allBeers = []

  function getBeers(){

    fetch('http://localhost:3000/beers')
    .then(r => r.json())
    .then(beers => {
      allBeers = beers
      console.log(allBeers)
      beersHTML = beers.map(function(beer){
        return `
      <li data-id= ${beer.id} class="list-group-item">${beer.name}</li>
        `
      })// END of beersHTML
      beerList.innerHTML = beersHTML.join('')
    })// END OF GET FUNCTION

  }// END OF getBeers Funtion

getBeers()


beerList.addEventListener('click', (e) => {
    let foundBeer = allBeers.find(beer => {
        return parseInt(e.target.dataset.id) === beer.id
        })
      beerDetail.innerHTML =

            `<h1>${foundBeer.name}</h1>
            <img src= '${foundBeer.image_url}'>
            <h3>${foundBeer.tagline}</h3>
            <textarea>${foundBeer.description}</textarea>
            <button data-id=${foundBeer.id} id="edit-beer" class="btn btn-info">
            Save
            </button> `



      })// END BEER DETAIL EVENT LISTENER

      beerDetail.addEventListener('click', (e) => {
             if (e.target.id === 'edit-beer') {

               currentId = e.target.dataset.id
               currentBeer = allBeers.find (beer =>
               beer.id === parseInt(currentId))

              newBeerDesc = e.target.parentElement.querySelector('textarea').value

              newBeerDesc = currentBeer.description
               console.log(newBeerDesc)

                fetch(`http://localhost:3000/beers/${e.target.dataset.id}`,{
                 method: "PATCH",
                 headers:{
                   "Content-Type" : "application/json",
                   "Accept" : "application/json"
                 },
                 body: JSON.stringify({
                   description: newBeerDesc
                   })
                 })  //end fetch
             }
           }) // end edit event listener


})// ENDED DOM CONTENT LOADED
