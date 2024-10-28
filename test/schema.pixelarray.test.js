import Ajv from 'ajv';
import { strict as assert } from 'node:assert';
import { definedGameSchema, generatedDynamicGameData} from './utils/createTestEnvironment.js';

describe('Dungeon Crawler Pixel Validation Tests', () => {
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

    it('Should pass with the exact required counts of each pixel type', function () {
        const validData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamicAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 156, characteristic: 20, behaviour: 20, event: 60 })
            }]
        };
        const isValid = validate(validData);
        assert.strictEqual(isValid, true, 'Validation failed with exact counts of each pixel type');
    });

    it('Should fail with too many visual pixels', function () {
        const invalidData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamicAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 157, characteristic: 20, behaviour: 20, event: 60 })
            }]
        };
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with too many visual pixels');
    });

    it('Should fail with too few visual pixels', function () {
        const invalidData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamicAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 155, characteristic: 20, behaviour: 20, event: 60 })
            }]
        };
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with too few visual pixels');
    });

    it('Should fail with too many characteristic pixels', function () {
        const invalidData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamicAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 156, characteristic: 21, behaviour: 20, event: 60 })
            }]
        };
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with too many characteristic pixels');
    });

    it('Should fail with too few characteristic pixels', function () {
        const invalidData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamciAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 156, characteristic: 19, behaviour: 20, event: 60 })
            }]
        };
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with too few characteristic pixels');
    });

    it('Should fail with duplicate pixels', function () {
        const invalidData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamicAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 156, characteristic: 20, behaviour: 20, event: 60 })
            }]
        };
        // Introduce duplicate pixel by setting two pixels to the same properties
        invalidData.appearances[0].pixels[0] = invalidData.appearances[0].pixels[1];
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with duplicate pixels');
    });

    it('Should fail if unexpected properties are included in a pixel', function () {
        const invalidData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamicAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 156, characteristic: 20, behaviour: 20, event: 60 })
            }]
        };
        // Add an extra field to a pixel
        invalidData.appearances[0].pixels[0].extraField = 'unexpected';
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with an unexpected property in a pixel');
    });

    it('Should fail with out-of-range values for pixel colors', function () {
        const invalidData = {
            ...generatedDynamicGameData,
            appearances: [{
                ...generateDynamicAppearance({ visual:156, characteristic:20, behaviour:20, event:60 }),
                pixels: generatePixelsArrayDynamic({ visual: 156, characteristic: 20, behaviour: 20, event: 60 })
            }]
        };
        // Set an out-of-range color value
        invalidData.appearances[0].pixels[0].r = 300;
        const isValid = validate(invalidData);
        assert.strictEqual(isValid, false, 'Validation passed with out-of-range color values in a pixel');
    });
});