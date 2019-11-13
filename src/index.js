let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const div_collection = document.querySelector("div#toy-collection")
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  load_data()
 
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }

    })


// console.log(document.querySelectorAll("button.like-btn"))
// document.querySelectorAll("button.like-btn").forEach((e)=>{
//   e.addEventListener("click",()=>{
//     alert("clicked")
//   })



function load_data(){
// fetch the data and render an array of object
  fetch("http://localhost:3000/toys")
  .then(resp => {if(!resp.ok){throw resp}; return resp.json()})
  .then(obj => append_div(obj,div_collection))
}
  // submit post 
  const form = document.querySelector("form.add-toy-form")
  const name = document.querySelector("input[name='name']")
  const image = document.querySelector("input[name= 'image']")
  
  //add Event listener on name na d image
  name.addEventListener("keypress",()=>{
    name.focus()
  })
  image.addEventListener("keypress",()=>{
    image.focus()
  })

  form.addEventListener("submit",(e)=>{
    console.log(`this is the value for the name ${name.value} and this is the one for the image ${image}`)
    create_new_avatar(name.value, image.value)
    //reset everything 
    name.value = " "
    image.value = " "
    e.preventDefault()
    return false

  })



function create_new_avatar(name,image){
  let obj = JSON.stringify({name: name, image: image, likes: 0})
  let params = {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: obj
  }

  fetch("http://localhost:3000/toys",params)
  .then(resp =>{if(!resp.ok){throw resp};  return resp.json()})
  .then(json => append_div([json]))
  .catch(e=> console.log(e.message))
}

function append_div (array,div_collection) {
 console.log(array)
  
  for(const elemnt of array){
    const div_el = document.createElement("div")
  
  div_el.classList = "card"
  div_el.style.marginBottom = "400px"
    div_el.innerHTML = `<h2>${elemnt.name}</h2><img src ='${elemnt.image}' class = 'tow_avatar' height = '400px' width = '400px'><p data-id = '${elemnt.id}'>${elemnt.likes} Likes</p> <button class = 'like-btn' data-id = '${elemnt.id}'> Like </button>`
    document.querySelector("div#toy-collection").appendChild(div_el)

  document.querySelector(`button[data-id='${elemnt.id}']`).addEventListener("click",(event)=>{
    like(elemnt.id,elemnt.likes)

  })
    // console.log(document.querySelectorAll("button.like-btn"))

}

// console.log(elemnt)


}

})
//eventlister on btn


// Like function 
function like(id,old_likes){
   let params =  {
     mehtod: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      id: id,
      "likes": 1                                    
    })
  }

    fetch(`http://localhost:3000/toys/${id}`)
    .then(resp => {if(!resp.ok){throw resp};return resp.json()})
    .then(json => {replace_div(json); console.log(json)})

}

function replace_div(json){
  document.querySelector(`p[data-id = '${json.id}']`).innerHTML=`${json.likes + 1}`
}