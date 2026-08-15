const { parseCSV } = require('./parser');

const testCases = [
  {
    name: 'Quoted field containing a comma',
    csv: 'name,age\n"Doe, John",34',
    expected: [{ name: 'Doe, John', age: '34' }],
  },
  {
    name: 'Escaped quotes inside a quoted field',
    csv: 'message\n"She said ""hello"""',
    expected: [{ message: 'She said "hello"' }],
  },
  {
    name: 'Empty field',
    csv: 'name,age,email\nJohn,,john@example.com',
    expected: [{ name: 'John', age: '', email: 'john@example.com' }],
  },
  {
    name: 'Whitespace around values',
    csv: 'name,age\n  John  , 34 ',
    expected: [{ name: 'John', age: '34' }],
  },
  {
    name: 'Comma + escaped quotes together',
    csv: 'name,note\n"Doe, John","He said ""hello, world"""',
    expected: [{ name: 'Doe, John', note: 'He said "hello, world"' }],
  },
];

let passed = 0;

for (const testCase of testCases) {
  const actual = parseCSV(testCase.csv);
  const success = JSON.stringify(actual) === JSON.stringify(testCase.expected);

  console.log(`${success ? 'PASS' : 'FAIL'}: ${testCase.name}`);

  if (!success) {
    console.log('Expected:', JSON.stringify(testCase.expected));
    console.log('Actual:  ', JSON.stringify(actual));
  } else {
    passed += 1;
  }
}

console.log(`\n${passed}/${testCases.length} edge-case tests passed.`);
