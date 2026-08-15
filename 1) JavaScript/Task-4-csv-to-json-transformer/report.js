function printReport(result) {
  const totalRows = result.valid.length + new Set(result.errors.map((error) => error.row)).size;
  const failedRows = new Set(result.errors.map((error) => error.row)).size;

  console.log('\n=== CSV Import Report ===');
  console.log(`Total rows processed: ${totalRows}`);
  console.log(`Valid rows: ${result.valid.length}`);
  console.log(`Failed rows: ${failedRows}`);
  console.log(`Total errors: ${result.errors.length}`);

  if (result.errors.length === 0) {
    console.log('Errors: none');
    return;
  }

  console.log('\nErrors:');
  for (const error of result.errors) {
    console.log(`Row ${error.row}: ${error.field} — ${error.message}`);
  }
}

module.exports = { printReport };
