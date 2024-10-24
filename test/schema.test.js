import { expect } from 'chai';
import Ajv from "ajv";
import schema from '../src/schema.json' assert { type: 'json' };
import data from '../src/data.json' assert { type: 'json' };

const ajv = new Ajv({
  strict: true,
  strictTypes: false,
  allowUnionTypes: true,
  keywords: ['version']
});

describe('Schema Validation', () => {
  let validate;

  before(() => {
    validate = ajv.compile(schema);
  });

  it('should validate correct data', () => {
    const valid = validate(data);
    if (!valid) {
      console.log('Validation errors:', validate.errors);
    }
    expect(valid).to.be.true;
  });

  it('should fail validation for invalid appearance index', () => {
    const invalidData = JSON.parse(JSON.stringify(data));
    invalidData.appearances[0].index = 40; // Invalid index (should be between 0 and 39)

    const valid = validate(invalidData);
    expect(valid).to.be.false;
    expect(validate.errors).to.not.be.empty;
    expect(validate.errors[0].instancePath).to.equal('/appearances/0/index');
    expect(validate.errors[0].message).to.include('must be <= 39');
  });

  // Add more tests for other entities and index ranges
});