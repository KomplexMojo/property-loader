import {isValidAppearanceIndex } from '../build/debug.js';

function parseAppearance(appearance) {
  const { index, name, description, visualization } = appearance;

  if (!isValidAppearanceIndex(index)) {
    throw new Error('Invalid index for appearance. Must be between 0 and 39.');
  }

  // Continue parsing and validation
  return { index, name, description, visualization };
}

export { parseAppearance };