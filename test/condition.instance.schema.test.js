import { expect } from "chai";
import {  CompiledConditionInstanceSchema } from "../src/condition.instance.schema.js";

describe("Condition Instance Schema Validation", function () {
  
  it("should validate a correct Condition Instance object", function () {
    const validConditionInstance = {
      index: { index: 224 }, // Assuming this is within the condition index range
      primary: { value: 10 }, // Within the property value range
      secondary: { value: 20 } // Within the property value range
    };

    const isValid = CompiledConditionInstanceSchema(validConditionInstance);
    expect(isValid).to.be.true;
    expect(CompiledConditionInstanceSchema.errors).to.be.null;
  });

  it("should invalidate when the index is out of the valid range", function () {
    const invalidConditionInstance = {
      index: { index: 300 }, // Out of range for condition index
      primary: { value: 10 },
      secondary: { value: 20 }
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for out-of-range index:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when primary is missing", function () {
    const invalidConditionInstance = {
      index: { index: 224 },
      // Missing primary
      secondary: { value: 20 }
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for missing primary property:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when secondary is missing", function () {
    const invalidConditionInstance = {
      index: { index: 224 },
      primary: { value: 10 },
      // Missing secondary
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for missing secondary property:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when primary value is out of range", function () {
    const invalidConditionInstance = {
      index: { index: 224 },
      primary: { value: 300 }, // Out of range for property value
      secondary: { value: 20 }
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for out-of-range primary value:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when secondary value is out of range", function () {
    const invalidConditionInstance = {
      index: { index: 224 },
      primary: { value: 10 },
      secondary: { value: 300 } // Out of range for property value
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for out-of-range secondary value:", CompiledConditionInstanceSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidConditionInstance = {
      index: { index: 224 },
      primary: { value: 10 },
      secondary: { value: 20 },
      extraProperty: "not allowed" // Additional property not allowed
    };

    const isValid = CompiledConditionInstanceSchema(invalidConditionInstance);
    expect(isValid).to.be.false;
    if (CompiledConditionInstanceSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledConditionInstanceSchema.errors);
    }
  });
});