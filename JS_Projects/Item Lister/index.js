// //create element
// var newDiv = document.createElement('div');
//
// //ADD class name
// newDiv.className = 'hello';
//
// //ADD id
// newDiv.id = 'hello1';
//
// //ADD attributes
// newDiv.setAttribute('title', "Hello Div");
//
// //Create text Node
// var newDivText = document.createTextNode('Hello World');
//
// //ADD text to div
// newDiv.appendChild(newDivText);
//
// console.log(newDiv);
//
// //ADD this into DOM
//
// var cont = document.querySelector('.container');
//
// var h1 = document.querySelector("h1")

// cont.insertBefore(newDiv, h1);

// var button = document.getElementById('btn');
//
// var output = document.getElementById('output');
//
// var select = document.querySelector('select');
//
// // button.addEventListener('click', e => {
// //   output.innerHTML = '<h3>'+ e.target.id +'</h3>';
// // });
//
// select.addEventListener('change', runEvent);
//
// function runEvent(e){
//  output.innerHTML = '<h3>'+ e.target.value +'</h3>'
// }

var form = document.getElementById('addForm');
var item = document.getElementById('item');
var list = document.getElementById('items');
var delBtn = Array.from(document.querySelectorAll('.delete'));
var filter = document.getElementById('filter');

form.addEventListener('submit', e =>{
  e.preventDefault();

  //get content of the input
  var val = item.value;

  //create li element
  var li = document.createElement('li');
  li.className = 'list-group-item';

  //add val to the li
  li.appendChild(document.createTextNode(val));

  //create button element
  var btn = document.createElement('button');
  btn.className = 'btn btn-danger btn-sm float-right delete';
  btn.appendChild(document.createTextNode('X'));

  //append btn to li
  li.appendChild(btn);

  //append li to list
  list.appendChild(li);

  item.value = '';
})

//event delegation approach

// list.addEventListener('click', e => {
//   if(e.target.classList.contains('delete')){
//     var grandparent = e.target.parentNode.parentNode;
//     grandparent.removeChild(e.target.parentNode);
//
//   }
// })

//foreach approach
delBtn.forEach(b => b.addEventListener('click', (e)=>{
  var grandparent = e.target.parentNode.parentNode;
  grandparent.removeChild(e.target.parentNode);
}));


filter.addEventListener('keyup', e => {

  //get entered Text and convert it to lowercase
  var text = e.target.value.toLowerCase();

  //get all the li's
  var listItems = Array.from(list.getElementsByTagName('li'));

  //get list content
  listItems.forEach(item => {
      var itemText = item.firstChild.textContent.toLowerCase();
      if(itemText.indexOf(text) != -1){
            item.style.display = "block";
        }
        else{
          item.style.display = "none";
        }
    })

})
