const { readdirSync } = require('fs');
const { resolve } = require('path');

const args = process.argv;
const regexArg = args[2];

if (!regexArg) {
  return console.error('Regular expression must be provided');
}

let regex;
try {
  regex = new RegExp(regexArg);
} catch (e) {
  return console.error('The string provided is not a valid regular expression');
}

const files = [];
function getDirectories(path) {
  readdirSync(path, { withFileTypes: true }).forEach((dir) => {
    if (dir.isDirectory()) {
      const newPath = resolve(path, dir.name);
      getDirectories(newPath);
    }
    if (dir.isFile()) {
      files.push(dir.name);
    }
  });
}

getDirectories(__dirname);
const matchingFiles = files.filter((filename) => regex.test(filename));
console.log(matchingFiles);
