const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    return console.log('It didn\'t work!', err);
  }
  // success, print out the deets!
  printPassTimes(passTimes)
})


// fetchMyIP()
//   .then(data => {
//     const ip = data;
//     fetchCoordsByIP(ip, (err, coordinates) => {
//       if (err) {
//         console.log("It didn't work!", err);
//         return;
//       }

//       console.log('It worked! Returned coordinates:', coordinates, 'for ip address:', ip)
//     })
//   })
//   .catch(error => {
//   console.log(`Oops! There was an error -> [ ${error} ]`)
// })
