/*The Promise object represents the eventual completion (or failure)
of an asynchronous operation, and its resulting value.*/ 

const recipeArr = new Promise((resolve, reject) => {
  //1. getting recipe array
  setTimeout(()=>{
    const recipeID = [1, 2, 3, 4, 5, 6];
    resolve(recipeID);
  },1500);

});

  //2. getting recipe for a particular ID
const recipeForID = recID => {
  return new Promise((resolve, reject) =>{
    setTimeout(id => {
      const recipe = {
        title: 'Butter Chicken',
        publisher: 'Angad Singh'
      }
      resolve(`${id} : ${recipe.title} is a recipe given by ${recipe.publisher}`);
    }, 1500, recID);
  })
}

  //2. getting recipe for a particular publisher
    const recipeForPublisher = publisher => {
        return new Promise((resolve, reject) => {
          setTimeout(pub => {
            const recipe = {
              title: 'Chicken Wings',
              publisher: 'Angad Singh'
            }
            resolve(`${recipe.title} is another recipe given by ${recipe.publisher}`);
          }, 1500, publisher)

        })
    }

recipeArr
.then(recipeArray =>{
  console.log(`Printing recipe array after 1.5s`);
  console.log(recipeArray);

  return recipeForID(recipeArray[2]);
})

.then(recipe => {
  console.log(`Printing recipe after 1.5s`);
  console.log(recipe);

  return recipeForPublisher('Angad Singh');
})

.then(recipe => {
  console.log(`Printing recipe after 1.5s`);
  console.log(recipe);
})
