class IndexLoader {
    constructor() {
      // Initialize an array of objects for each index in the range 0-255
      this.data = Array.from({ length: 256 }, () => ({
        subindexes: {}, // Store subindex-value pairs
      }));
    }
  
    // Validate index is within range
    static validateIndex(index) {
      if (index < 0 || index > 255) {
        throw new Error(`Index ${index} is out of range (0-255).`);
      }
    }
  
    // Validate subindex is within range
    static validateSubindex(subindex) {
      if (subindex < 0 || subindex > 255) {
        throw new Error(`Subindex ${subindex} is out of range (0-255).`);
      }
    }
  
    // Validate value type
    static validateValue(value) {
      if (typeof value !== "boolean" && typeof value !== "number" && typeof value !== "string") {
        throw new Error(`Invalid value type: ${typeof value}. Value must be a boolean, integer, or string.`);
      }
    }
  
    // Add or update a subindex-value pair for a given index
    addOrUpdate(index, subindex, value) {
      IndexLoader.validateIndex(index);
      IndexLoader.validateSubindex(subindex);
      IndexLoader.validateValue(value);
  
      // Add or update the value for the specified subindex
      this.data[index].subindexes[subindex] = value;
    }
  
    // Get the value for a specific index and subindex
    getValue(index, subindex) {
      IndexLoader.validateIndex(index);
      IndexLoader.validateSubindex(subindex);
  
      const indexData = this.data[index];
      if (indexData.subindexes.hasOwnProperty(subindex)) {
        return indexData.subindexes[subindex];
      }
  
      throw new Error(`Subindex ${subindex} not found under index ${index}.`);
    }
  
    // Remove a subindex-value pair for a given index
    removeSubindex(index, subindex) {
      IndexLoader.validateIndex(index);
      IndexLoader.validateSubindex(subindex);
  
      const indexData = this.data[index];
      if (indexData.subindexes.hasOwnProperty(subindex)) {
        delete indexData.subindexes[subindex];
      } else {
        throw new Error(`Subindex ${subindex} not found under index ${index}.`);
      }
    }
  
    // Get all subindexes and their values for a specific index
    getSubindexes(index) {
      IndexLoader.validateIndex(index);
      return { ...this.data[index].subindexes };
    }
  
    // Pretty print the entire index structure for debugging
    prettyPrint() {
      console.log("Index Data:");
      this.data.forEach((entry, index) => {
        if (Object.keys(entry.subindexes).length > 0) {
          console.log(`Index ${index}:`);
          Object.entries(entry.subindexes).forEach(([subindex, value]) => {
            console.log(`  Subindex ${subindex}: ${value}`);
          });
        }
      });
    }
  }
  
  // Export the class for use in other modules
  export default IndexLoader;