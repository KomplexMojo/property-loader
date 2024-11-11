import { expect } from "chai";
import { CompiledDefinitionExtensionSchema } from "../src/definition.extension.schema.js";

describe("Definition Extension Schema Validation", function () {
  
  it("should validate a correct Definition Extension object", function () {
    const validDefinitionExtension = {
      name: "Valid Name",
      description: "A valid description that does not exceed the maximum length.",
      value: 100
    };

    const isValid = CompiledDefinitionExtensionSchema(validDefinitionExtension);
    expect(isValid).to.be.true;
    expect(CompiledDefinitionExtensionSchema.errors).to.be.null;
  });

  it("should invalidate when 'name' exceeds maximum length", function () {
    const invalidDefinitionExtension = {
      name: "A".repeat(65), // Exceeds 64 character max length
      description: "A valid description.",
      value: 100
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for 'name' exceeding max length:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when 'description' exceeds maximum length", function () {
    const invalidDefinitionExtension = {
      name: "Valid Name",
      description: "D".repeat(257), // Exceeds 256 character max length
      value: 100
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for 'description' exceeding max length:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when 'value' is out of the valid range", function () {
    const invalidDefinitionExtension = {
      name: "Valid Name",
      description: "A valid description.",
      value: 300 // Exceeds maximum of 255
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for 'value' out of range:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidDefinitionExtension = {
      name: "Valid Name",
      // Missing 'description'
      value: 100
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for missing required property:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidDefinitionExtension = {
      name: "Valid Name",
      description: "A valid description.",
      value: 100,
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when 'value' is not an integer", function () {
    const invalidDefinitionExtension = {
      name: "Valid Name",
      description: "A valid description.",
      value: "not an integer" // Invalid type
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for non-integer 'value':", CompiledDefinitionExtensionSchema.errors);
    }
  });
});