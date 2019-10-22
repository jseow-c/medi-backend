const fs = require("fs");
const path = require("path");

// accessToken
const accessToken = process.env.access_token;
// defaultOption
const headers = { Authorization: `Bearer ${accessToken}` };

// read files
const readFile = function(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// write files
exports.writeFile = (data, filename) => {
  usersDB = data;
  const dataString = JSON.stringify(data);
  fs.writeFileSync(path.join(__dirname, "../", filename), dataString);
};

// overwrite data.json
exports.fullOverwrite = async data => {
  const dataString = JSON.stringify(data);
  await fs.writeFileSync(path.join(__dirname, "../", "data.json"), dataString);
  return;
};

// partially overwrite data.json
exports.partialOverwrite = async data => {
  const rawBuffer = await readFile("data.json");
  const originalData = JSON.parse(rawBuffer);
  const newData = { ...originalData, ...data };
  const dataString = JSON.stringify(newData);
  await fs.writeFileSync(path.join(__dirname, "../", "data.json"), dataString);
  return;
};

exports.readFile = readFile;
exports.headers = headers;
