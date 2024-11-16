import { expect } from "chai";
import { CompiledEffectPropertyInstanceSchema } from "../schemas/effect.instance.schema.js";

describe("Effect Instance Schema Validation", function () {

  it("should validate a correct Effect Instance object", function () {
    const validEffectInstance = {
      index: { value: 192 }, // Valid index within effect range
      subindex: { value: 100 },
      value: { value: 50 }
    };

    const isValid = CompiledEffectPropertyInstanceSchema(validEffectInstance);
    expect(isValid).to.be.true;
    expect(CompiledEffectPropertyInstanceSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidEffectInstance = {
      index: { value: 224 }, // Out of range for effect index
      subindex: { value: 100 },
      value: { value: 50 }
    };

    const isValid = CompiledEffectPropertyInstanceSchema(invalidEffectInstance);
    expect(isValid).to.be.false;
    if (CompiledEffectPropertyInstanceSchema.errors) {
      console.error("Validation errors for 'index' out of range:", CompiledEffectPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when 'primary' value is out of valid property range", function () {
    const invalidEffectInstance = {
      index: { value: 192 },
      subindex: { value: 300 }, // Out of range for property instance
      value: { value: 50 }
    };

    const isValid = CompiledEffectPropertyInstanceSchema(invalidEffectInstance);
    expect(isValid).to.be.false;
    if (CompiledEffectPropertyInstanceSchema.errors) {
      console.error("Validation errors for 'primary' out of range:", CompiledEffectPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when 'secondary' value is out of valid property range", function () {
    const invalidEffectInstance = {
      index: { value: 192 },
      subindex: { value: 100 },
      value: { value: 300 } // Out of range for property instance
    };

    const isValid = CompiledEffectPropertyInstanceSchema(invalidEffectInstance);
    expect(isValid).to.be.false;
    if (CompiledEffectPropertyInstanceSchema.errors) {
      console.error("Validation errors for 'secondary' out of range:", CompiledEffectPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidEffectInstance = {
      index: { value: 192 },
      // Missing 'primary' and 'secondary'
    };

    const isValid = CompiledEffectPropertyInstanceSchema(invalidEffectInstance);
    expect(isValid).to.be.false;
    if (CompiledEffectPropertyInstanceSchema.errors) {
      console.error("Validation errors for missing required properties:", CompiledEffectPropertyInstanceSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidEffectInstance = {
      index: { value: 192 },
      subindex: { value: 100 },
      value: { value: 50 },
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledEffectPropertyInstanceSchema(invalidEffectInstance);
    expect(isValid).to.be.false;
    if (CompiledEffectPropertyInstanceSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledEffectPropertyInstanceSchema.errors);
    }
  });
});