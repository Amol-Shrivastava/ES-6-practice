const APIKey = '1d0af74a84a22e97abf9563bdedb60d600ccaf22';
const URL_holidays = 'https://calendarific.com/api/v2/holidays';
const URL_countries = 'https://calendarific.com/api/v2/countries';
const URL_countries_details = 'https://restcountries.eu/rest/v2/all';

const container = document.getElementById('container');

//input details
const form = document.getElementById('form');
const yearsInt = document.getElementById('years');
const select_box = document.getElementById('select-box');
const reload = document.getElementById('reload');
const selected = document.getElementById('selected');
let options_cont = document.getElementById('options_cont');
const selected_country = document.getElementById('selected_country');
const options_country = document.getElementById('options_cont_Country');

//output section--> Festival details
const festival = document.getElementById('festival');
const date_info = document.getElementById('date_info');
const month_info = document.getElementById('month_info');
const year_info = document.getElementById('year_info');
const day_info = document.getElementById('day_info');
const format = document.querySelector('.format');

//output section--> countdown details
const weeks = document.getElementById('weeksVl');
const days = document.getElementById('dayVl');
const hours = document.getElementById('hrsVl');
const minute = document.getElementById('minVl');

// const country = "IN";

//format to get holidays
//https://calendarific.com/api/v2/holidays?api_key=baa9dc110aa712sd3a9fa2a3dwb6c01d4c875950dc32vs

//format to get holidays of a country for a particular year
//'https://calendarific.com/api/v2/holidays?&api_key=baa9dc110aa712sd3a9fa2a3dwb6c01d4c875950dc32vs
//&country=US&year=2019'

//function to call all the holidays
const apiHolidayCall = (id , year) => {
  console.log(`${id} + ${year}`);
  // const [holidayVal, yearEl] = inputValidation();
  fetch(`${URL_holidays}?api_key=${APIKey}&country=${id}&year=${year}`) //${yearEl}
    .then(result => result.json())
    .then(data => {
        displayHolidaysOption(data.response.holidays);
      }).catch(err => creatingErrorDiv(`sorry cannot fetch this holiday.
         Error:${err}`));
    }

//show holidays and countries options
const showOptions = () => {
  selected_country.addEventListener('click', () => {
    options_cont.classList.remove('active');
    options_country.classList.toggle('active');
  })

  //For holiday
  selected.addEventListener('click', () => {
    options_country.classList.remove('active');
    options_cont.classList.toggle('active');
  });
}

//printing options in the option list
const displayHolidaysOption = arr => {
  // adding all the options for holiday
  arr.forEach(el => {
    let div = document.createElement('div');
    div.className = 'option';
    div.innerHTML = `
      <label class="label-text" for="${el.name}">${el.name}</label>
      <input type="radio" class="radio" id="${el.name}" name="category">
      `;

    options_cont.appendChild(div);

    console.log(options_cont);
    div.addEventListener('click', e => {
      console.log(e.target);
        printName(arr, e.target);
    })
  })

  //adding selected option to the selected option container
  options_cont.addEventListener('click', e => {

    if (e.target.classList.contains('label-text')) {
      selected.innerText = e.target.innerText;
    } else if (e.target.classList.contains('option')) {
      // console.log(e.target);
      selected.innerText = e.target.firstElementChild.innerText;
    }
    options_cont.classList.remove('active');
  });
 }

 //function to call all the countries
 const apiCountryCall = () => {
      fetch(`${URL_countries}?api_key=${APIKey}`)
     .then(result => result.json())
     .then(data => {
           displayCountriesOptions(data.response.countries);
     })
 }


//function to display all the countries
let displayCountriesOptions = arr => {
  arr.forEach( ({ uuid, country_name: country, "iso-3166": alpha2Code}) => {
    let div = document.createElement('div');
    div.className = "option";
    div.innerHTML = `
    <input type="radio" class="radio" id="${uuid}" value="${alpha2Code}" name="category">
    <label class="label-text" for="${uuid}">${country}</label>
    `;
      options_country.appendChild(div);

    //add selected country to selected box
    div.addEventListener('click', e => {
    options_cont.innerHTML = "";
        const { target: target } = e;
      // console.log(target);
      let input = target.querySelector("input"),
          label = target.querySelector("label");

    if(target.classList.contains('option')){
        // console.log(`label.innerText  = ${label.innerText} and
        //   alpha2Code: ${input.value}`);

          selected_country.innerText = label.innerText;
          execution(input.value);
        }

      options_country.classList.remove('active');
    })
  })

}

