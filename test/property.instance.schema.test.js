import { expect } from "chai";
import { CompiledPropertyInstanceSchema } from "../schemas/property.instance.schema.js";
import IndexRangeRegistry from "../schemas/_indexregistry.js";

const { start: propertyValueStart, end: propertyvalueEnd } = IndexRangeRegistry.propertyValueRange;

describe("Property Instance Schema Validation", function () {
  
  it("should validate a correct Property Instance object within range", function () {
    const validPropertyInstance = {
      value: 100 // Assuming 100 is within the valid range
    };

    const isValid = CompiledPropertyInstanceSchema(validPropertyInstance);
    expect(isValid).to.be.true;
    expect(CompiledPropertyInstanceSchema.errors).to.be.null;
  });

  it("should invalidate when 'value' is below the minimum range", function () {
    const invalidPropertyInstance = {
      value: propertyValueStart - 1
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;

    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for 'value' below minimum:", CompiledPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when 'value' exceeds the maximum range", function () {
    const invalidPropertyInstance = {
      value: propertyvalueEnd + 1
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;

    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for 'value' above maximum:", CompiledPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when 'value' is not an integer", function () {
    const invalidPropertyInstance = {
      value: "not an integer"
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;

    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for non-integer 'value':", CompiledPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when 'value' property is missing", function () {
    const invalidPropertyInstance = {};

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;

    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for missing 'value' property:", CompiledPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidPropertyInstance = {
      value: 100,
      extra: "not allowed"
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;

    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledPropertyInstanceSchema.errors);
    }
  });
});