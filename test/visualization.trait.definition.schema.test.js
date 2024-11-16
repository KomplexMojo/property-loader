import { expect } from "chai";
import { CompiledVisualizationTraitSchema } from "../schemas/visualization.trait.definition.schema.js";

describe("Visualization Definition Schema Validation", function () {
  
  it("should validate a correct Visualization Definition object", function () {
    const validVisualizationDefinition = {
      definition: {
        index: { value: 3 }, // Valid index for characteristic range
        extension: {
          subindex: 100,
          name: "Valid Name",
          description: "A valid description."
        }
      },
      pixels: Array.from({ length: 256 }, (_, i) => ({
        index: i,
        R: 255,
        G: 0,
        B: 0,
        A: 0,
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(validVisualizationDefinition);
    expect(isValid).to.be.true;
    expect(CompiledVisualizationTraitSchema.errors).to.be.null;
  });

  it("should invalidate when 'extension' is missing", function () {
    const invalidVisualizationDefinition = {
      pixels: Array.from({ length: 256 }, (_, i) => ({
        index: i,
        R: 255,
        G: 0,
        B: 0,
        A: 0,
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;

    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for missing 'extension':", CompiledVisualizationTraitSchema.errors);
    }
  });

  it("should invalidate when 'pixels' is missing", function () {
    const invalidVisualizationDefinition = {
      definition: {
        index: { value: 3 }, // Valid index for characteristic range
        extension: {
          subindex: 100,
          name: "Valid Name",
          description: "A valid description."
        }
      },
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;

    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for missing 'pixels':", CompiledVisualizationTraitSchema.errors);
    }
  });

  it("should invalidate when 'pixels' does not contain exactly 256 items", function () {
    const invalidVisualizationDefinition = {
      definition: {
        index: { value: 3 }, // Valid index for characteristic range
        extension: {
          subindex: 0,
          name: "Valid Name",
          description: "A valid description."
        }
      },
      pixels: Array.from({ length: 255 }, (_, i) => ({
        index: i,
        R: 255,
        G: 0,
        B: 0,
        A: 0,
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;

    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for incorrect 'pixels' length:", CompiledVisualizationTraitSchema.errors);
    }
  });

  it("should invalidate when 'extension' has invalid properties", function () {
    const invalidVisualizationDefinition = {
      definition: {
        index: { value: 3 }, // Valid index for characteristic range
        extension: {
          name: "Valid Name",
          description: "A valid description.",
          test: 100
        }
      },
      pixels: Array.from({ length: 256 }, (_, i) => ({
        index: i,
        R: 255,
        G: 0,
        B: 0,
        A: 0,
      })),
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;

    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for invalid 'extension' properties:", CompiledVisualizationTraitSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidVisualizationDefinition = {
      definition: {
        index: { value: 3 }, // Valid index for characteristic range
        extension: {
          subindex: 100,
          name: "Valid Name",
          description: "A valid description.",
        }
      },
      pixels: Array.from({ length: 256 }, (_, i) => ({
        index: i,
        R: 255,
        G: 0,
        B: 0,
        A: 0,
      })),
      extraProperty: "Not allowed",
    };

    const isValid = CompiledVisualizationTraitSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;

    if (CompiledVisualizationTraitSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledVisualizationTraitSchema.errors);
    }
  });
});