//Buttons
const btnText = document.querySelector('.text');
const btnJson = document.querySelector('.json');
const btnAPI = document.querySelector('.data');
const btnSubmit = document.querySelector('.submit');
const btnReset = document.querySelector('.reset');


//input field
const text = document.querySelector('.title');
let body = document.querySelector('.body');


//RETRIVING DATA FROM LOCALE TEXT FILE
btnText.addEventListener('click', () => {
  fetch('sample.txt').then( response => {
    return  response.text();
  }).then( data => {
    body.innerHTML= data;
  }).catch((err) => {
    console.log(err);
  })
  body.classList.add('inside');
});

//RETRIVING DATA FROM LOCALE JSON FILE
btnJson.addEventListener('click',() => {
  fetch('users.json').then( response => {
    return response.json();
  }).then( data => {
    let output = '';
      data.forEach( user => {
        output += `
        <h2>Users Data</h2>
        <ul>
        <li>ID: ${user.id}</li>
        <li>Name: ${user.name}</li>
        <li>Email: ${user.email}</li>
        </ul>
        `;
    })
        body.innerHTML = output;
        body.classList.add('inside');
  })
});

//RETRIVING DATA FROM AN API
btnAPI.addEventListener('click', () => {
  fetch('https://jsonplaceholder.typicode.com/photos').then( response =>{
    return response.json();
  }).then( data => {
    // console.log(data);
     let output = '';
    data.forEach( img => {
      output += `
      <h2>Users Photos</h2>
      <div class = "img-container">
      <h2>${img.title}</h2>
      <img src="${img.url}" class = "photos">
      </div>
      `;
    });

    body.innerHTML = output;
    body.classList.add('inside');

  })
});

//RESETING BODY CONTENT
btnReset.addEventListener('click', () => {
  body.innerHTML = "";
  body.classList.remove('inside');
})
