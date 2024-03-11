const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);
// });


fetchMyIP()
  .then(data => {
    const ip = data;
    fetchCoordsByIP(ip, (err, coordinates) => {
      if (err) {
        console.log("It didn't work!", err);
        return;
      }

      console.log('It worked! Returned coordinates:', coordinates, 'for ip address:', ip)
    })
  })
  .catch(error => {
  console.log(`Oops! There was an error -> [ ${error} ]`)
})
