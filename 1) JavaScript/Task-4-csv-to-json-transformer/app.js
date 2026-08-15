const fs = require('node:fs');
const path = require('node:path');
const { parseCSV } = require('./parser');
const { printReport } = require('./report');

const csvPath = path.join(__dirname, 'data', 'validation.csv');
const schemaPath = path.join(__dirname, 'data', 'schema.json');

const csvText = fs.readFileSync(csvPath, 'utf8');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const result = parseCSV(csvText, schema);

console.log('Valid data:');
console.log(JSON.stringify(result.valid, null, 2));
printReport(result);
