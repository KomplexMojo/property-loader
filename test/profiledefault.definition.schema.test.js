import { expect } from "chai";
import { CompiledDefaultProfileSchema } from "../src/profiledefault.definition.schema.js";

describe("Profile Default Definition Schema Validation", function () {
  
  it("should validate a correct Profile Default object with integer value", function () {
    const validProfileDefault = {
      index: 1,
      name: "ProfileDefault1",
      value: 42,
    };

    const isValid = CompiledDefaultProfileSchema(validProfileDefault);
    expect(isValid).to.be.true;
    expect(CompiledDefaultProfileSchema.errors).to.be.null;
  });

  it("should validate a correct Profile Default object with boolean value", function () {
    const validProfileDefault = {
      index: 2,
      name: "ProfileDefault2",
      value: true,
    };

    const isValid = CompiledDefaultProfileSchema(validProfileDefault);
    expect(isValid).to.be.true;
    expect(CompiledDefaultProfileSchema.errors).to.be.null;
  });

  it("should invalidate when index is out of range", function () {
    const invalidProfileDefault = {
      index: 256 + 1, // Out of range
      name: "ProfileDefault3",
      value: 100,
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfileDefault);
    expect(isValid).to.be.false;
    if (CompiledDefaultProfileSchema.errors) {
      console.error("Validation errors for out-of-range index:", CompiledDefaultProfileSchema.errors);
    }
  });

  it("should invalidate when the name exceeds the maximum length", function () {
    const invalidProfileDefault = {
      index: 1,
      name: "A".repeat(65), // Exceeds 64 character max length
      value: 100,
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfileDefault);
    expect(isValid).to.be.false;
    if (CompiledDefaultProfileSchema.errors) {
      console.error("Validation errors for long name:", CompiledDefaultProfileSchema.errors);
    }
  });

  it("should invalidate when the value is out of the valid integer range", function () {
    const invalidProfileDefault = {
      index: 1,
      name: "ProfileDefault4",
      value: 300, // Exceeds maximum of 255
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfileDefault);
    expect(isValid).to.be.false;
    if (CompiledDefaultProfileSchema.errors) {
      console.error("Validation errors for value out of range:", CompiledDefaultProfileSchema.errors);
    }
  });

  it("should invalidate when the value type is incorrect", function () {
    const invalidProfileDefault = {
      index: 1,
      name: "ProfileDefault5",
      value: "invalid", // Invalid type
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfileDefault);
    expect(isValid).to.be.false;
    if (CompiledDefaultProfileSchema.errors) {
      console.error("Validation errors for incorrect value type:", CompiledDefaultProfileSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidProfileDefault = {
      index: 1,
      // Missing 'name' and 'value'
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfileDefault);
    expect(isValid).to.be.false;
    if (CompiledDefaultProfileSchema.errors) {
      console.error("Validation errors for missing required properties:", CompiledDefaultProfileSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidProfileDefault = {
      index: 1,
      name: "ProfileDefault6",
      value: true,
      extraProperty: "Not allowed", // Additional property not allowed
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfileDefault);
    expect(isValid).to.be.false;
    if (CompiledDefaultProfileSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledDefaultProfileSchema.errors);
    }
  });
});