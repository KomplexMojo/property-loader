import { expect } from "chai";
import {  CompiledConditionInstanceSchema } from "../schemas/condition.instance.schema.js";

describe("Condition Instance Schema Validation", function () {
  
  it("should validate a correct Condition Instance object", function () {
    const validConditionInstance = {
      index: { value: 224 }, // Assuming this is within the condition index range
      subindex: { value: 10 }, // Within the property value range
      value: { value: 20 } // Within the property value range
    };

    const isValid = CompiledConditionInstanceSchema(validConditionInstance);
    expect(isValid).to.be.true;
    expect(CompiledConditionInstanceSchema.errors).to.be.null;
  });

  it("should invalidate when the index is out of the valid range", function () {
    const invalidConditionInstance = {
      index: { value: 300 }, // Out of range for condition index
      subindex: { value: 10 },
      value: { value: 20 }
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for out-of-range index:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when primary is missing", function () {
    const invalidConditionInstance = {
      index: { value: 224 },
      // Missing primary
      value: { value: 20 }
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for missing primary property:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when primary value is out of range", function () {
    const invalidConditionInstance = {
      index: { value: 224 },
      subindex: { value: 300 }, // Out of range for property value
      value: { value: 20 }
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for out-of-range primary value:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when secondary value is out of range", function () {
    const invalidConditionInstance = {
      index: { value: 224 },
      subindex: { value: 10 },
      value: { value: 300 } // Out of range for property value
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for out-of-range secondary value:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidConditionInstance = {
      index: { value: 224 },
      subindex: { value: 10 },
      value: { value: 20 },
      extraProperty: "not allowed" // Additional property not allowed
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledConditionInstanceSchema.errors);
    }
  });
});