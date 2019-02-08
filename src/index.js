document.addEventListener("DOMContentLoaded", function(){
  let allBeers = []
const beerContainer = document.getElementById("list-group")

const beerDetailsContainer = document.getElementById("beer-detail")

fetch("http://localhost:3000/beers")
  .then(r => r.json())
  .then(beers =>{
    let beersHTML = beers.map(beer =>{
      allBeers = beers
      return `
      <table>
      <tr>
      <td class="beerName" data-id=${beer.id}>${beer.name}</td>
      </tr>
      </table>
      `
    })//end of map
    beerContainer.innerHTML += beersHTML.join('')

  })//end then

  beerContainer.addEventListener("click", function(e){
    //console.log(e.target)


    let foundBeer = allBeers.find(beer => {
      return parseInt(e.target.dataset.id) ===beer.id
    })
    let beerDetailsHTML = `<h2>${foundBeer.name}</h2>
    <div>
    <img src=${foundBeer.image_url}/>
    <h4>${foundBeer.tagline}</h4>
    </div>
    <form>
    <input type="text" data-id=${foundBeer.id}
   value="${foundBeer.description}">
     <input type="submit" value="save">
    </form>
    `
    beerDetailsContainer.innerHTML = beerDetailsHTML
    // console.log(beerDetailsContainer);
    // console.log(beerDetailsHTML);
})
beerDetailsContainer.addEventListener("submit", (e)=>{
  e.preventDefault()
  //console.log(e.target);
  let comment = e.target.children[0].value
  //console.log(comment);yes!!
  console.log(e.target.parentElement.children[0].dataset.id)

  fetch(`http://localhost:3000/beers/${e.target.parentElement.children[0].dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          description: comment
        })
    })

})




})//end DOMContentLoaded
