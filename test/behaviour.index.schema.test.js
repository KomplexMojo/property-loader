import { expect } from "chai";
import { CompiledBehaviourIndexSchema } from "../schemas/behaviour.index.schema.js";

describe("Behaviour Index Schema Validation", function () {
  
  it("should validate a correct Behaviour Index object", function () {
    const validBehaviourIndex = {
      value: 90
    };

    const isValid = CompiledBehaviourIndexSchema(validBehaviourIndex);
    expect(isValid).to.be.true;
    expect(CompiledBehaviourIndexSchema.errors).to.be.null;
  });

  it("should invalidate when the index is below the minimum range", function () {
    const invalidBehaviourIndex = {
      value: 89 // Below the minimum of 90
    };

    const isValid = CompiledBehaviourIndexSchema(invalidBehaviourIndex);
    expect(isValid).to.be.false;
    if (CompiledBehaviourIndexSchema.errors) {
      console.error("Validation errors for index below minimum:", CompiledBehaviourIndexSchema.errors);
    }
  });

  it("should invalidate when the index is above the maximum range", function () {
    const invalidBehaviourIndex = {
      value: 140 // Above the maximum of 139
    };

    const isValid = CompiledBehaviourIndexSchema(invalidBehaviourIndex);
    expect(isValid).to.be.false;
    if (CompiledBehaviourIndexSchema.errors) {
      console.error("Validation errors for index above maximum:", CompiledBehaviourIndexSchema.errors);
    }
  });

  it("should invalidate when the index is not an integer", function () {
    const invalidBehaviourIndex = {
      value: "ninety" // Not an integer
    };

    const isValid = CompiledBehaviourIndexSchema(invalidBehaviourIndex);
    expect(isValid).to.be.false;
    if (CompiledBehaviourIndexSchema.errors) {
      console.error("Validation errors for non-integer value:", CompiledBehaviourIndexSchema.errors);
    }
  });

  it("should invalidate when required index property is missing", function () {
    const invalidBehaviourIndex = {
      // Missing 'index' property
    };

    const isValid = CompiledBehaviourIndexSchema(invalidBehaviourIndex);
    expect(isValid).to.be.false;
    if (CompiledBehaviourIndexSchema.errors) {
      console.error("Validation errors for missing index property:", CompiledBehaviourIndexSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidBehaviourIndex = {
      value: 90,
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledBehaviourIndexSchema(invalidBehaviourIndex);
    expect(isValid).to.be.false;
    if (CompiledBehaviourIndexSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledBehaviourIndexSchema.errors);
    }
  });
});