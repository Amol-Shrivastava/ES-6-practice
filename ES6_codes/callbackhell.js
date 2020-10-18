/*Callback hell is a situation of nesting many callback function
  within one another making it difficult to understand the code */


function getRecipe(){
  //1. get Recipe array after 1.5s
    setTimeout(() => {
      const recipeID = [1,2,3,4,5];
      console.log(recipeID);

    //2. getting recipe corresoponding to a recipeId after 1.5s
        setTimeout(id => {
          console.log(`After 1.5s`);
            const recipe = {
              title: 'Butter Chicken',
              publisher: 'Angad Singh'
        }
        console.log(`${id}: ${recipe.title} by ${recipe.publisher}`);

        //3. getting recipe corresoponding to a publisher after 1.5s
            console.log(`After 1.5s`);
            setTimeout(publisher => {
              const recipe2 = {
                title: 'Chicken Wings',
                publisher: 'Angad Singh'
              }

              console.log(`${publisher} has another recipe called ${recipe2.title}`);
              //3rd callback over
          }, 1500, recipe.publisher);
          //2nd callback over
      },1500, recipeID[2]);
      //1st callback over
  }, 1500);
}

getRecipe();
