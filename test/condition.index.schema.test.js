import { expect } from "chai";
import { CompiledConditionIndexSchema } from "../src/condition.index.schema.js";
import IndexRangeRegistry from "../src/indexregistry.js";

const { start: conditionStart, end: conditionEnd } = IndexRangeRegistry.conditionRange;

describe("Condition Index Schema Validation", function () {
  
  it("should validate a correct Condition Index object", function () {
    const validConditionIndex = {
      value: conditionStart, // Valid index within the condition range
    };

    const isValid = CompiledConditionIndexSchema(validConditionIndex);
    expect(isValid).to.be.true;
    expect(CompiledConditionIndexSchema.errors).to.be.null;
  });

  it("should invalidate when the index is out of the valid range (too low)", function () {
    const invalidConditionIndex = {
      value: conditionStart - 1, // Below valid range
    };

    const isValid = CompiledConditionIndexSchema(invalidConditionIndex);
    expect(isValid).to.be.false;
    if (CompiledConditionIndexSchema.errors) {
      console.error("Validation errors for index too low:", CompiledConditionIndexSchema.errors);
    }
  });

  it("should invalidate when the index is out of the valid range (too high)", function () {
    const invalidConditionIndex = {
      value: conditionEnd + 1, // Above valid range
    };

    const isValid = CompiledConditionIndexSchema(invalidConditionIndex);
    expect(isValid).to.be.false;
    if (CompiledConditionIndexSchema.errors) {
      console.error("Validation errors for index too high:", CompiledConditionIndexSchema.errors);
    }
  });

  it("should invalidate when the index is missing", function () {
    const invalidConditionIndex = {
      // No 'index' property
    };

    const isValid = CompiledConditionIndexSchema(invalidConditionIndex);
    expect(isValid).to.be.false;
    if (CompiledConditionIndexSchema.errors) {
      console.error("Validation errors for missing value:", CompiledConditionIndexSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidConditionIndex = {
      value: conditionStart,
      extraProperty: "Not allowed", // Additional property not allowed
    };

    const isValid = CompiledConditionIndexSchema(invalidConditionIndex);
    expect(isValid).to.be.false;
    if (CompiledConditionIndexSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledConditionIndexSchema.errors);
    }
  });

  it("should invalidate when the index is not an integer", function () {
    const invalidConditionIndex = {
      value: "notAnInteger", // Invalid type
    };

    const isValid = CompiledConditionIndexSchema(invalidConditionIndex);
    expect(isValid).to.be.false;
    if (CompiledConditionIndexSchema.errors) {
      console.error("Validation errors for non-integer value:", CompiledConditionIndexSchema.errors);
    }
  });
});