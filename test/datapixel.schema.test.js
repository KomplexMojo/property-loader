import { expect} from "chai";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

// Define the DataPixel schema
export const DataPixelSchema = {
  type: "object",
  $id: "http://example.com/schemas/datapixel.json",
  properties: {
    index: { type: "integer", minimum: 0, maximum: 255 }, // unique index in the uint8 range
    R: { type: "integer", minimum: 0, maximum: 255 }, // uint8 red value
    G: { type: "integer", minimum: 0, maximum: 255 }, // uint8 green value
    B: { type: "integer", minimum: 0, maximum: 255 }, // uint8 blue value
    A: { const: 0 }, // uint8 alpha value, always 0
  },
  required: ["index", "R", "G", "B", "A"],
  additionalProperties: false,
};

// Compile the schema for validation
const validateDataPixel = ajv.compile(DataPixelSchema);

// Mocha test suite for DataPixel schema validation
describe("DataPixel Schema Validation", function () {
  it("should validate a correct DataPixel object", function () {
    const validDataPixel = {
      index: 10,
      R: 100,
      G: 150,
      B: 200,
      A: 0,
    };

    const isValid = validateDataPixel(validDataPixel);
    expect(isValid).to.be.true;
    expect(validateDataPixel.errors).to.be.null;
    if (!isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });

  it("should invalidate an incorrect DataPixel object with out-of-range values", function () {
    const invalidDataPixel = {
      index: 300, // invalid index, out of range
      R: 256, // invalid R value, out of uint8 range
      G: 150,
      B: 200,
      A: 1, // invalid A value, should be 0
    };

    const isValid = validateDataPixel(invalidDataPixel);
    expect(isValid).to.be.false;
    expect(validateDataPixel.errors).to.not.be.null;
    if (isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });
});