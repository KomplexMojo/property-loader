import { expect } from "chai";
import { CompiledEffectIndexSchema } from "../src/effect.index.schema.js";

describe("Effect Index Schema Validation", function () {

  it("should validate a correct Effect Index object", function () {
    const validEffectIndex = {
      value: 192 // Within the effect range specified in IndexRangeRegistry
    };

    const isValid = CompiledEffectIndexSchema(validEffectIndex);
    expect(isValid).to.be.true;
    expect(CompiledEffectIndexSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is below the minimum range", function () {
    const invalidEffectIndex = {
      value: 192 - 1 // Below effect range
    };

    const isValid = CompiledEffectIndexSchema(invalidEffectIndex);
    expect(isValid).to.be.false;
    if (CompiledEffectIndexSchema.errors) {
      console.error("Validation errors for 'index' below minimum:", CompiledEffectIndexSchema.errors);
    }
  });

  it("should invalidate when 'index' is above the maximum range", function () {
    const invalidEffectIndex = {
      value: 223 + 1 // Above effect range
    };

    const isValid = CompiledEffectIndexSchema(invalidEffectIndex);
    expect(isValid).to.be.false;
    if (CompiledEffectIndexSchema.errors) {
      console.error("Validation errors for 'index' above maximum:", CompiledEffectIndexSchema.errors);
    }
  });

  it("should invalidate when 'index' is not an integer", function () {
    const invalidEffectIndex = {
      value: "not an integer"
    };

    const isValid = CompiledEffectIndexSchema(invalidEffectIndex);
    expect(isValid).to.be.false;
    if (CompiledEffectIndexSchema.errors) {
      console.error("Validation errors for non-integer 'index':", CompiledEffectIndexSchema.errors);
    }
  });

  it("should invalidate when 'index' is missing", function () {
    const invalidEffectIndex = {};

    const isValid = CompiledEffectIndexSchema(invalidEffectIndex);
    expect(isValid).to.be.false;
    if (CompiledEffectIndexSchema.errors) {
      console.error("Validation errors for missing 'index':", CompiledEffectIndexSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidEffectIndex = {
      value: 192,
      extraProperty: "Not allowed"
    };

    const isValid = CompiledEffectIndexSchema(invalidEffectIndex);
    expect(isValid).to.be.false;
    if (CompiledEffectIndexSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledEffectIndexSchema.errors);
    }
  });
});