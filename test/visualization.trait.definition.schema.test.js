import { expect } from "chai";
import { CompiledVisualizationTraitSchema } from "../schemas/visualization.trait.definition.schema.js";

describe("Visualization Trait Definition Schema Validation", function () {

  it("should validate a correct Visualization Trait Definition object", function () {
    const validVisualizationTrait = {
      defaults: {
        index: { value: 100 },
        subindex: { value: 100 },
        value: { value: 100 }
      },
      definition: {
        index: { value: 20 }, // Within valid range for behaviours
        extension: {
          subindex: { value: 0 },
          name: "Valid Name",
          description: "A valid description for a visualization."
        }
      },
      pixels: Array.from({ length: 256 }, (_, i) => ({
        index: i,
        IsStorage: i % 2 === 0 ? true : false,
        R: 255,
        G: 255,
        B: 255,
        A: i % 2 === 0 ? 0 : 255, // Alternate valid alpha values for visual pixels
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(validVisualizationTrait);
    expect(isValid).to.be.true;

    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for invalid DataPixel in 'pixels':", CompiledVisualizationTraitSchema.errors);
    }

    expect(CompiledVisualizationTraitSchema.errors).to.be.null;
  });

  it("should invalidate when 'pixels' contains an invalid DataPixel", function () {
    const invalidVisualizationTrait = {
      defaults: {
        index: 1,
        subindex: {
          index: 0,
          currentValue: 0,
          maxValue: 0,
        },
        value: {
          index: 2,
          currentValue: 50,
          maxValue: 100,
        },
      },
      definition: {
        name: "Visualization Name",
        description: "A valid description for visualization."
      },
      pixels: Array.from({ length: 256 }, (_, i) => ({
        index: i,
        IsStorage: false,
        R: 255,
        G: 255,
        B: 255,
        A: 0, // Invalid for VisualPixel (valid for DataPixel)
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationTrait);
    expect(isValid).to.be.false;
    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for invalid DataPixel in 'pixels':", CompiledVisualizationTraitSchema.errors);
    }
  });

  it("should invalidate when 'pixels' contains fewer than 256 items", function () {
    const invalidVisualizationTrait = {
      defaults: {
        index: 1,
        subindex: {
          index: 0,
          currentValue: 0,
          maxValue: 0,
        },
        value: {
          index: 2,
          currentValue: 50,
          maxValue: 100,
        },
      },
      definition: {
        name: "Visualization Name",
        description: "A valid description for visualization."
      },
      pixels: Array.from({ length: 255 }, (_, i) => ({
        index: i,
        IsStorage: false,
        R: 255,
        G: 255,
        B: 255,
        A: 255,
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationTrait);
    expect(isValid).to.be.false;
    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for insufficient 'pixels' length:", CompiledVisualizationTraitSchema.errors);
    }
  });

  it("should invalidate when 'pixels' contains more than 256 items", function () {
    const invalidVisualizationTrait = {
      defaults: {
        index: 1,
        subindex: {
          index: 0,
          currentValue: 0,
          maxValue: 0,
        },
        value: {
          index: 2,
          currentValue: 50,
          maxValue: 100,
        },
      },
      definition: {
        name: "Visualization Name",
        description: "A valid description for visualization."
      },
      pixels: Array.from({ length: 257 }, (_, i) => ({
        index: i,
        IsStorage: false,
        R: 255,
        G: 255,
        B: 255,
        A: 255,
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationTrait);
    expect(isValid).to.be.false;
    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for excessive 'pixels' length:", CompiledVisualizationTraitSchema.errors);
    }
  });

  it("should invalidate when a 'pixel' does not have unique 'index' values", function () {
    const invalidVisualizationTrait = {
      defaults: {
        index: 1,
        subindex: {
          index: 0,
          currentValue: 0,
          maxValue: 0,
        },
        value: {
          index: 2,
          currentValue: 50,
          maxValue: 100,
        },
      },
      definition: {
        name: "Visualization Name",
        description: "A valid description for visualization."
      },
      pixels: Array.from({ length: 256 }, (_, i) => ({
        index: i < 255 ? i : 254, // Duplicate index
        IsStorage: false,
        R: 255,
        G: 255,
        B: 255,
        A: 255,
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationTrait);
    expect(isValid).to.be.false;
    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for non-unique 'index' in 'pixels':", CompiledVisualizationTraitSchema.errors);
    }
  });

});
