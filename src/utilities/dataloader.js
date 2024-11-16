import fs from 'fs';
import path from 'path';

/**
 * Load and validate JSON files in a folder against a compiled AJV schema.
 * @param {string} folderPath - The folder containing JSON files to validate.
 * @returns {Array<object>} - An array of validated JSON objects.
 * @throws {Error} - Throws error if folder doesn't exist, is empty, or if validation fails.
 */
async function loadAndValidateJSONFiles(folderPath, SchemaFile) {
    const validate = SchemaFile;

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
        throw new Error(`The folder "${folderPath}" does not exist.`);
    }

    // Read the folder contents
    const files = fs.readdirSync(folderPath);

    // Filter for JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
        throw new Error(`The folder "${folderPath}" is empty or contains no JSON files.`);
    }

    const validatedData = [];

    for (const file of jsonFiles) {
        const filePath = path.join(folderPath, file);

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            if (!validate(jsonData)) {
                console.error(`Validation errors in file: ${file}`);
                console.error(validate.errors);
                throw new Error(`Validation failed for file: ${file}`);
            }

            validatedData.push(jsonData);
        } catch (err) {
            console.error(`Error processing file: ${filePath}`);
            throw err;
        }
    }

    return validatedData;
}

import { CompiledEffectDefinitionSchema } from '../../schemas/effect.definition.schema.js';

// Example usage
(async () => {
    const folderPath = './data/json'; // Replace with your folder path

    try {
        const validatedFiles = await loadAndValidateJSONFiles(folderPath, CompiledEffectDefinitionSchema);
        console.log('Validated JSON data:', validatedFiles);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
