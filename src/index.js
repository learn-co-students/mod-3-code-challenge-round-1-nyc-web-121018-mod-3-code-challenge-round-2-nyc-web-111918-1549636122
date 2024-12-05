document.addEventListener("DOMContentLoaded", ()=>{
const beerContainer = document.querySelector("#list-group")
const beerDetail = document.querySelector("#beer-detail")
const beerURL = "http://localhost:3000/beers"

fetch(beerURL)
.then(r => r.json())
.then(beerData =>{
  //console.log(beerData);
  let beerHTML = beerData.map(beer =>{
    return `
    <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
    `
  })//end map
  beerContainer.innerHTML = beerHTML.join('')

})//end then
beerContainer.addEventListener('click', (e)=>{
let chosenBeerId = parseInt(e.target.dataset.id)
//console.log(chosenBeerId);
if(e.target.className === "list-group-item"){
  fetch(`http://localhost:3000/beers/${chosenBeerId}`,)
  .then(r =>r.json())
  .then(chosenBeer =>{
    let chosenBeerDetailHTML = `
      <h1>${chosenBeer.name}</h1>
      <img src="${chosenBeer.image_url}">
      <h3>${chosenBeer.tagline}</h3>
      <textarea>${chosenBeer.description}</textarea>
      <button id="edit-beer" class="btn btn-info" data-id=${chosenBeer.id}>
        Save
      </button>
      `
    beerDetail.innerHTML = chosenBeerDetailHTML

  })//end then
}//end if statement

})//end addEventListener
beerDetail.addEventListener('click', (e)=>{
  e.preventDefault()
  //console.log(e.target);
  if(e.target.className === "btn btn-info"){
  let commentedBeerId = e.target.dataset.id
  //console.log(commentedBeerId);
  let newComments = e.target.previousElementSibling.value
  // console.log(newComments);

  fetch(`http://localhost:3000/beers/${commentedBeerId}`,{
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: newComments
    })//end JSON
  })//end fetch
  }//end if statement
})//end addEventListener





})//end DOMContentLoaded
