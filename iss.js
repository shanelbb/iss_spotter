const request = require("request");

const fetchMyIP = () => {
  return new Promise((resolve, reject) => {
    request("https://api.ipify.org?format=json", (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      if (res.statusCode !== 200) {
        const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
        reject(Error(msg));
        return;
      }

      const data = JSON.parse(body).ip;
      resolve(data);
    });
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
    callback(null, {latitude, longitude})
  })
}

module.exports = { fetchMyIP, fetchCoordsByIP };