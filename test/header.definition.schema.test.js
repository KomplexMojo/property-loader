import { expect } from "chai";
import { CompiledHeaderDefinitionSchema } from "../src/header.definition.schema.js";
import IndexRangeRegistry from "../src/indexregistry.js";

const { start: namePropertyStart, end: namePropertyEnd } = IndexRangeRegistry.namePropertyRange;
const { start: descriptionPropertyStart, end: descriptionPropertyEnd } = IndexRangeRegistry.descriptionPropertyRange;

const maxNameLength = namePropertyEnd + 1 - namePropertyStart;
const maxDescriptionLength = descriptionPropertyEnd + 1 - descriptionPropertyStart;

describe("Header Definition Schema Validation", function () {

  it("should validate a correct Header Definition object", function () {
    const validHeader = {
      name: "Valid Header Name",
      description: "This is a valid description within the allowed character limit."
    };

    const isValid = CompiledHeaderDefinitionSchema(validHeader);
    expect(isValid).to.be.true;
    expect(CompiledHeaderDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when 'name' exceeds the maximum length", function () {
    const invalidHeader = {
      name: "A".repeat(maxNameLength + 1), // Exceeds maxNameLength
      description: "This is a valid description."
    };

    const isValid = CompiledHeaderDefinitionSchema(invalidHeader);
    expect(isValid).to.be.false;

    if (CompiledHeaderDefinitionSchema.errors) {
      console.error("Validation errors for long 'name':", CompiledHeaderDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'description' exceeds the maximum length", function () {
    const invalidHeader = {
      name: "Valid Name",
      description: "D".repeat(maxDescriptionLength + 1) // Exceeds maxDescriptionLength
    };

    const isValid = CompiledHeaderDefinitionSchema(invalidHeader);
    expect(isValid).to.be.false;

    if (CompiledHeaderDefinitionSchema.errors) {
      console.error("Validation errors for long 'description':", CompiledHeaderDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'name' is not a string", function () {
    const invalidHeader = {
      name: 123, // Not a string
      description: "This is a valid description."
    };

    const isValid = CompiledHeaderDefinitionSchema(invalidHeader);
    expect(isValid).to.be.false;

    if (CompiledHeaderDefinitionSchema.errors) {
      console.error("Validation errors for non-string 'name':", CompiledHeaderDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'description' is not a string", function () {
    const invalidHeader = {
      name: "Valid Name",
      description: 456 // Not a string
    };

    const isValid = CompiledHeaderDefinitionSchema(invalidHeader);
    expect(isValid).to.be.false;

    if (CompiledHeaderDefinitionSchema.errors) {
      console.error("Validation errors for non-string 'description':", CompiledHeaderDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'name' is missing", function () {
    const invalidHeader = {
      description: "This is a valid description."
    };

    const isValid = CompiledHeaderDefinitionSchema(invalidHeader);
    expect(isValid).to.be.false;

    if (CompiledHeaderDefinitionSchema.errors) {
      console.error("Validation errors for missing 'name':", CompiledHeaderDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'description' is missing", function () {
    const invalidHeader = {
      name: "Valid Name"
    };

    const isValid = CompiledHeaderDefinitionSchema(invalidHeader);
    expect(isValid).to.be.false;

    if (CompiledHeaderDefinitionSchema.errors) {
      console.error("Validation errors for missing 'description':", CompiledHeaderDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidHeader = {
      name: "Valid Name",
      description: "This is a valid description.",
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledHeaderDefinitionSchema(invalidHeader);
    expect(isValid).to.be.false;

    if (CompiledHeaderDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledHeaderDefinitionSchema.errors);
    }
  });
});