# CSV-to-JSON Transformer with Validation

A plain JavaScript / Node.js CSV-to-JSON transformer built without external CSV libraries.

## Requirements

- Node.js 18+ recommended
- No npm packages are required

## Project Structure

```text
csv-to-json-transformer/
├── parser.js
├── report.js
├── app.js
├── basic-demo.js
├── edge-cases-test.js
├── cli.js
├── debounce.js
├── README.md
└── data/
    ├── sample.csv
    ├── edge-cases.csv
    ├── validation.csv
    ├── header-mismatch.csv
    ├── empty.csv
    ├── header-only.csv
    └── schema.json
```

## Phase 1: Basic Parser

`parseCSV(csvString)` converts CSV text into an array of objects. The first row is used as the object keys.

Run:

```bash
node basic-demo.js
```

## Phase 2: Quoted Fields and Edge Cases

The parser reads CSV character by character, so it supports:

- commas inside quoted fields
- escaped quotes using `""`
- empty fields
- whitespace around values
- multiple CSV rows

Run the tests:

```bash
node edge-cases-test.js
```

## Phase 3: Schema Validation

Use:

```js
const schema = {
  name: 'string',
  age: 'number',
  email: 'string',
  active: 'boolean'
};

const result = parseCSV(csvText, schema);
```

Supported types:

- `string`
- `number`
- `boolean`

The result is:

```js
{
  valid: [...],
  errors: [...],
  warnings: [...]
}
```

Values are converted when valid. For example, `"34"` becomes `34`, and `"true"` becomes `true`.

A row with a validation error is not added to `valid`; instead, the error contains the row number, field, and message.

Missing and extra columns are also reported.

Run the example:

```bash
node app.js
```

## Phase 4: Report

`printReport(result)` prints:

- total rows processed
- valid rows
- failed rows
- total errors
- every error on its own line

## CLI Stretch Goal

Run any CSV and schema file from the command line:

```bash
node cli.js data/validation.csv data/schema.json
```

## Empty CSVs

The parser safely handles both:

- a completely empty CSV file
- a CSV containing only headers

For these inputs, no data rows are processed and the parser does not crash.

## Debounce Concept

`debounce.js` contains a small debounce implementation. Debouncing delays a function until a specified amount of time has passed without another call. It is useful for search inputs, resize events, and file watchers where one user action can trigger many events.

## Tricky Edge Case

The trickiest part is a quoted field that contains both commas and escaped quotes. A simple `split(',')` cannot distinguish a comma that separates columns from a comma that belongs inside a quoted value. The parser therefore tracks whether it is currently inside quotes and treats commas as delimiters only when it is outside quotes. Two consecutive quotes inside a quoted field are converted to one literal quote.

## Closure Concept

`createCSVParser()` returns the actual parser function while keeping its `warnings` state private inside the outer function. This is a closure: the returned function can still access variables from its outer scope even after the outer function has finished. Closures are common interview topics because they are useful for private state, factories, memoization, and debounce implementations.

## Higher-Order Function Concept

`getValidator(type)` returns a validator function from `TYPE_VALIDATORS`. This demonstrates the higher-order-function idea of selecting or returning functions dynamically.

## Arrow Functions vs Regular Functions

The parser uses arrow functions for small helpers such as `isQuoteChar`, `isDelimiter`, and the type validators. Arrow functions do not have their own `this`, while regular functions have their own `this` depending on how they are called. That difference becomes especially important in object methods and classes.
