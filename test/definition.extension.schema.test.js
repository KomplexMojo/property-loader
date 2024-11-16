import { expect } from "chai";
import { CompiledDefinitionExtensionSchema } from "../schemas/definition.extension.schema.js";

describe("Definition Extension Schema Validation", function () {
  
  it("should validate a correct Definition Extension object", function () {
    const validDefinitionExtension = {
      subindex: 100,
      name: "Valid Name",
      description: "A valid description that does not exceed the maximum length."
    };

    const isValid = CompiledDefinitionExtensionSchema(validDefinitionExtension);
    expect(isValid).to.be.true;
    expect(CompiledDefinitionExtensionSchema.errors).to.be.null;
  });

  it("should invalidate when 'name' exceeds maximum length", function () {
    const invalidDefinitionExtension = {
      subindex: 100,
      name: "A".repeat(65), // Exceeds 64 character max length
      description: "A valid description.",
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for 'name' exceeding max length:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when 'description' exceeds maximum length", function () {
    const invalidDefinitionExtension = {
      subindex: 100,
      name: "Valid Name",
      description: "D".repeat(257), // Exceeds 256 character max length
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for 'description' exceeding max length:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when 'value' is out of the valid range", function () {
    const invalidDefinitionExtension = {
      subindex: 300,
      name: "Valid Name",
      description: "A valid description."
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for 'value' out of range:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidDefinitionExtension = {
      subindex: 100,
      name: "Valid Name",
      // Missing 'description'
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for missing required property:", CompiledDefinitionExtensionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidDefinitionExtension = {
      subindex: 100,
      name: "Valid Name",
      description: "A valid description.",
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
      subindex: "not an integer",
      name: "Valid Name",
      description: "A valid description.",
    };

    const isValid = CompiledDefinitionExtensionSchema(invalidDefinitionExtension);
    expect(isValid).to.be.false;
    if (CompiledDefinitionExtensionSchema.errors) {
      console.error("Validation errors for non-integer 'value':", CompiledDefinitionExtensionSchema.errors);
    }
  });
});