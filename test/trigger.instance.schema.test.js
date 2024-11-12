import { expect } from "chai";
import { CompiledTriggerInstance } from "../src/trigger.instance.schema.js";

describe("Trigger Instance Schema Validation", function () {
  
  it("should validate a correct Trigger Instance object", function () {
    const validTriggerInstance = {
      index: { value: 170 }, // Assuming 50 is within the valid trigger index range
      primary: { value: 1 }, // Assuming valid property instance
      secondary: { value: 2 } // Assuming valid property instance
    };

    const isValid = CompiledTriggerInstance(validTriggerInstance);
    expect(isValid).to.be.true;
    expect(CompiledTriggerInstance.errors).to.be.null;
  });

  it("should invalidate when 'index' is missing", function () {
    const invalidTriggerInstance = {
      primary: { value: 1 },
      secondary: { value: 2 }
    };

    const isValid = CompiledTriggerInstance(invalidTriggerInstance);
    expect(isValid).to.be.false;

    if (CompiledTriggerInstance.errors) {
      console.error("Validation errors for missing 'index':", CompiledTriggerInstance.errors);
    }
  });

  it("should invalidate when 'primary' is missing", function () {
    const invalidTriggerInstance = {
      index: { value: 50 },
      secondary: { value: 2 }
    };

    const isValid = CompiledTriggerInstance(invalidTriggerInstance);
    expect(isValid).to.be.false;

    if (CompiledTriggerInstance.errors) {
      console.error("Validation errors for missing 'primary':", CompiledTriggerInstance.errors);
    }
  });

  it("should invalidate when 'secondary' is missing", function () {
    const invalidTriggerInstance = {
      index: { value: 50 },
      primary: { value: 1 }
    };

    const isValid = CompiledTriggerInstance(invalidTriggerInstance);
    expect(isValid).to.be.false;

    if (CompiledTriggerInstance.errors) {
      console.error("Validation errors for missing 'secondary':", CompiledTriggerInstance.errors);
    }
  });

  it("should invalidate when 'index' is out of the valid range", function () {
    const invalidTriggerInstance = {
      index: { value: 300 }, // Out of range
      primary: { value: 1 },
      secondary: { value: 2 }
    };

    const isValid = CompiledTriggerInstance(invalidTriggerInstance);
    expect(isValid).to.be.false;

    if (CompiledTriggerInstance.errors) {
      console.error("Validation errors for 'index' out of range:", CompiledTriggerInstance.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidTriggerInstance = {
      index: { value: 50 },
      primary: { value: 1 },
      secondary: { value: 2 },
      extraProperty: "Not allowed"
    };

    const isValid = CompiledTriggerInstance(invalidTriggerInstance);
    expect(isValid).to.be.false;

    if (CompiledTriggerInstance.errors) {
      console.error("Validation errors for additional properties:", CompiledTriggerInstance.errors);
    }
  });

  it("should invalidate when 'primary' or 'secondary' properties are invalid", function () {
    const invalidTriggerInstance = {
      index: { value: 50 },
      primary: { value: -1 }, // Invalid value for property instance
      secondary: { value: 300 } // Exceeds valid property value range
    };

    const isValid = CompiledTriggerInstance(invalidTriggerInstance);
    expect(isValid).to.be.false;

    if (CompiledTriggerInstance.errors) {
      console.error("Validation errors for invalid 'primary' or 'secondary' properties:", CompiledTriggerInstance.errors);
    }
  });
});