const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log("It worked! Returned IP: ", ip);
});



fetchCoordsByIP('162.245.144.188', (err, coordinates) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }

  console.log('It worked! Returned coordinates:', coordinates);
});

const exampleCoords = { latitude: "49.27670", longitude: "-123.13000" };

fetchISSFlyOverTimes(exampleCoords, (err, passTimes) => {
  if (err) {
    console.log('It didn\'t work!', err);
    return;
  }
  console.log('It worked! Returned flyover times:', passTimes);
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
