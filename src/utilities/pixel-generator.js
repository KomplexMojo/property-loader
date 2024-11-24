import fs from 'fs';

class PixelDataGenerator {
  /**
   * Generates an array of 256 pixels with random RGB values.
   * Ensures 150 pixels have an A value of 0, and the remaining 106 have A > 0.
   * The resulting array is sorted by index value.
   * @returns {Array<Object>} The generated array of pixel objects.
   */
  static generatePixelData() {
    const pixels = [];

    // Generate 150 pixels with A = 0
    for (let i = 0; i < 150; i++) {
      pixels.push({
        index: i,
        IsStorage: true,
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256),
        A: 0
      });
    }

    // Generate 106 pixels with A > 0
    for (let i = 150; i < 256; i++) {
      pixels.push({
        index: i,
        IsStorage: false,
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256),
        A: Math.floor(Math.random() * 255) + 1 // A value between 1 and 255
      });
    }

    // Sort the array by index value
    pixels.sort((a, b) => a.index - b.index);

    return pixels;
  }

  /**
   * Writes the generated pixel data to a JSON file.
   * @param {string} filePath - The path where the JSON file will be saved.
   */
  static savePixelDataToFile(filePath) {
    const pixelData = { pixels: PixelDataGenerator.generatePixelData() };
    fs.writeFileSync(filePath, JSON.stringify(pixelData, null, 2), 'utf-8');
    console.log(`Pixel data saved to ${filePath}`);
  }
}

// Example usage
const filePath = './pixel-data.json';
PixelDataGenerator.savePixelDataToFile(filePath);

export default PixelDataGenerator;
