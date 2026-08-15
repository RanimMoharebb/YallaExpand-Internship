const fs = require('node:fs');
const path = require('node:path');
const { parseCSV } = require('./parser');
const { printReport } = require('./report');

function showUsage() {
  console.log('Usage: node cli.js <csv-file> <schema-file>');
  console.log('Example: node cli.js data/validation.csv data/schema.json');
}

const [, , csvFile, schemaFile] = process.argv;

if (!csvFile || !schemaFile) {
  showUsage();
  process.exitCode = 1;
} else {
  try {
    const csvPath = path.resolve(csvFile);
    const schemaPath = path.resolve(schemaFile);

    const csvText = fs.readFileSync(csvPath, 'utf8');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const result = parseCSV(csvText, schema);

    console.log('Valid rows:');
    console.log(JSON.stringify(result.valid, null, 2));
    printReport(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}
