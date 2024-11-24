import fs from 'fs';
import path from 'path';
import { GameTemplate, InstanceValues, Header, Definition, DefinitionExtension, Pixel, Visualization, Trigger, Effect, Condition, Event} from './game-classes.js';
import IndexLoader from './index-loader.js';

function loadGameData(filePath) {
  try {
    // Read the JSON file from the given path
    const data = fs.readFileSync(path.resolve(filePath), 'utf-8');

    // Parse the JSON data
    const parsedData = JSON.parse(data);

    // Create an instance of the GameTemplate class using the parsed data
    const gameTemplate = new GameTemplate(parsedData);
    const indexLoader = new IndexLoader().extractGameIndexes();

    return gameTemplate;
  } catch (error) {
    console.error('Error loading game data file:', error);
    throw error;
  }
}

function prettyPrintGameDefinition(gameDefinition) {
  if (!gameDefinition) {
    console.log("No game definition provided.");
    return;
  }

  console.log("Game Definition:");
  console.log("=================");

  const header = gameDefinition.header || {};
  console.log("Header:");
  console.log(`  Name: ${header.name || "N/A"}`);
  console.log(`  Description: ${header.description || "N/A"}`);
  console.log();

  console.log("Visualizations:");
  const visualizations = gameDefinition.visualizations || {};
  const defaults = visualizations.defaults || {};
  const definition = visualizations.definition || {};
  const pixels = visualizations.pixels || [];

  if (defaults instanceof InstanceValues) {
    console.log("  Defaults:");
    console.log(`    Index: ${defaults.index.value}`);
    console.log(`    Subindex: ${defaults.subindex.value}`);
    console.log(`    Value: ${defaults.value}`);
  } else {
    console.error("  Defaults is not an instance of InstanceValues:", defaults);
  }

  if (definition instanceof Definition) {
    console.log("  Definition:");
    console.log(`    Index: ${definition.index.value}`);
    if (definition.extension instanceof DefinitionExtension) {
      console.log(`    Subindex: ${definition.extension.subindex.value}`);
      console.log(`    Name: ${definition.extension.name}`);
      console.log(`    Description: ${definition.extension.description}`);
    } else {
      console.error("    Extension is not an instance of DefinitionExtension:", definition.extension);
    }
  } else {
    console.error("  Definition is not an instance of Definition:", definition);
  }

  if (pixels.length === 256) {
    console.log("  Pixel Grid:");
    const grid = [];
    for (let i = 0; i < 256; i += 16) {
      const row = pixels.slice(i, i + 16).map(pixel => (pixel.A >= 1 ? 1 : 0));
      grid.push(row);
    }
    grid.forEach(row => console.log("    " + row.join(" ")));
  } else {
    console.log("    Pixel data is incomplete or invalid.");
  }
  console.log();

  // Triggers, Effects, Conditions, and Events
  const sections = ["triggers", "effects", "conditions", "events"];
  sections.forEach(section => {
    console.log(`${section.charAt(0).toUpperCase() + section.slice(1)}:`);
    (gameDefinition[section] || []).forEach((item, index) => {
      console.log(`  ${section.slice(0, -1).charAt(0).toUpperCase() + section.slice(0, -1).slice(1)} ${index}:`);
      if (item instanceof Trigger || item instanceof Effect || item instanceof Condition || item instanceof Event) {
        console.log(`    Index: ${item.index.value}`);
        if (item.extension instanceof DefinitionExtension) {
          console.log(`    Subindex: ${item.extension.subindex.value}`);
          console.log(`    Name: ${item.extension.name}`);
          console.log(`    Description: ${item.extension.description}`);
        } else {
          console.error("    Extension is not an instance of DefinitionExtension:", item.extension);
        }
      } else {
        console.error("    Item is not a recognized class instance:", item);
      }
    });
    console.log();
  });
}

export { loadGameData, prettyPrintGameDefinition };