//creating error message
const creatingErrorDiv = message => {
  const error = document.createElement('div');
  error.className = 'error';
  error.innerHTML = `
  <div class="error-intro">
  <h3 class="error-heading">Error</h3></div>
  <p class="message" id="message">${message}</p>
  `;
  container.insertBefore(error, form);
  //vanish in 1.5sec
  setTimeout(() => {
      document.querySelector('.error').remove()
    },
    1000);
}

// These functions will be executed on the festival that is selected by the user*********************************
 const printName = (arr, option) => {
  let holidaysArr = arr;
  // console.log(option);
  let selectedHoliday = option;
    if(holidaysArr !== undefined && selectedHoliday !== undefined){
      let selectedHolidayText = selectedHoliday.firstElementChild.innerText;
      // console.log(holidaysArr);
      holidaysArr.forEach(holiday => {
        if(holiday.name === selectedHolidayText){
          //print Name
          festival.innerText = holiday.name;

          //print Date
          date_info.innerText = holiday.date.datetime.day + '/';
          month_info.innerText = holiday.date.datetime.month + '/';
          year_info.innerText = holiday.date.datetime.year;
          format.innerText = 'dd/mm/yyyy';

          //print day for the holiday
          printDay(holiday.date.datetime.day, holiday.date.datetime.month, holiday.date.datetime.year);
        }

      })

    }
}

const printDayOnDom = dayName => {
  day_info.innerText = dayName;
}

const printDay = (day, month, year) => {
  let yearHoliday = year;
  let monthHoliday = month - 1;
  let dateHoliday = day;

  const holidayDate = new Date(yearHoliday, monthHoliday, dateHoliday);
  let dayNumber = holidayDate.getDay();

  switch (dayNumber) {
    case 0: {
      printDayOnDom('Sunday');
      break;
    }
    case 0: {
      printDayOnDom('Sunday');
      break;
    }
    case 1: {
      printDayOnDom('Monday');
      break;
    }
    case 2: {
      printDayOnDom('Tuesday');
      break;
    }
    case 3: {
      printDayOnDom('Wednesday');
      break;
    }
    case 4: {
      printDayOnDom('Thursday');
      break;
    }
    case 5: {
      printDayOnDom('Friday');
      break;
    }
    case 6: {
      printDayOnDom('Saturday');
      break;
    }
  }

  calculateDateDifference(holidayDate);
}

const calculateDateDifference = date => {
  let diffInMilliSec, diffInSec, diffInMin, diffInHours, diffInDays;

  let fullDate = new Date();

  if (date > fullDate) {
    diffInMilliSec = date - fullDate;

    diffInSec = parseInt(diffInMilliSec / 1000);

    diffInMin = parseInt(diffInSec / 60);

    diffInHours = parseInt(diffInMin / 60);

    numTimes = parseInt(diffInHours % 24);

    diffInDaysLess = parseInt(diffInHours / 24);

    diffInDays = diffInDaysLess + 1;

    diffInWeeks = ((diffInDaysLess / 7).toFixed(1));

  } else {
    diffInSec = 0;
    diffInMin = 0;
    diffInHours = 0;
    diffInDays = 0;
    diffInWeeks = 0;
  }
  printCountdown(diffInWeeks, diffInDays, diffInHours, diffInMin);
}

const printCountdown = (wks, dys, hr, min) => {
  weeks.innerText = wks;
  days.innerText = dys;
  hours.innerText = hr;
  minute.innerText = min;
}


//Execution Steps
//1. allow the user to open countries options
showOptions();

//2. Give user all the option and one can be selected among them
apiCountryCall();

//3. get date value and id value and pass it to the apiHolidayCall(id, year)
const execution = id => {
  let yearsVal = 0;
  //for every keyup in years input add value to yearsVal
  yearsInt.addEventListener('keyup', e => {
  if(yearsVal !== undefined){
    yearsVal += e.target.value;
    apiHolidayCall(id, yearsVal);
  }else{
    creatingErrorDiv('Please enter the year.');
    }
  })
}

// //this function will run all the printing function which are commented right now
// form.addEventListener('submit', e => {
//   e.preventDefault();
//
//   //run execution function only when country and year is provided
//
// })


// this function is just it give an
reload.addEventListener('click', () => {
  location.reload();
})
