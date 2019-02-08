


document.addEventListener("DOMContentLoaded", function(event) {

  const beerList = document.querySelector("#list-group")
  const beerContainer = document.querySelector("#beer-detail")

  console.log(beerList)
  console.log(beerContainer)
  let allBeers = []

fetchBooks()
// editBeer()
// singleBeer()
 // [1] fetch beer list
function fetchBooks(){
  fetch ("http://localhost:3000/beers")
      .then(r => r.json())
      .then(beers => {
      allBeers = beers
        // console.log(beer.name)
      let beerHTML = beers.map(function(beer) {
          return `
          <ul class="list-group">
            <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
          </ul>
          `
      })
      beerList.innerHTML =
      beerHTML.join('')
  })
} // end fetch books


// http://localhost:3000/beers/:id
//   [2] fetch beer display
//     <div id="beer-detail">

  // fetch singleBeer(){
    beerList.addEventListener('click', (e) => {
        if (e.target.className === 'list-group-item') {
          console.log("HEY")
        //   // resizeText(1)
          let foundBeer = allBeers.find( (beer)=>{
            return beer.id == e.target.dataset.id
            console.log(beer.id)
            })
            fetch('http://localhost:3000/beers/' + `${foundBeer.id}`)
              .then ( response => response.json())
              .then ( foundBeer =>{
                oneBeer = foundBeer
                beerContainer.innerHTML +=
                  `
                  <h1 class="ui-header" data-id=${foundBeer.id}> ${foundBeer.name}</h1>
                    <img data-id=${foundBeer.id} src="${foundBeer.image_url}">
                    <h3> ${foundBeer.tagline}</h3>
                    <br>
                    <textarea name="beerEdit" form="beer" class="description">${foundBeer.description}</textarea>
                    <button data-id=${foundBeer.id} id="edit-${foundBeer.id}" class="btn btn-info" data-action="edit">Save</button>
                  `
                })
          } //end if statement
  }) // end beer event listener


  //
  // [3] Edit beer

  // function editBeer(){

    beerContainer.addEventListener('input', (e) =>{
      if (e.target.className === "description") {
        console.log("DESCRIPTION")
      }
    })


      beerContainer.addEventListener('click', (e) => {
          if (e.target.dataset.action === 'edit') {
            currentId = e.target.dataset.id
            currentBeer = allBeers.find (beer =>
            beer.id === parseInt(currentId))

            newDescription = e.target.parentElement.querySelector('textarea').value
              // let editNewDescription = editDescription.value
            console.log(newDescription)

            fetch(`http://localhost:3000/beers/${e.target.dataset.id}`,{
              method: "PATCH",
              headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json"
              },
              body: JSON.stringify({
                description: newDescription
                })
              })  //end fetch 


          }
        }) // end edit event listener



        // editBeer.addEventListener("submit," (e) => {
        //   e.preventDefault()
        //
        //
        // //
        //   fetch(`http://localhost:3000/beers/${beerData.id}`, {
        //     method: 'PATCH',
        //     body: JSON.stringify({
        //       description: editDescription
        //     }),
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   }).then( response => response.json() )
        //   .then( book => {
        //     editedDescription.innerHTML = `
        //       <br>
        //       <textarea name="beerEdit" form="beer" class="description">${beerData.description}</textarea>
        //     `
        //     editForm.innerHTML = ""
        //   })
        // })

         //edit Beer Event Listener



  // } // end fucntion edit Beer

}) // END DOMContentLoaded
