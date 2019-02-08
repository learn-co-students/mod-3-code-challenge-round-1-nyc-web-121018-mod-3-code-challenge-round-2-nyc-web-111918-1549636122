document.addEventListener("DOMContentLoaded", function(){
  let listGroup = document.querySelector("#list-group")
  let beerDetail = document.querySelector("#beer-detail")



  fetch("http://localhost:3000/beers")
  .then(response => response.json())
  .then(parsed => {
    let bigString = ""
    parsed.forEach(function(element){
      bigString+= displayBeer(element)
    })
    listGroup.innerHTML = bigString
})

listGroup.addEventListener('click', function(e){
  if (e.target.tagName == "LI"){
    fetch(`http://localhost:3000/beers/${e.target.id}`)
    .then(r => r.json())
    .then(parsed => {
      beerDetail.innerHTML= singleBearHTML(parsed)
    })

  }
})

beerDetail.addEventListener('click', function(e){
  let button = document.querySelector("#edit-beer")
  if (e.target.id == "edit-beer"){
    let text = e.target.previousElementSibling.value
    fetch(`http://localhost:3000/beers/${button.className}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json",
      },
      body:JSON.stringify({description: text})
    }
  )
  .then(r => r.json())
  .then(changed => {beerDetail.innerHTML= singleBearHTML(changed)} )

  }

})





  function displayBeer(beer){
    return`
    <li class="list-group-item" id=${beer.id}> ${beer.name}</li>
    `
  }

  function singleBearHTML(beer){
    return`
    <h1 id=${beer.id}>${beer.name}</h1>
    <img src=${beer.image_url} >
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id= "edit-beer" class =${beer.id} >Save</button>
    `
  }
})
