//input
const input = document.querySelector('.weight--field');

const parent = document.querySelector('.container');
const card_container = document.querySelector('.cards--container');

//output
const kgm = document.querySelector('.card--output--kgm');
const pd = document.querySelector('.card--output--pd');
const oc = document.querySelector('.card--output--oc');

const alertFunction = message => {
  const alert = document.createElement('div');
  alert.className = 'alert';
  alert.innerHTML =
     `<div class="alert--container">
     <p>${message}</p>
     </div>
     `;
  parent.insertBefore(alert, card_container);
  // input.value = '';

  setTimeout(()=> {
    document.querySelector('.alert').remove();
  }, 1200);
}

const conversion = input =>{
  const kgmValue = input / 1000;
  const pdValue = Math.floor(input * 2.205);
  const ocValue = Math.floor(input * 35.274);
  return { kgmValue, pdValue, ocValue};
}

input.addEventListener('input', e =>{

  //1. get input value
  const inputValue = e.target.value;

  if(isNaN(inputValue)){
    alertFunction('Please enter a numeric value for weight field.');
  }else if(inputValue < 0){
    alertFunction('Please enter a valid weight value for weight field');
  }
  else{
    const { kgmValue, pdValue, ocValue } = conversion(inputValue);
      if(kgmValue === 0 || pdValue === 0 || ocValue === 0){
        kgm.innerHTML= "";
        pd.innerHTML = "";
        oc.innerHTML = "";

      }else{
        kgm.innerHTML= kgmValue;
        pd.innerHTML = pdValue;
        oc.innerHTML = ocValue;
      }

    }

});
