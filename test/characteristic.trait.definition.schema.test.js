import { expect } from "chai";
import { CompiledCharacteristicTraitDefinitionSchema } from "../schemas/characteristic.trait.definition.schema.js";

describe("Characteristic Trait Definition Schema Validation", function () {
  
  it("should validate a correct Characteristic Trait Definition object", function () {
    const validCharacteristicTraitDefinition = {
      definition: {
        index: { value: 45 }, // Valid index for characteristic range
        extension: {
          subindex: 100,
          name: "Valid Name",
          description: "A valid description."
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: 50
      }
    };

    const isValid = CompiledCharacteristicTraitDefinitionSchema(validCharacteristicTraitDefinition);
    expect(isValid).to.be.true;
    expect(CompiledCharacteristicTraitDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when the characteristic index is out of range", function () {
    const invalidCharacteristicTraitDefinition = {
      definition: {
        index: { value: 90 }, // Out of range for characteristic index
        extension: {
          subindex: 0,
          name: "Valid Name",
          description: "A valid description."
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: 50
      }
    };

    const isValid = CompiledCharacteristicTraitDefinitionSchema(invalidCharacteristicTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicTraitDefinitionSchema.errors) {
      console.error("Validation errors for characteristic index out of range:", CompiledCharacteristicTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when the extension value exceeds maximum range", function () {
    const invalidCharacteristicTraitDefinition = {
      definition: {
        index: { value: 45 },
        extension: {
          subindex: 300,
          name: "Valid Name",
          description: "A valid description."
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: 50
      }
    };

    const isValid = CompiledCharacteristicTraitDefinitionSchema(invalidCharacteristicTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicTraitDefinitionSchema.errors) {
      console.error("Validation errors for extension value out of range:", CompiledCharacteristicTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when required properties are missing in defaults", function () {
    const invalidCharacteristicTraitDefinition = {
      definition: {
        index: { value: 45 },
        extension: {
          subindex: 100,
          name: "Valid Name",
          description: "A valid description."
        }
      },
      defaults: {
        index: 1,
        // Missing 'name' property
        value: 50
      }
    };

    const isValid = CompiledCharacteristicTraitDefinitionSchema(invalidCharacteristicTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicTraitDefinitionSchema.errors) {
      console.error("Validation errors for missing required property in defaults:", CompiledCharacteristicTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidCharacteristicTraitDefinition = {
      definition: {
        index: { value: 45 },
        extension: {
          subindex: 0,
          name: "Valid Name",
          description: "A valid description."
        }
      },
      defaults: {
        index: 1,
        name: "Default Profile",
        value: 50,
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledCharacteristicTraitDefinitionSchema(invalidCharacteristicTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicTraitDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledCharacteristicTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when the 'definition' property is missing", function () {
    const invalidCharacteristicTraitDefinition = {
      // Missing 'definition' property
      defaults: {
        index: 1,
        name: "Default Profile",
        value: 50
      }
    };

    const isValid = CompiledCharacteristicTraitDefinitionSchema(invalidCharacteristicTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicTraitDefinitionSchema.errors) {
      console.error("Validation errors for missing 'definition' property:", CompiledCharacteristicTraitDefinitionSchema.errors);
    }
  });

  it("should invalidate when the 'defaults' property is missing", function () {
    const invalidCharacteristicTraitDefinition = {
      definition: {
        index: { value: 45 },
        extension: {
          subindex: 0,
          name: "Valid Name",
          description: "A valid description.",
        }
      }
      // Missing 'defaults' property
    };

    const isValid = CompiledCharacteristicTraitDefinitionSchema(invalidCharacteristicTraitDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicTraitDefinitionSchema.errors) {
      console.error("Validation errors for missing 'defaults' property:", CompiledCharacteristicTraitDefinitionSchema.errors);
    }
  });
});