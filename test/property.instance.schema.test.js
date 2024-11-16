import { expect } from "chai";
import { CompiledPropertyInstanceSchema } from "../schemas/property.instance.schema.js";

describe("Property Instance Schema Validation", function () {

  it("should validate when 'value' is a boolean", function () {
    const validPropertyInstance = {
      value: true,
    };

    const isValid = CompiledPropertyInstanceSchema(validPropertyInstance);
    expect(isValid).to.be.true;
    expect(CompiledPropertyInstanceSchema.errors).to.be.null;
  });

  it("should validate when 'value' is an integer within range", function () {
    const validPropertyInstance = {
      value: 50, // Assuming 50 is within the defined range
    };

    const isValid = CompiledPropertyInstanceSchema(validPropertyInstance);
    expect(isValid).to.be.true;
    expect(CompiledPropertyInstanceSchema.errors).to.be.null;
  });

  it("should validate when 'value' is a string", function () {
    const validPropertyInstance = {
      value: "Test String",
    };

    const isValid = CompiledPropertyInstanceSchema(validPropertyInstance);
    expect(isValid).to.be.true;
    expect(CompiledPropertyInstanceSchema.errors).to.be.null;
  });

  it("should invalidate when 'value' is missing", function () {
    const invalidPropertyInstance = {
      // Missing 'value'
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;
    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for missing 'value':", CompiledPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when 'value' is an integer outside the range", function () {
    const invalidPropertyInstance = {
      value: 9999, // Assuming 9999 is out of range
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;
    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for out-of-range 'value':", CompiledPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when 'value' is of an invalid type", function () {
    const invalidPropertyInstance = {
      value: { key: "value" }, // Invalid type (object)
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;
    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for invalid type 'value':", CompiledPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidPropertyInstance = {
      value: true,
      extraProperty: "Not allowed", // Additional property
    };

    const isValid = CompiledPropertyInstanceSchema(invalidPropertyInstance);
    expect(isValid).to.be.false;
    if (CompiledPropertyInstanceSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledPropertyInstanceSchema.errors);
    }
  });

});
