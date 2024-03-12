const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching coordinates. Response: ${body}`
      callback(Error(msg), null)
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
  request("https://iss-flyover.herokuapp.com/json/?lat=49.27670&lon=-123.13000", (err, res, body) => {
    if (err) {
      const errMsg = `There was an error: ${err}`;
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200)
      if (res.statusCode !== 200) {
        const msg = `Status code ${res.statusCode} when fetching fly over times. Response: ${body}`;
        callback(Error(msg), null);
        return
      }
      
    const parsedBody = JSON.parse(body);
    if (!parsedBody) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for coordinates: ${parsedBody.latitude} and ${parsedBody.longitude}.`;
      callback(Error(message), null);
      return;
    }

    const times = parsedBody.response;
    callback(null, times)
    });
};

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


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };