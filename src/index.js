document.addEventListener("DOMContentLoaded", function(){

const beerList = document.querySelector(".list-group")
const beerDetailsContainer = document.getElementById("beer-detail")
let allBeer = []


fetch("http://localhost:3000/beers")
  .then(r => r.json())
  .then(beersData =>{
  allBeer = beersData
      //console.log(beerData)
    let beerHTML = beersData.map(beer =>{
      return `
      <ul class="list-group">
        <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
      </ul>
      `
      //console.log(beersData)
    })//end map
    beerList.innerHTML += beerHTML.join('')

  })//end then

  beerList.addEventListener("click", (e)=>{
    //console.log(e.target);
    if(e.target.className === "list-group-item"){
    let beerId = (e.target.dataset.id);
    //console.log(beerId)
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(r => r.json())
    .then(function(myBeer){
      // console.log(myBeer)
      // console.log(myBeer.name);
      // console.log(myBeer.description);
      // console.log(myBeer.image_url);
      let beerDetailHTML =
          `<h1>${myBeer.name}</h1>
          <img src=${myBeer.image_url}>
          <h3>${myBeer.tagline}</h3>
          <textarea id="comments" data-id=${myBeer.id}>${myBeer.description}</textarea>
          <button data-id=${myBeer.id} class="btn btn-info">
            Save
          </button>`
          //console.log(beerHTML);
      beerDetailsContainer.innerHTML = beerDetailHTML
      //e.target.reset()
    });//end then
    }//close if statement
  })//end beerlist event listener

  //UPDATE description
  //allow changes in text box when new comments made hit save
  //need to listen for when save button is submitted
  //Optimistic- when submitted save to the DOM- whne choose another can go back and see changes
  //then save to the database


  // const saveBtn = document.querySelector("#edit-beer")
  const comments = document.querySelector("#comments")
  beerDetailsContainer.addEventListener('click', function(event){
    event.preventDefault()
    console.log(event.target);
    // console.log(event.target.previousElementSibling.value)
    const newComment = event.target.previousElementSibling.value
    console.log(newComment);
    //console.log(event.target.dataset.id)
    const commentId =  parseInt(event.target.dataset.id)
    console.log(commentId);
//
    fetch(`http://localhost:3000/beers/${commentId}`, {
      method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         description: newComment
       })
    })//end of fetch
    // .then(r => r.json())
    // .then(updtBeer => {
    //   let newBeerHTML=
    //   `<h1>${updtBeer.name}</h1>
    //   <img src=${updtBeer.image_url}>
    //   <h3>${updtBeer.tagline}</h3>
    //   <textarea id="comments" data-id=${updtBeer.id}>${updtBeer.description}</textarea>
    //   <button data-id=${updtBeer.id}class="btn btn-info">
    //     Save
    //   </button>`
      //console.log(beerHTML);
  // beerDetailsContainer.innerHTML += newBeerHTML
  //event.target.reset()


// })//end of then



})//end of event listener

})//end DOMContentLoaded
