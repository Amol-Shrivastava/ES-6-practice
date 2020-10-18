class Element {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Parks extends Element {
  constructor(name, buildYear, area, numTrees) {
    super(name, buildYear);
    this.area = area;
    this.numTrees = numTrees;
  }

  density = () => {
    const treedensity = this.numTrees / this.area;
    console.log(`${this.name} has a tree density of
        ${treedensity} trees per square km.`);
  }

}

class Streets extends Element {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classification = (s) => {
    const classify = new Map();
    classify.set(1, 'tiny');
    classify.set(2, 'small');
    classify.set(3, 'normal');
    classify.set(4, 'big');
    classify.set(5, 'huge');

    console.log(`${this.name} has a length of ${this.length}
      and it is classified as ${classify.get(s)}`);
  }
}

function calc(arr) {
  const sum = arr.reduce(((pre, cur) => pre + cur), 0);
  return [sum, sum / arr.length];
}

const allParks = [new Parks('Oaks Park', 1835, 236, 965),
  new Parks('Rose Garden', 1960, 102, 985),
  new Parks('River Valley', 2004, 115, 1151),
  new Parks('Walker Valley', 2004, 115, 1351),
  new Parks('GateWay Valley', 2004, 115, 12151),
  new Parks('Kings Valley', 2004, 115, 1141),
  new Parks('Pious Valley', 2004, 115, 21151)
];

const allStreets = [new Streets('KingsWay', 2002, 236, 4),
  new Streets('7-11', 2014, 125, 2),
  new Streets('Piers Path', 2015, 500, 4),
  new Streets('Ramous Side', 2018, 560)
];

function reportParks(arr) {
  console.log();
  console.log(`/*********************PARKS REPORT***********************/`);
  //1. Tree Density

  allParks.forEach(p => p.density());

  //2. Avg age

  const ages = allParks.map(p => (new Date().getFullYear() - p.buildYear));
  let [total, average] = calc(ages);
  console.log(`The average age of parks in this town is ${average} years.`);

  //3. Park with >= 1000 trees

 const moreThan1000 = [];

  for(var i=0 ; i<arr.length; i++){
    if(arr[i].numTrees >= 1000){
      //console.log(i);
      // console.log(arr[i]);
      moreThan1000.push(i);
    }
  }

    moreThan1000.forEach(p => console.log(`${arr[p].name} is a park with more than 1000 trees. Precisely it has ${arr[p].numTrees} trees`));
  console.log();
}



function reportStreets(arr) {
  console.log();
  console.log(`/*********************STREETS REPORT***********************/`);

  //1. Avg length of town's street
  const lengths = allStreets.map(el => el.length);
  let [total, average] = calc(lengths);

  console.log(`The average length of streets in this town is ${total} km and average length is ${average} km.`);

  //2. Size classification
  allStreets.forEach(el => el.classification(el.size));


  console.log();
}


reportParks(allParks);
reportStreets(allStreets);
