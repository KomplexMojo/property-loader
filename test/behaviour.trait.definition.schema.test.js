import { expect } from "chai";
import { CompiledBehaviourTraitDefinitionSchema } from "../schemas/behaviour.trait.definition.schema.js";

describe("Behaviour Trait Definition Schema Validation", function () {
  
  it("should validate a correct Behaviour Trait Definition object", function () {
    const validBehaviourTraitDefinition = {
      definition: {
        index: { value: 90 }, // Within valid range for behaviours
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description for behaviour."
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: true,
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(validBehaviourTraitDefinition);
    expect(isValid).to.be.true;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range behaviour index:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
    expect(CompiledBehaviourTraitDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when behaviour index is out of range", function () {
    const invalidBehaviourTraitDefinition = {
      definition: {
        index: { value: 140 }, // Out of range for behaviour index
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description."
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: true,
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range behaviour index:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when the default profile name exceeds the maximum length", function () {
    const invalidBehaviourTraitDefinition = {
      definition: {
        index: { value: 90 },
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description.",
        }
      },
      defaults: {
        index: 1,
        name: "A".repeat(65), // Exceeds 64 character max length
        value: true,
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for long default profile name:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when the value in default profile is out of range", function () {
    const invalidBehaviourTraitDefinition = {
      definition: {
        index: { value: 90 },
        extension: {
          subindex: 0,
          name: "Valid Behaviour Name",
          description: "A valid description."
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: 300 // Exceeds maximum of 255
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range default profile value:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing in the default profile", function () {
    const invalidBehaviourTraitDefinition = {
      definition: {
        index: { value: 90 },
        extension: {
          subindex: 100,
          name: "Valid Behaviour Name",
          description: "A valid description.",
        }
      },
      defaults: {
        index: 1,
        // Missing 'name' and 'value'
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for missing properties in default profile:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present in the default profile", function () {
    const invalidBehaviourTraitDefinition = {
      definition: {
        index: { value: 90 },
        extension: {
          subindex: 100,
          name: "Valid Behaviour Name",
          description: "A valid description.",
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: true,
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledBehaviourTraitDefinitionSchema(invalidBehaviourTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourTraitDefinitionSchema.errors) {
      console.error("Validation errors for additional properties in default profile:", CompiledBehaviourTraitDefinitionSchema.errors);
    }
  });
});