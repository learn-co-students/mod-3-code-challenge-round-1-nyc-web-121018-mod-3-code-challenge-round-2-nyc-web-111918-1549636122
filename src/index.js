
allBeers = []

document.addEventListener("DOMContentLoaded", ()=>{
  let beerContainer = document.getElementById('beer-list-group')
  let detailContainer = document.querySelector("#beer-detail")
  let beerDiv = document.querySelector("#editBeer")

    fetch("http://localhost:3000/beers")
    .then(r=> r.json())
    .then(beers => {
      allBeers = beers
      allBeers.forEach((beer)=>{
        beerContainer.innerHTML += `
        <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
        `
      })
    })//end of then

    beerContainer.addEventListener("click", e=>{
      if(e.target.className === "list-group-item"){
      // console.log(e.target)
      // console.log(e.target.dataset.id)
        let currentBeer = allBeers.find(beer =>{
          return beer.id === parseInt(e.target.dataset.id)
          // console.log(currentBeer)
        })
          detailContainer.innerHTML = `
          <div id="editBeer">
          <h1>${currentBeer.name}</h1>
          <img src="${currentBeer.image_url}">
          <h3>${currentBeer.tagline}</h3>
          <textarea id="description">${currentBeer.description}</textarea>
          <button data-id="${currentBeer.id}" id="edit-beer" class="btn btn-info">
            Save
          </button>
          </div>
          `
        }
    })

    detailContainer.addEventListener("click", e=>{
      if(e.target.id === "edit-beer"){
        // console.log(e.target.parentElement)

        let newDescription = e.target.previousElementSibling.value
        e.target.parentElement.querySelector("Textarea").innerHTML = newDescription

        fetch(`http://localhost:3000/beers/${e.target.dataset.id}`,{
          method: "PATCH",
          headers:{
            "Content-Type":"Application/json",
            "Accept":"Application/json"
          },
          body:JSON.stringify({
            description: newDescription
          })
        }).then(r=>r.json())
      }
    })

})// end of DOMContentLoaded
