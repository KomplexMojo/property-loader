import { expect} from "chai";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

// Define the VisualPixelschema
export const VisualPixelSchema = {
  type: "object",
  $id: "http://example.com/schemas/visualpixel.json",
  properties: {
    index: { type: "integer", minimum: 0, maximum: 255 }, // unique index in the uint8 range
    R: { type: "integer", minimum: 0, maximum: 255 }, // uint8 red value
    G: { type: "integer", minimum: 0, maximum: 255 }, // uint8 green value
    B: { type: "integer", minimum: 0, maximum: 255 }, // uint8 blue value
    A: { type: "integer", minimum: 1, maximum: 255 }, // uint8 alpha value, always 0
  },
  required: ["index", "R", "G", "B", "A"],
  additionalProperties: false,
};

// Compile the schema for validation
const validateVisualPixel= ajv.compile(VisualPixelSchema);

// Mocha test suite for VisualPixelschema validation
describe("VisualPixelSchema Validation", function () {
  it("should validate a correct VisualPixelobject", function () {
    const validVisualPixel= {
      index: 10,
      R: 100,
      G: 150,
      B: 200,
      A: 1,
    };

    const isValid = validateVisualPixel(validVisualPixel);
    expect(isValid).to.be.true;
    expect(validateVisualPixel.errors).to.be.null;
    if (!isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });

  it("should invalidate an incorrect VisualPixelobject with out-of-range values", function () {
    const invalidVisualPixel= {
      index: 300, // invalid index, out of range
      R: 256, // invalid R value, out of uint8 range
      G: 150,
      B: 200,
      A: 0, // invalid A value, should be 0
    };

    const isValid = validateVisualPixel(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(validateVisualPixel.errors).to.not.be.null;
    if (isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });
});