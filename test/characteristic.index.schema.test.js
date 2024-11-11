import { expect } from "chai";
import { CompiledCharacteristicIndexSchema } from "../src/characteristic.index.schema.js";

describe("Characteristic Index Schema Validation", function () {
  
  it("should validate a correct characteristic index object", function () {
    const validCharacteristicIndex = {
      index: 45 // Within the valid range for characteristics
    };

    const isValid = CompiledCharacteristicIndexSchema(validCharacteristicIndex);
    expect(isValid).to.be.true;
    expect(CompiledCharacteristicIndexSchema.errors).to.be.null;
  });

  it("should invalidate when the characteristic index is below the valid range", function () {
    const invalidCharacteristicIndex = {
      index: 39 // Below the valid range start for characteristics
    };

    const isValid = CompiledCharacteristicIndexSchema(invalidCharacteristicIndex);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicIndexSchema.errors) {
      console.error("Validation errors for index below valid range:", CompiledCharacteristicIndexSchema.errors);
    }
  });

  it("should invalidate when the characteristic index is above the valid range", function () {
    const invalidCharacteristicIndex = {
      index: 90 // Above the valid range end for characteristics
    };

    const isValid = CompiledCharacteristicIndexSchema(invalidCharacteristicIndex);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicIndexSchema.errors) {
      console.error("Validation errors for index above valid range:", CompiledCharacteristicIndexSchema.errors);
    }
  });

  it("should invalidate when the index is missing", function () {
    const invalidCharacteristicIndex = {
      // Missing 'index' property
    };

    const isValid = CompiledCharacteristicIndexSchema(invalidCharacteristicIndex);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicIndexSchema.errors) {
      console.error("Validation errors for missing index property:", CompiledCharacteristicIndexSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidCharacteristicIndex = {
      index: 45,
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledCharacteristicIndexSchema(invalidCharacteristicIndex);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicIndexSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledCharacteristicIndexSchema.errors);
    }
  });
});