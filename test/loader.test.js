import { expect } from 'chai';
import { parseAppearance } from '../src/loader.js';

it('should throw an error for invalid appearance index using AssemblyScript validation', () => {
  const invalidAppearance = {
    index: 40, // Invalid index
    name: 'Invalid Appearance',
    description: 'Should fail',
    visualization: [],
  };

  expect(() => parseAppearance(invalidAppearance)).to.throw('Invalid index for appearance. Must be between 0 and 39.');
});