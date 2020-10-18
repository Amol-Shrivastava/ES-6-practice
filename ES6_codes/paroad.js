// //Park class
//
// class Park{
//
//   constructor("name","buildYear"){
//     this.name = name;
//     this.buildYear = buildYear;
//   }
//
//   treedensity: ((trees, area) => {
//     let density = trees / area;
//     console.log(`this.name has a tree density of ${density} trees per sq area.`)
//   })
//
//  calcAge: (age1, age2, age3, number) => {
//    let avgAge = (age1 + age2 + age3) / number;
//    console.log(`Our ${number} parks have an average age of ${avgAge} years.`);
//  }
//
//  moreTree: (trees1, trees2, trees3) => {
//    if(trees1 > 1000){
//      console.log(`this.name has more number than 1000 tree`);
//    }else if(trees2 > 1000){
//      console.log(`this.name has more number than 1000 tree`);
//    }else if (trees2 > 1000) {
//      console.log(`this.name has more number than 1000 tree`);
//    }
//  }
//
// };

//Solution
class Element {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends Element {
  constructor(name, buildYear, area, numTrees) {
    super(name, buildYear);
    this.area = area; //km2
    this.numTrees = numTrees;
  }

  treeDensity() {
    const density = this.numTrees / this.area;
    console.log(`${this.name} has a tree density of ${density} trees
        per square km.`);
  }

}


class Street extends Element {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    //default parameter
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');

    console.log(`${this.name}, build in ${this.buildYear}, is a
        ${classification.get(this.size)} street.`);
  }

}


const allParks = [new Park('Green Park', 1987, 1.1, 215),
  new Park('National Park', 1894, 2.9, 3541),
  new Park('Oak Park', 1963, 0.4, 365)
]



const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
  new Street('Evergreen Street', 2004, 3.1, 5),
  new Street('KingsWay', 1995, 1.5) //default Parameter
]


function calc(arr) {

  const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

  //destructing will be used

  return [sum, sum / arr.length];

}


function reportParks(p) {
  console.log('-------PARKS REPORT -------');

  //Density
  p.forEach(curr => curr.treeDensity());

  //Average Age

  //what to pass
  const ages = p.map(el => new Date().getFullYear() - el.buildYear);
  const [totalAge, avgAge] = calc(ages);

  console.log(`Our ${p.length} parks have an average
       of ${avgAge} years.`);


  //More than 1000 trees
  //a. first get an array containing number of trees

  const i = p.map(el => el.numTrees);

  //b. findIndex of element with more than 1000 number of trees

  const r = i.findIndex(el => el >= 1000);

  console.log(`${p[r].name} has more than 1000 number of trees.`);

}

function reportStreets(s) {
  console.log('-------STREETS REPORT -------');

  //total and average length of town's streets
  const [totallength, avgLength] = calc(s.map(el => el.length));

  console.log(`Our ${s.length} streets have a total length of ${totallength} km, with an
    average of ${avgLength} km.`);

    //classify sizes
    s.forEach(el => el.classifyStreet());

}


reportParks(allParks);
reportStreets(allStreets);
