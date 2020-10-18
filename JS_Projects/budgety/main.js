/*
  basic aim for you in a project is to not expose or let things
  lie around everywhere, here now we have everything in function-
  getInput()-> gets input from various fields
  getDOMstrings()-> is a function to expose our DOMstrings object to other module for them
                    to add their qs in it
  setupEventListener()-> is a function needed to run eventListener
  ctrlAddItem()-> is a function which has TODO list and functions corresponding to it running
  init()-> is a function that makes our setupEventListener public which is otherwise private in IIFE

  Here some functions may be private and some may be public it is important to
  know how to access private function publically if needed via IIFE return object

*/



//BUDGET CONTROLLER
var budgetController = (function() {
/*
Your first priority in this is to figure out how to collect
income and expense i.e.
to distinguish between income and expense-> we'd choose object with properties like
description, values and id for income/expense and since we want many object we can create a function constructor
to instantiate different inc/exp objects
*/

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1; //to store calcPercentage result
  };

  Expense.prototype.calcPercentage = function(totalIncome){

      if(totalIncome > 0){
          this.percentage = Math.round(((this.value / totalIncome) * 100));
    } else{
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function(){
    return this.percentage;
  };

  var Income = function(id , description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };


  var calculateTotal = function(type){
    var sum = 0;

    data.allItems[type].forEach(function(current){
      sum += current.value;
      //for eg: current.value = Expense.value
    });
    data.totals[type] = sum;
    //for eg: data.totals.inc = sum
  }
/*
  data structure would keep track of income, expense, budget and % -> for 10 income (income object) -> storage needs to be array
  Its always better to have a data structure that stores everything, instead of having 10 different var -> objects
*/
 /*
  here still expenses and income store almost the same array hence to reduce it
  into sth simple we need a object that store them as properties
   var data = {
   allExpenses : [];
   allIncomes : [];
   totalExpenses : 0;
 }
  */

  var data = {
     allItems : {
       exp : [], //it'll store all the Expense object given by the user
       inc : [] //it'll store all the Income object given by the user
     },

     totals: {
       exp: 0,
       inc : 0
     },

     budget : 0,

     //-1 means doesn't exist at this time
     percentage: -1

  };




  return {
      addItem: function(type, des, val){
          var newItem, id ,arrayType;

          //'exp/inc' same as array name therfore no need for if block
          arrayType = data.allItems[type];
          //arrayType = income array of data object
          //this is to add element in the correct array and at the last position
          // element position in array -> id = last element id + 1,initially 0 or null for both income/expense
          if(arrayType.length>0){
            id = arrayType[arrayType.length - 1].id + 1;
            //for eg: next_id =  (inc(inc's last element)'id) + 1
          }else{
            id = 0;
          }


          //type coming from UIController getInput()
          if(type === 'exp'){
            newItem = new Expense(id, des, val);
          }
            else if(type === 'inc'){
              newItem = new Income(id, des, val);
            }

          //Pushing element in apt. array
          arrayType.push(newItem);

          //return newItem
          return newItem;
      },

      //what are the things we require to delete something from our database -> type and id
      deleteItem: function(type, id){
        var ids, index;
        /*
          id = 3
          data.allItems[type][id]
          will delete item only when we know that the id's of element
          will always be sorted, but this is not the case as on delete items
          it will change the order of items
        */
              ids = data.allItems[type].map(function(current){
          /*
            returns 2
            here this would return an array by map function with equal length
            as that of data.allItems[type] but with all elements = 2

            but we want an array with elements = id's of current elements (index)
            of the data.allItems[type]
          */

          /*
            data.allItems[type] = [1 2 4 6 8]
            id = 6
            ids = [1 2 4 6 8]
            here id of 6 is not 6 but index = 3
          */

              return current.id;

        });

        //index here is index of current id element as indexof returns index of element passed in
        index = ids.indexOf(id);
        /*
          for eg: id = 6
          index will be 3
        */


        //item not found
        if(index !== -1){

          //splice(position to start deleting, how many you want to delete)

          data.allItems[type].splice(index, 1);
          /*
            id= 6
            ids = [1 2 4 6 8]
            index = 3
            after deleting
            ids = [1 2 4  8]

          */
        }
       },

      calculateBudget: function(){

        //1. calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

        //2. calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

        //3.calculate the percentage of income that we spent
          if(data.totals.inc > 0){
            data.percentage =  Math.floor((data.totals.exp / data.totals.inc) * 100);
            /* for eg:
            Expense = 100
            Income = 200
            budget = 100
            percentage = 50%
            */
          }else{
            data.percentage = -1;
          }

      },

      calculatePercentages: function(){

          /*for all individual expenses object (i.e it must be a class prototype) this should run
            percentages = (expense/totalInc)*100
          */

          data.allItems.exp.forEach(function(current){
            current.calcPercentage(data.totals.inc);
          });

      },

      getPercentages: function(){
          var allPerc = data.allItems.exp.map(function(cur){
            return cur.getPercentage();
          })

          return allPerc;
      },

      getBudget: function(){

        //these values passes in the displayBudgets object
        return{
          budget: data.budget,
          percentage: data.percentage,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp
        }
      },

      // testing function for testing internal data objects
      testing: function(){
      console.log(data);
    },

  };

})();
//returning object






var UIController = (function() {
  /*
//     We must collect all the qs strings somewhere to avoid changing them
//     everywhere if we change something in the HTML code
//   */

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',    //common to both income item and expense item
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };





    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

            var formatNumbers = function(num, type) {
       var numSplit, int, dec, type;
       /*
         + or - before number
         exactly 2 decimal points
         comma separator for thousands

         2000 -> 2,000
       */

       //1. get absolute part of number for calculation
       num = Math.abs(num);

       //2. Take care of 2 decimal digits after decimal
       num = num.toFixed(2); //method of number prototype not Math, also rounds for more number after the decimal

       //3. comma separating thousands

         //3.1. split decimal part and integer part
       numSplit = num.split('.');

       int = numSplit[0];
       if (int.length > 3) {
            //int.substr(start, how many to read) -> gives first part of number
           int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
           //input 23510 length 5 (5-3=2) therfore 23,510
       }

       dec = numSplit[1];

       // type === 'exp' ? sign = '-' : sign = '+';
       return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

   };

   //convert list -> array for using forEach

   var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {

      /*
     //     following object will read input from different fields and it has
     //     to be public in order for other to access interval use it in different calculation.
     //     This object will be assigned to UIController and its closure will contain all things defined in here
     //     */
     //
     //     /*
     //     the Controller will call for these 3 values so they must be
     //     returned and the best way to return 3 values simultaneously is return
     //     them in the form of object with 3 properties
     //     */
     //



     getInput: function() {
     return {
         type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
         description: document.querySelector(DOMstrings.inputDescription).value,
         value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
     };
 },


        //     /*
        //     following method will add items to UI-> we need the object (to be added here,) passed
        //     in (income/expense) the array and also its type
        //     */
        addListItem: function(obj, type) {
            var html, newHtml, element;

            //1. create HTML string with placeholder text-> created by removing all the  spaces between the tags
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                //for income-> HTML string
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                //for expenses-> HTML string
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //2. Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumbers(obj.value, type));

            //3.Insert the HTML into the DOM
            //incomes -> children of income__list
            //       //expense -> children of expenses__list
            //       //syntax-> element.insertAdjacentHTML(position relative to html element(here last child of our html element-> income/expense__list),text)

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
             //beforeend - add these string to the last child of expense list
        },


        deleteListItem: function(selectorID) {

          //selectorID ==testID
          //In DOM, to remove an item we use removechild() and for that first
          //we need to go to the parentNode

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },


        //clear input fields
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            /*
              qsa returns list and we need array so to convert list -> array
              we use slice() that returns a copied array of an array passed to it,
              but we can pass a list(qsa) into it to get array
              but it needs array (as slice() can be called on arrays only) and
              we have list right now and so we use call(this)and pass fields as 'this'
          */

          //Now to clear fieldsArray element
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {

              /*
               current -> current element that is being processed
               index ->  [0 - (array.length - 1)]
               array -> entire array
               re current =  input.description and input.value
             */

                current.value = "";
            });

            fieldsArr[0].focus();
        },


        //budget display
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumbers(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumbers(obj.totalInc, type);
            document.querySelector(DOMstrings.expensesLabel).textContent =(obj.totalExp);

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },


        displayPercentages: function(percentages) {

            //percentages array
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            //it returns a nodeList as each HTML element stored in DOM tree are called node
           //nodeList donot have foreach functions hence we define our own foreach function

           nodeListForEach(fields, function(current, index) {

               if (percentages[index] > 0) {
                   current.textContent = percentages[index] + '%';
               } else {
                   current.textContent = '---';
               }
           });

          },

        displayMonth: function(){
            var now, year, month, months;

            now = new Date(); //returns todays date

            months = ['January', 'February', 'March',
                      'April', 'May', 'June',
                      'July', 'August', 'September',
                      'October', 'November', 'December'];

            month = now.getMonth();

            // var christmas = new Date(2016, 11, 25);-> dec- 11 (0 based)
            year = now.getFullYear();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

            // months 0 based array
        },


      changedType: function() {

        var fields = document.querySelectorAll(
              DOMstrings.inputType + ',' +
              DOMstrings.inputDescription + ',' +
              DOMstrings.inputValue);

          nodeListForEach(fields, function(cur) {
             cur.classList.toggle('red-focus');
          });

          document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

      },

       //making DOMstrings object public for other modules to save their qs in it
       getDOMstrings: function() {
           return DOMstrings;
       }
   };

})();



