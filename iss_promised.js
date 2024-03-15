const request = require('request-promise-native');

const fetchMyIP = () => {
  return new Promise((resolve, reject) => {
    request("https://api.ipify.org?format=json", (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      if (res.statusCode !== 200) {
        reject(err);
        return;
      }

      const data = JSON.parse(body);
      resolve(data.ip);
    });
  });
};

const fetchCoordsByIP = (ip) => {
  return new Promise((resolve, reject) => {
    request(`http://ipwho.is/${ip}`, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
  
      const parsedBody = JSON.parse(body);
  
      if (!parsedBody.success) {
        reject(err);
        return;
      }

      const {latitude, longitude} = parsedBody;
      resolve({latitude, longitude});
    });
  })
};

const fetchISSFlyOverTimes = (coords) => {
  return new Promise((resolve, reject) => {
    request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
  
      if (res.statusCode !== 200) {
        reject(err);
        return;
      }
  
      const times = JSON.parse(body).response;
      resolve(times)
    });
  })
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => data)
    .catch(err => err)
};

module.exports = { nextISSTimesForMyLocation }