//Promises Version

  // Production of Promises

    function makeRequest(location){
      return new Promise((resolve, reject) => {
        console.log(`Making Request to ${location}`);
          if(location === 'Google'){
            resolve('Google says Hi!!!!');
          }else{
            reject('We can only talk to Google.')
          }
      })
    }

    function processRequest(response){
        return new Promise((resolve, reject) => {
          console.log(`Processing response`);
          resolve(`Extra Information + ${response}`)
        })

      }

  // Consumption of Promises
// makeRequest('Facebook').then(response =>{
//   console.log(`Response Received`);
//     return processRequest(response);
// }).then(processedResponse =>{
//   console.log(processedResponse);
// }).catch(err => {
//   console.log(err);
// })

// asyncAwait is a method of consuming promises(syntactical sugar) 


//async function promise consumption
  async function consumePromise(loc){
    try{
      const acceptLoc = await makeRequest(`${loc}`);
      console.log(acceptLoc);

      const declareInfo = await processRequest(`${acceptLoc}`);
      console.log(declareInfo);
    } catch(err){
      console.log(`Error is -> ${err}`);
    }

  }

// consumePromise('Google');
consumePromise('YouTube');
