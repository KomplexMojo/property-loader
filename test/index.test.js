import { expect} from 'chai';
import { parseAppearance } from '../src/loader.js';

describe('Index Range Enforcement', () => {
  it('should reject appearances with index out of range', () => {
    const invalidAppearance = {
      index: 40, // Invalid index for appearances
      name: 'Invalid Appearance',
      description: 'This should fail.',
      visualization: [],
    };

    expect(() => parseAppearance(invalidAppearance)).to.throw();
  });

  it('should accept appearances with index within range', () => {
    const validAppearance = {
      index: 20, // Valid index
      name: 'Valid Appearance',
      description: 'This should pass.',
      visualization: [],
    };

    const result = parseAppearance(validAppearance);
    expect(result).to.have.property('index', 20);
  });

  // Add similar tests for other entities with their index ranges
});