import { expect } from "chai";
import { CompiledVisualizationIndexSchema } from "../src/visualization.index.schema.js"; // Adjust the path as needed

// Test suite for VisualizationIndexSchema
describe("VisualizationIndexSchema Validation", function () {
  // Ensure visualizationStart and visualizationEnd are defined in IndexRangeRegistry for these tests
  const visualizationStart = 0;  // Replace with actual start from your registry if available
  const visualizationEnd = 39;   // Replace with actual end from your registry if available

  it("should validate an index within the valid range", function () {
    const validVisualization = {
      value: visualizationStart,
    };

    const isValid = CompiledVisualizationIndexSchema(validVisualization);
    expect(isValid).to.be.true;
    expect(CompiledVisualizationIndexSchema.errors).to.be.null;
  });

  it("should validate an index at the upper boundary of the range", function () {
    const validVisualization = {
      value: visualizationEnd,
    };

    const isValid = CompiledVisualizationIndexSchema(validVisualization);
    expect(isValid).to.be.true;
    expect(CompiledVisualizationIndexSchema.errors).to.be.null;
  });

  it("should invalidate an index below the minimum boundary", function () {
    const invalidVisualization = {
      value: visualizationStart - 1,
    };

    const isValid = CompiledVisualizationIndexSchema(invalidVisualization);
    expect(isValid).to.be.false;
    expect(CompiledVisualizationIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for index below minimum:", CompiledVisualizationIndexSchema.errors);
  });

  it("should invalidate an index above the maximum boundary", function () {
    const invalidVisualization = {
      value: visualizationEnd + 1,
    };

    const isValid = CompiledVisualizationIndexSchema(invalidVisualization);
    expect(isValid).to.be.false;
    expect(CompiledVisualizationIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for index above maximum:", CompiledVisualizationIndexSchema.errors);
  });

  it("should invalidate a missing 'index' property", function () {
    const invalidVisualization = {};

    const isValid = CompiledVisualizationIndexSchema(invalidVisualization);
    expect(isValid).to.be.false;
    expect(CompiledVisualizationIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for missing 'index' property:", CompiledVisualizationIndexSchema.errors);
  });

  it("should invalidate additional properties in the object", function () {
    const invalidVisualization = {
      value: visualizationStart,
      extraProperty: "not allowed",
    };

    const isValid = CompiledVisualizationIndexSchema(invalidVisualization);
    expect(isValid).to.be.false;
    expect(CompiledVisualizationIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for additional properties:", CompiledVisualizationIndexSchema.errors);
  });

  it("should invalidate an index that is not an integer", function () {
    const invalidVisualization = {
      value: "not an integer",
    };

    const isValid = CompiledVisualizationIndexSchema(invalidVisualization);
    expect(isValid).to.be.false;
    expect(CompiledVisualizationIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for non-integer value:", CompiledVisualizationIndexSchema.errors);
  });
});