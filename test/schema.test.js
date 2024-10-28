import Ajv from 'ajv';
import { strict as assert } from 'node:assert';
import { definedGameSchema, generatedStaticGameData } from './utils/createTestEnvironment.js';

describe('Dungeon Crawler Schema Validation', () => {
  let ajv;

  before(() => {
    ajv = new Ajv({
      code: { esm: true },
      strict: true,
      allErrors: true,
      allowUnionTypes: true,
    });
  });

  it('Schema should compile without errors', function () {
    assert.doesNotThrow(() => {
      ajv.compile(definedGameSchema);
    }, 'Schema failed to compile');
  });
 
  it('Generated data should conform to the schema', function () {
    const validate = ajv.compile(definedGameSchema);
    const valid = validate(generatedStaticGameData);

    if (!valid) {
      console.error('\nValidation Errors Detected:');
      validate.errors.forEach((error, index) => {
        console.error(`\nError ${index + 1}:`);
        console.error(`  Instance Path: ${error.instancePath}`);
        console.error(`  Schema Path: ${error.schemaPath}`);
        console.error(`  Keyword: ${error.keyword}`);
        console.error(`  Params: ${JSON.stringify(error.params, null, 2)}`);
        console.error(`  Message: ${error.message}`);
      });
    }

    assert.strictEqual(valid, true, 'Generated data does not conform to the schema');
  });
});