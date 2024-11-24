import { expect } from "chai";
import { CompiledBehaviourTraitDefinitionSchema } from "../schemas/behaviour.trait.definition.schema.js";

describe("Behaviour Trait Definition Schema Validation", function () {

  it("should validate a correct Behaviour Trait Definition object", function () {
    const validBehaviourTraitDefinition = {
      defaults: {
        index: { value: 100 },
        subindex: { value: 100 },
        value: { value: 100 }
      },
      definition: {
        index: { value: 90 }, // Within valid range for behaviours
        extension: {
          subindex: { value: 0 },
          name: "Valid Name",
          description: "A valid description for behaviour."
        }
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(validBehaviourTraitDefinition);
    expect(isValid).to.be.true;
    console.error("Validation errors for characteristic index out of range:", CompiledBehaviourTraitDefinitionSchema.errors);
    expect(CompiledBehaviourTraitDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when behaviour index is out of range", function () {
    const invalidBehaviourTraitDefinition = {
      defaults: {
        index: { value: 1 },
        subindex: { value: 0 },
        value: { value: true }
      },
      definition: {
        index: 140, // Out of range for behaviour index
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description."
        }
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range behaviour index:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when required properties are missing", function () {
    const invalidBehaviourTraitDefinition = {
      defaults: {
        index: { value: 1 },
      },
      definition: {
        index: 90,
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description."
        }
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for missing required properties:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidBehaviourTraitDefinition = {
      defaults: {
        index: { value: 1 },
        subindex: { value: 0 },
        value: { value: true }
      },
      definition: {
        index: 90,
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description."
        }
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when the value in defaults is out of range", function () {
    const invalidBehaviourTraitDefinition = {
      defaults: {
        index: { value: 1 },
        subindex: { value: 0 },
        value: { value: 400 }
      },
      definition: {
        index: 90,
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description."
        }
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range value in defaults:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when the subindex in definition is out of range", function () {
    const invalidBehaviourTraitDefinition = {
      defaults: {
        index: { value: 1 },
        subindex: { value: 0 },
        value: { value: true }
      },
      definition: {
        index: 90,
        extension: {
          subindex: 300, // Exceeds maximum valid range
          name: "Valid Behaviour Name",
          description: "A valid description."
        }
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range subindex in definition:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

});
