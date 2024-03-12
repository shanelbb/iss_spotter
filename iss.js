const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (err, res, body) => {
    if (err) return callback(err, null);

    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    const parsedBody = JSON.parse(body);
    
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const times = JSON.parse(body).response;
    callback(null, times);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
   if (err) {
     return callback(err, null)
   }

    fetchCoordsByIP(ip, (err, coordinates) => {
      if (err) {
       return callback(err, null)
      }

        fetchISSFlyOverTimes(coordinates, (err, passTimes) => {
         if (err) {
           return callback(err, null);
         }
          
          callback(null, passTimes);
        });
    });
 });
}

// const fetchMyIP = () => {
//   return new Promise((resolve, reject) => {
//     request("https://api.ipify.org?format=json", (err, res, body) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       if (res.statusCode !== 200) {
//         const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
//         reject(Error(msg));
//         return;
//       }

//       const data = JSON.parse(body).ip;
//       resolve(data);
//     });
//   });
// };


module.exports = { nextISSTimesForMyLocation };