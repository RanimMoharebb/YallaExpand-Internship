const { parseCSV } = require('./parser');

const csv = `name,age,email
John,34,john@example.com
Sara,28,sara@example.com`;

console.log('Basic parser result:');
console.log(JSON.stringify(parseCSV(csv), null, 2));
