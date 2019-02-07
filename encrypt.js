const fs = require('fs');
const path = require('path');

// generate a random sequence of non-digit characters
function dash(min, max) {
  const length = rand(min, max);
  let result = '';
  let charCode = 0;
  for (let i = 0; i < length; i++) {
    while (
      (0 <= charCode && charCode < 32) ||
      (47 < charCode && charCode < 58) ||
      126 < charCode
    ) {
      charCode = rand(30, 128);
    }
    result += String.fromCharCode(charCode);
    charCode = 0;
  }
  return result;
}

// generate a random whole number between min and max
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

if (!process.argv[2]) {
  console.log('Usage: node encrypt.js [FILE]...');
  process.exit();
}

const outfile = path.basename(process.argv[2] + '.enc');

fs.readFile(process.argv[2], 'utf8', (err, contents) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  let charCodes = [],
    mult = 0,
    encryptedResult = '';

  contents.split('').forEach(c => {
    charCodes.push(c.charCodeAt());
  });

  charCodes.map(e => {
    mult = mult > 8 ? 1 : mult + 1;
    encryptedResult += e * mult - 28 * mult + dash(3, 4);
    return;
  });

  fs.writeFile(outfile, encryptedResult, err => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(outfile + ' created.');
  });
});
