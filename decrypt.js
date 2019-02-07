var encryptor = require('file-encryptor');

var input_file = process.argv[2];
var output_file = process.argv[3];
var key = process.argv[4];

if (!input_file || !output_file || !key) {
  console.log('Usage: node decrypt.js [INPUT_FILE] [OUTPUT_FILE] [KEY]');
  process.exit(1);
}

encryptor.decryptFile(input_file, output_file, key, function(err) {
  if (err) console.error(err.message);
  else console.log(output_file + ' has been created');
});
