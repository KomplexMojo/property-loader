import { expect } from "chai";
import { CompiledHeaderSchema } from "../src/header.schema.js";
import IndexRangeRegistry from "../src/indexregistry.js"; // Make sure this path is correct

describe("HeaderSchema Validation with Index Ranges", function () {
  it("should validate a correct Header object within the header index range", function () {
    const validHeader = {
      index: IndexRangeRegistry.header.start, // Use the start of the header range for validation
      name: "Valid Header Name",
      description: "This is a valid description of the header.",
    };

    const isValid = CompiledHeaderSchema(validHeader);
    expect(isValid).to.be.true;
    expect(CompiledHeaderSchema.errors).to.be.null;
  });

  it("should invalidate a Header object with an index out of the header index range", function () {
    const invalidHeader = {
      index: IndexRangeRegistry.header.end + 1, // Use an index just outside the valid range
      name: "Invalid Header Name",
      description: "This is an invalid description of the header.",
    };

    const isValid = CompiledHeaderSchema(invalidHeader);
    expect(isValid).to.be.false;
    expect(CompiledHeaderSchema.errors).to.not.be.null;
    if (CompiledHeaderSchema.errors) {
      console.error("Validation errors for out-of-range index:", CompiledHeaderSchema.errors);
    }
  });

  it("should validate a Header object at the upper bound of the header index range", function () {
    const upperBoundHeader = {
      index: IndexRangeRegistry.header.end, // Use the upper bound of the header range
      name: "Upper Bound Header",
      description: "This is a header at the upper bound of the valid index range.",
    };

    const isValid = CompiledHeaderSchema(upperBoundHeader);
    expect(isValid).to.be.true;
    expect(CompiledHeaderSchema.errors).to.be.null;
  });

  it("should invalidate a Header object with a name exceeding maxLength", function () {
    const invalidHeader = {
      index: IndexRangeRegistry.header.start, // Use a valid index
      name: "A".repeat(65), // Name exceeds maxLength of 64
      description: "This description is valid.",
    };

    const isValid = CompiledHeaderSchema(invalidHeader);
    expect(isValid).to.be.false;
    expect(CompiledHeaderSchema.errors).to.not.be.null;
    if (CompiledHeaderSchema.errors) {
      console.error("Validation errors for name exceeding maxLength:", CompiledHeaderSchema.errors);
    }
  });

  it("should invalidate a Header object with a description exceeding maxLength", function () {
    const invalidHeader = {
      index: IndexRangeRegistry.header.start, // Use a valid index
      name: "Valid Header Name",
      description: "A".repeat(257), // Description exceeds maxLength of 256
    };

    const isValid = CompiledHeaderSchema(invalidHeader);
    expect(isValid).to.be.false;
    expect(CompiledHeaderSchema.errors).to.not.be.null;
    if (CompiledHeaderSchema.errors) {
      console.error("Validation errors for description exceeding maxLength:", CompiledHeaderSchema.errors);
    }
  });

  it("should invalidate a Header object with missing required properties", function () {
    const invalidHeader = {
      index: IndexRangeRegistry.header.start, // Use a valid index
      // Missing 'name' and 'description'
    };

    const isValid = CompiledHeaderSchema(invalidHeader);
    expect(isValid).to.be.false;
    expect(CompiledHeaderSchema.errors).to.not.be.null;
    if (CompiledHeaderSchema.errors) {
      console.error("Validation errors for missing required properties:", CompiledHeaderSchema.errors);
    }
  });

  it("should invalidate a Header object with additional properties", function () {
    const invalidHeader = {
      index: IndexRangeRegistry.header.start, // Use a valid index
      name: "Valid Header Name",
      description: "This is a valid description.",
      extraProperty: "Not allowed", // Additional property not defined in the schema
    };

    const isValid = CompiledHeaderSchema(invalidHeader);
    expect(isValid).to.be.false;
    expect(CompiledHeaderSchema.errors).to.not.be.null;
    if (CompiledHeaderSchema.errors) {
      console.error("Validation errors for additional property:", CompiledHeaderSchema.errors);
    }
  });
});