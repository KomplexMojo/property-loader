import { expect } from "chai";
import { CompiledEventIndexSchema } from "../src/event.index.schema.js";

describe("Event Index Schema Validation", function () {

  it("should validate a correct Event Index object", function () {
    const validEventIndex = {
      value: 140, // Valid index within event range
    };

    const isValid = CompiledEventIndexSchema(validEventIndex);
    expect(isValid).to.be.true;
    expect(CompiledEventIndexSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidEventIndex = {
      index: 160, // Out of range for event index
    };

    const isValid = CompiledEventIndexSchema(invalidEventIndex);
    expect(isValid).to.be.false;
    if (CompiledEventIndexSchema.errors) {
      console.error("Validation errors for 'index' out of range:", CompiledEventIndexSchema.errors);
    }
  });

  it("should invalidate when 'index' is below the valid range", function () {
    const invalidEventIndex = {
      index: 139, // Below the valid event range
    };

    const isValid = CompiledEventIndexSchema(invalidEventIndex);
    expect(isValid).to.be.false;
    if (CompiledEventIndexSchema.errors) {
      console.error("Validation errors for 'index' below range:", CompiledEventIndexSchema.errors);
    }
  });

  it("should invalidate when 'index' is not an integer", function () {
    const invalidEventIndex = {
      index: "140", // Index should be an integer
    };

    const isValid = CompiledEventIndexSchema(invalidEventIndex);
    expect(isValid).to.be.false;
    if (CompiledEventIndexSchema.errors) {
      console.error("Validation errors for non-integer 'index':", CompiledEventIndexSchema.errors);
    }
  });

  it("should invalidate when 'index' is missing", function () {
    const invalidEventIndex = {
      // Missing 'index'
    };

    const isValid = CompiledEventIndexSchema(invalidEventIndex);
    expect(isValid).to.be.false;
    if (CompiledEventIndexSchema.errors) {
      console.error("Validation errors for missing 'index':", CompiledEventIndexSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidEventIndex = {
      index: 140,
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledEventIndexSchema(invalidEventIndex);
    expect(isValid).to.be.false;
    if (CompiledEventIndexSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledEventIndexSchema.errors);
    }
  });
});