import Ajv from 'ajv';
import { strict as assert } from 'node:assert';
import { definedGameSchema, generatedStaticGameData, generateAppearance, generateCharacteristic, generateEvent, generateTrigger } from './utils/createTestEnvironment.js';

describe('Dungeon Crawler Schema Validation Edge Cases', () => {
    let ajv;
    let validate;

    before(() => {
        ajv = new Ajv({
            code: { esm: true },
            strict: true,
            allErrors: true,
            allowUnionTypes: true,
            verbose: true
        });
        validate = ajv.compile(definedGameSchema);
    });

    it('Should fail validation if required properties are missing', function () {
        const invalidData = { ...generatedStaticGameData, appearances: [{}] }; // Missing required properties
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with missing required properties');
    });

    it('Should fail if properties have invalid data types', function () {
        const invalidData = {
            ...generatedStaticGameData,
            appearances: [{ ...generateAppearance(), index: "forty" }], // Invalid type for `index`
        };
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with invalid data types');
    });

    it('Should validate data with boundary values for index', function () {
        const boundaryData = {
            ...generatedStaticGameData,
            appearances: [{ ...generateAppearance(), index: 39 }],
            characteristics: [{ ...generateCharacteristic(), index: 41 }],
        };
        const isValid = validate(boundaryData);

        if (!isValid) {
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

        assert.strictEqual(isValid, true, 'Validation failed with boundary values for index');
    });
    it('Should fail if unexpected properties are included', function () {
        const invalidData = {
            ...generatedStaticGameData,
            appearances: [{ ...generateAppearance(), extraField: 'unexpected' }], // Extra field
        };
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with unexpected properties');
    });
    it('Should pass if arrays are empty where allowed', function () {
        const emptyArrayData = {
            ...generatedStaticGameData,
            appearances: [{ ...generateAppearance(), properties: [] }], // Empty `properties` array
        };
        const isValid = validate(emptyArrayData);
        assert.strictEqual(isValid, true, 'Validation failed with empty arrays where allowed');
    });

    it('Should validate consistent references within composite objects', function () {
        const consistentData = {
            ...generatedStaticGameData,
            events: [{ ...generateEvent(), triggers: [{ index: 190, propertyIndex: 0, value: 0 }] }],
            triggers: [{ ...generateTrigger(), index: 190 }],
        };
        const isValid = validate(consistentData);

        assert.strictEqual(isValid, true, 'Validation failed with consistent references');
    });

    it('Should handle special characters in text fields', function () {
        const specialCharData = {
            ...generatedStaticGameData,
            appearances: [{ ...generateAppearance(), name: '✨Special✨' }],
        };
        const isValid = validate(specialCharData);
        assert.strictEqual(isValid, true, 'Validation failed with special characters in text fields');
    });

    it('Should validate nested arrays within allowed limits', function () {
        const nestedArrayData = {
            ...generatedStaticGameData,
            appearances: [
                { ...generateAppearance(), properties: [{ value: 1, name: 'Prop1', description: 'Test' }] },
            ],
        };
        const isValid = validate(nestedArrayData);
        assert.strictEqual(isValid, true, 'Validation failed with nested arrays within allowed limits');
    });

    it('Should validate compliance with required default values', function () {
        const defaultComplianceData = {
            ...generatedStaticGameData,
            appearances: [{ ...generateAppearance(), defaults: { required: true, growth: 'fixed' } }],
        };
        const isValid = validate(defaultComplianceData);
        assert.strictEqual(isValid, true, 'Validation failed with compliant default values');
    });

    it('Should not allow null values for optional fields', function () {
        const nullOptionalData = {
            ...generatedStaticGameData,
            appearances: [{ ...generateAppearance(), description: null }], // Optional field as null
        };
        const isValid = validate(nullOptionalData);
        assert.strictEqual(isValid, false, 'Validation passed with null values for optional fields');
    });
});