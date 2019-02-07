const fs = require('fs');
const path = require('path');

if (!process.argv[2] || !process.argv[3]) {
  console.log('Usage: node decrypt.js [ENCRYPTED FILE] [OUTPUT FILE]...');
  process.exit();
}

const outfile = path.basename(process.argv[3]);

fs.readFile(process.argv[2], 'utf8', (err, contents) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  let charCodes = [],
    mult = 0,
    buffer = '',
    decryptedResult = '';

  contents.split('').forEach(c => {
    if (Number.isInteger(+c)) {
      buffer += c;
    } else if (buffer != '') {
      mult = mult > 8 ? 1 : mult + 1;
      charCodes.push((+buffer + 28 * mult) / mult);
      buffer = '';
    }
  });

  charCodes.forEach(c => {
    decryptedResult += String.fromCharCode(c);
  });

  fs.writeFile(outfile, decryptedResult, err => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(outfile + ' created.');
  });
});
