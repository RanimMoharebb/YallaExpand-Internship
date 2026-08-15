const TYPE_VALIDATORS = {
  string: (value) => ({ value, valid: true }),
  number: (value) => {
    if (value.trim() === '') {
      return { valid: false, message: `Expected number, got ""` };
    }

    const converted = Number(value);
    if (!Number.isFinite(converted)) {
      return { valid: false, message: `Expected number, got "${value}"` };
    }

    return { value: converted, valid: true };
  },
  boolean: (value) => {
    const normalized = value.trim().toLowerCase();

    if (normalized === 'true') return { value: true, valid: true };
    if (normalized === 'false') return { value: false, valid: true };

    return { valid: false, message: `Expected boolean, got "${value}"` };
  },
};

/**
 * Creates a CSV parser and keeps parsing state private through a closure.
 * The returned function parses CSV text with an optional schema.
 */
function createCSVParser() {
  let warnings = [];

  const isQuoteChar = (char) => char === '"';
  const isDelimiter = (char) => char === ',';

  function parseRow(rowText) {
    const fields = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < rowText.length; i += 1) {
      const char = rowText[i];

      if (isQuoteChar(char)) {
        if (inQuotes && isQuoteChar(rowText[i + 1])) {
          currentField += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (isDelimiter(char) && !inQuotes) {
        fields.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }

    if (inQuotes) {
      warnings.push('Unclosed quoted field detected.');
    }

    fields.push(currentField.trim());
    return fields;
  }

  function parseCSVRows(csvString) {
    if (typeof csvString !== 'string' || csvString.trim() === '') {
      return [];
    }

    const rows = [];
    let currentRow = '';
    let inQuotes = false;

    for (let i = 0; i < csvString.length; i += 1) {
      const char = csvString[i];

      if (isQuoteChar(char)) {
        if (inQuotes && isQuoteChar(csvString[i + 1])) {
          currentRow += '""';
          i += 1;
        } else {
          inQuotes = !inQuotes;
          currentRow += char;
        }
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && csvString[i + 1] === '\n') {
          i += 1;
        }

        if (currentRow.trim() !== '') {
          rows.push(currentRow);
        }
        currentRow = '';
      } else {
        currentRow += char;
      }
    }

    if (currentRow.trim() !== '') {
      rows.push(currentRow);
    }

    return rows;
  }

  function getValidator(type) {
    return TYPE_VALIDATORS[type];
  }

  function validateAndConvertRow(values, headers, schema, rowNumber) {
    const errors = [];
    const schemaFields = Object.keys(schema);

    if (values.length < headers.length) {
      errors.push({
        row: rowNumber,
        field: '_columns',
        message: `Missing column(s): ${headers.slice(values.length).join(', ')}`,
      });
    }

    if (values.length > headers.length) {
      errors.push({
        row: rowNumber,
        field: '_columns',
        message: `Extra column(s): ${values.slice(headers.length).join(', ')}`,
      });
    }

    for (const field of schemaFields) {
      if (!headers.includes(field)) {
        errors.push({
          row: rowNumber,
          field,
          message: `Missing column "${field}" in CSV header`,
        });
      }
    }

    for (const header of headers) {
      if (!schemaFields.includes(header)) {
        errors.push({
          row: rowNumber,
          field: header,
          message: `Extra column "${header}" is not defined in the schema`,
        });
      }
    }

    if (errors.length > 0) {
      return { row: null, errors };
    }

    const result = {};
    let hasFieldError = false;

    headers.forEach((header, index) => {
      const rawValue = values[index];
      const expectedType = schema[header];
      const validator = getValidator(expectedType);

      if (!validator) {
        errors.push({
          row: rowNumber,
          field: header,
          message: `Unsupported schema type "${expectedType}"`,
        });
        hasFieldError = true;
        return;
      }

      const validation = validator(rawValue);
      if (!validation.valid) {
        errors.push({
          row: rowNumber,
          field: header,
          message: validation.message,
        });
        hasFieldError = true;
      } else {
        result[header] = validation.value;
      }
    });

    return {
      row: hasFieldError ? null : result,
      errors,
    };
  }

  function parseCSV(csvString, schema = null) {
    warnings = [];
    const rows = parseCSVRows(csvString);

    if (rows.length === 0) {
      return schema ? { valid: [], errors: [], warnings: [] } : [];
    }

    const headers = parseRow(rows[0]);

    if (!schema) {
      return rows.slice(1).map((rowText) => {
        const values = parseRow(rowText);
        const object = {};

        headers.forEach((header, index) => {
          object[header] = values[index] ?? '';
        });

        return object;
      });
    }

    const valid = [];
    const errors = [];

    for (let index = 1; index < rows.length; index += 1) {
      const values = parseRow(rows[index]);
      const rowNumber = index + 1;
      const result = validateAndConvertRow(values, headers, schema, rowNumber);

      if (result.errors.length > 0) {
        errors.push(...result.errors);
      }

      if (result.row !== null) {
        valid.push(result.row);
      }
    }

    return { valid, errors, warnings: [...warnings] };
  }

  parseCSV.getWarnings = () => [...warnings];
  return parseCSV;
}

const parseCSV = createCSVParser();

module.exports = {
  createCSVParser,
  parseCSV,
};
