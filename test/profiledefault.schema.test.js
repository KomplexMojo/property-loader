import { expect } from 'chai';
import { CompiledDefaultProfileSchema } from '../src/profiledefault.schema.js'; // Adjust the path as needed

// Test suite for ProfileDefaultSchema
describe('ProfileDefaultSchema Validation', function () {
  it('should validate a correct profile object', function () {
    const validProfile = {
      index: 100,
      name: 'Valid Profile Name',
      value: true,
    };

    const isValid = CompiledDefaultProfileSchema(validProfile);
    expect(isValid).to.be.true;
    expect(CompiledDefaultProfileSchema.errors).to.be.null;
    if (!isValid) {
      console.error('Validation errors for a correct profile object:', CompiledDefaultProfileSchema.errors);
    }
  });

  it('should invalidate a profile with missing required properties', function () {
    const invalidProfile = {
      index: 100,
      // Missing 'name' and 'value'
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfile);
    expect(isValid).to.be.false;
    expect(CompiledDefaultProfileSchema.errors).to.not.be.null;
    if (isValid) {
      console.error('Validation errors for missing required properties:', CompiledDefaultProfileSchema.errors);
    }
  });

  it('should invalidate a profile with an index out of range', function () {
    const invalidProfile = {
      index: 300, // Out of the 0-255 range
      name: 'Profile Name',
      value: false,
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfile);
    expect(isValid).to.be.false;
    expect(CompiledDefaultProfileSchema.errors).to.not.be.null;
    if (isValid) {
      console.error('Validation errors for index out of range:', CompiledDefaultProfileSchema.errors);
    }
  });

  it('should invalidate a profile with a name exceeding maxLength', function () {
    const invalidProfile = {
      index: 50,
      name: 'A'.repeat(65), // 65 characters, exceeding the maxLength of 64
      value: 42,
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfile);
    expect(isValid).to.be.false;
    expect(CompiledDefaultProfileSchema.errors).to.not.be.null;
    if (isValid) {
      console.error('Validation errors for name exceeding maxLength:', CompiledDefaultProfileSchema.errors);
    }
  });

  it('should invalidate a profile with an invalid value type', function () {
    const invalidProfile = {
      index: 25,
      name: 'Profile Name',
      value: 'invalid', // Should be boolean or integer
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfile);
    expect(isValid).to.be.false;
    expect(CompiledDefaultProfileSchema.errors).to.not.be.null;
    if (isValid ) {
      console.error('Validation errors for invalid value type:', CompiledDefaultProfileSchema.errors);
    }
  });

  it('should invalidate a profile with additional properties', function () {
    const invalidProfile = {
      index: 10,
      name: 'Profile Name',
      value: true,
      extraProperty: 'Not allowed', // Additional property not defined in the schema
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfile);
    expect(isValid).to.be.false;
    expect(CompiledDefaultProfileSchema.errors).to.not.be.null;
    if (isValid) {
      console.error('Validation errors for additional properties:', CompiledDefaultProfileSchema.errors);
    }
  });

  it('should invalidate a profile with fewer properties', function () {
    const invalidProfile = {
      index: 10,
      name: 'Profile Name',
    };

    const isValid = CompiledDefaultProfileSchema(invalidProfile);
    expect(isValid).to.be.false;
    expect(CompiledDefaultProfileSchema.errors).to.not.be.null;
    if (isValid) {
      console.error('Validation errors for fewer properties:', CompiledDefaultProfileSchema.errors);
    }
  });
});