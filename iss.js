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

module.exports = { fetchMyIP };