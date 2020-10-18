//1. grab the search bar
let filterInput = document.querySelector('.search__input');

//2. add event listener to it
filterInput.addEventListener('keyup', filterNames);

//3. function to filter names
function filterNames() {
  //3.1. get value of filterInput and convert it to upper case for comparision
  let filterValue = filterInput.value.toUpperCase();

  //3.2. get ul containing all the names
  let nameList = document.querySelector('.list');

  //3.3. get all the names from the nameList in a array
  let namesArray = Array.from(nameList.querySelectorAll('.list__item'));

  //3.4. loop through namesArray to compare filterValue with the names in the namesArray
  for (let i = 0; i < namesArray.length; i++){
    //3.4.1. get currentname
      let currentname = namesArray[i].innerText.toUpperCase();
    //3.4.2 compare both the names
      if(currentname.indexOf(filterValue) > -1){
        //if matched do nothing
        namesArray[i].style.display ='';
      }else{
        //else display none
        namesArray[i].style.display ='none';
      }
  }
}
