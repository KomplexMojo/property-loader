// indexRangeRegistry.js
const IndexRangeRegistry = {
  // Example range for headers
    visualizationRange: { start: 0, end: 39 },
    characteristicRange: { start: 40, end: 89 },
    behaviourRange: { start: 90, end: 139 },
    eventRange: { start: 140, end: 159 },
    triggerRange: { start: 160, end: 191 },
    effectRange: { start: 192, end: 223 },
    conditionRange: { start: 224, end: 255 },
    profileDefaultsRange: { start: 0, end: 255 }, // constrained by the number of values that fit into a u8.
    propertyValueRange: { start: 0, end: 255 },
    namePropertyRange: { start: 0, end: 63}, // lengeth of name descriptors.
    descriptionPropertyRange: {start: 0, end: 255}
  };
  
  export default IndexRangeRegistry;