// GLOBAL CONTROLLER

/* In here we tell other controllers what to do. Other controllers have
method to read/calculate sth, we call those method in here(onclicks or keypress)
*/


var Controller = (function(budgetCtrl, UICtrl) {

/*
  event listeners are hanging around, we want everything to be organised and in a function - init()
  private function cannot be called but this must be called for action -
  to do so we can create a public initialisation function and return in the iife object
*/


//initially all these dom calls were lying here and there but now they are a part of function

  var setupEventListener = function() {
    //retrieving getDOMstrings object for different qs
    var DOMobj = UICtrl.getDOMstrings();

    document.querySelector(DOMobj.inputBtn).addEventListener('click',
      ctrlAddItem);


    //this is to call ctrlAddItem method when someone presses enter
    document.addEventListener('keypress', function(e) {

      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();

      }

 document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);        
    });
    /*
      Recall
        Event Bubbling ->  All the elements in a HTML file(including root <html> element)
            gets an event when any of their child element gets an event and all know
            which is the target element

        Event Delegation -> It stands for the practice of attaching
              event to the parent element instead of the target element and then
              running the event on the event when it "bubbles up"

          Done when-
          a)  we don't want event to get attached to all the elements
          b)  event is on a element which is yet to be declared


     */
    /*
      here event delegation is done on the parent container for all the delete buttons
      as some may yet not be present on the screen, but we want event to be attached to them
      as well-> event bubbling is used
    */
    document.querySelector(DOMobj.container).addEventListener('click',ctrlDeleteItem);

  };

  var ctrlAddItem = function() {
      var input, newItem;

    //TO DO LIST

    //1. Get input from the display-> supplied in uicontroller and budgetcontroller to add
    input = UICtrl.getInput();
    // console.log(input);

    //to prevent user from supplying no description and value
    // isNaN(number) returns true if number = NaN and false otherwise
    if(input.description!== "" && !isNaN(input.value) && input.value > 0 ){

    //2. Add those input value in BudgetController
            //addItem returns that newItem and hence it need to be stored somewhere
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //pass newItem to addListItem()

    //3. Add the item in the UI
    UICtrl.addListItem(newItem, input.type);

    //4. clear fields
    UICtrl.clearFields();

    //5. calculate and update budget
    updateBudget();

    //6. Calculate and update Percentages
    updatePercentages();     /*expense % needs to be calculated each
    time we add/delete some expense and update budget__title*/

}

};


  var updateBudget = function(){
    //1.Calculate the budget
      budgetCtrl.calculateBudget();

    //2. Return the budget
      var budget = budgetCtrl.getBudget();
      // console.log(budget);

    //3. Display the budget on the screen
        UICtrl.displayBudget(budget);

    //4. Calculate and update Percentages
      updatePercentages();
  };

    var updatePercentages = function(){

        //1. calculate the percentages
          budgetCtrl.calculatePercentages();

        //2. Read percentages from the budget CONTROLLER
          var percentages = budgetCtrl.getPercentages();

        //3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    }


    var ctrlDeleteItem = function(event){

    var itemId, splitId, type, Id;
    //event.target property tells where event was fired
    //DOM traversal-> event.target.parentNode returns parent element HTMl

    //console.log(event.target.parentNode(button).parentNode(item-delete).parentNode(right-clearfix).parentNode(item clearfix).id)->returns income-id

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    //this asks that itemId is existing
    if(itemId){

      //for eg: itemId -> inc-1

      splitId = itemId.split('-'); //returns array-> ['inc','1'] //both string
      type = splitId[0];
      // id = splitID[1]; //this id is used in deleteItem() and
      //here it is string type right now and thats why if block of that function always returned -1
      Id = parseInt(splitId[1]);

      //1. delete the item from the data structure
        budgetCtrl.deleteItem(type, Id);
      //2. delete the item from the UI
        UICtrl.deleteListItem(itemId);
      //3. update budget and show the new budget
        updateBudget();
    }



  };

  return {
    init: function() {
      console.log('Everything is ready to be used, Sir!!!');

        UICtrl.displayMonth();

        UICtrl.displayBudget({
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: -1
        })
        setupEventListener();
    }


  };
})(budgetController, UIController);

//runs init function and allows addEventListener
Controller.init();
