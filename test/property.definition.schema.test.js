import { expect } from "chai";
import { CompiledPropertyDefinitionSchema } from "../src/property.definition.schema.js";
import IndexRangeRegistry from "../src/indexregistry.js";

const { start: namePropertyStart, end: namePropertyEnd } = IndexRangeRegistry.namePropertyRange;
const { start: descriptionPropertyStart, end: descriptionPropertyEnd } = IndexRangeRegistry.descriptionPropertyRange;

const maxNameLength = namePropertyEnd + 1 - namePropertyStart;
const maxDescriptionLength = descriptionPropertyEnd + 1 - descriptionPropertyStart;

describe("Property Definition Schema Validation", function () {
  
  it("should validate a correct Property Definition object", function () {
    const validPropertyDefinition = {
      index: 100,
      name: "Valid Property Name",
      value: 10,
      description: "This is a valid description for the property."
    };

    const isValid = CompiledPropertyDefinitionSchema(validPropertyDefinition);
    expect(isValid).to.be.true;
    expect(CompiledPropertyDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidPropertyDefinition = {
      index: 300, // Out of valid uint8 range
      name: "Valid Name",
      value: 10,
      description: "Valid description."
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidPropertyDefinition);
    expect(isValid).to.be.false;

    if (CompiledPropertyDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range 'index':", CompiledPropertyDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'name' exceeds maximum length", function () {
    const invalidPropertyDefinition = {
      index: 100,
      name: "A".repeat(maxNameLength + 1), // Exceeds max name length
      value: 10,
      description: "Valid description."
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidPropertyDefinition);
    expect(isValid).to.be.false;

    if (CompiledPropertyDefinitionSchema.errors) {
      console.error("Validation errors for long 'name':", CompiledPropertyDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'description' exceeds maximum length", function () {
    const invalidPropertyDefinition = {
      index: 100,
      name: "Valid Name",
      value: 10,
      description: "D".repeat(maxDescriptionLength + 1) // Exceeds max description length
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidPropertyDefinition);
    expect(isValid).to.be.false;

    if (CompiledPropertyDefinitionSchema.errors) {
      console.error("Validation errors for long 'description':", CompiledPropertyDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'value' is not an integer", function () {
    const invalidPropertyDefinition = {
      index: 100,
      name: "Valid Name",
      value: "not an integer", // Invalid type
      description: "Valid description."
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidPropertyDefinition);
    expect(isValid).to.be.false;

    if (CompiledPropertyDefinitionSchema.errors) {
      console.error("Validation errors for non-integer 'value':", CompiledPropertyDefinitionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidPropertyDefinition = {
      index: 100,
      name: "Valid Name",
      value: 10
      // Missing 'description'
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidPropertyDefinition);
    expect(isValid).to.be.false;

    if (CompiledPropertyDefinitionSchema.errors) {
      console.error("Validation errors for missing 'description':", CompiledPropertyDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidPropertyDefinition = {
      index: 100,
      name: "Valid Name",
      value: 10,
      description: "Valid description.",
      extraProperty: "Not allowed"
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidPropertyDefinition);
    expect(isValid).to.be.false;

    if (CompiledPropertyDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledPropertyDefinitionSchema.errors);
    }
  });
});