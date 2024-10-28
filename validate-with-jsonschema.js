// validate-with-jsonschema.js

import { Validator } from 'jsonschema';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse schema.json
const schemaPath = join(__dirname, 'schemas/schema.json');
const schemaContent = readFileSync(schemaPath, 'utf-8');
const gameSchema = JSON.parse(schemaContent);

// Initialize Validator
const validator = new Validator();

// Validate the schema itself (using an empty object as instance)
const validation = validator.validate({}, gameSchema);

if (validation.errors.length === 0) {
  console.log('Schema is valid.');
} else {
  console.error('Schema validation errors:', validation.errors);
}