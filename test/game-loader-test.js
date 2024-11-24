import { expect } from "chai";
import { GameTemplate } from "../src/utilities/game-classes.js";
import fs from "fs";
import path from "path";
import { prettyPrintGameDefinition } from "../src/utilities/game-loader.js";

describe("GameTemplate Class Tests", function () {
  let testData;

  before(function () {
    // Load test data from the JSON file
    const filePath = path.resolve("./src/data/game-template-data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    testData = JSON.parse(rawData);
  });

  it("should correctly load header values", function () {
    const gameTemplate = new GameTemplate(testData);

    expect(gameTemplate.header.name).to.equal(testData["game.template"].header.name);
    expect(gameTemplate.header.description).to.equal(testData["game.template"].header.description);
  });

  it("should correctly load visualization defaults", function () {
    const gameTemplate = new GameTemplate(testData);

    expect(gameTemplate.visualizations.defaults.index.value).to.equal(testData["game.template"].visualizations.defaults.index.value);
    expect(gameTemplate.visualizations.defaults.subindex.value).to.equal(testData["game.template"].visualizations.defaults.subindex.value);
    expect(gameTemplate.visualizations.defaults.value).to.equal(testData["game.template"].visualizations.defaults.value.value);
  });

  it("should correctly load definition values", function () {
    const gameTemplate = new GameTemplate(testData);

    expect(gameTemplate.visualizations.definition.index.value).to.equal(testData["game.template"].visualizations.definition.index.value);
    expect(gameTemplate.visualizations.definition.extension.name).to.equal(testData["game.template"].visualizations.definition.extension.name);
    expect(gameTemplate.visualizations.definition.extension.description).to.equal(testData["game.template"].visualizations.definition.extension.description);
  });

  it("should correctly load pixel data", function () {
    const gameTemplate = new GameTemplate(testData);

    testData["game.template"].visualizations.pixels.forEach((pixel, index) => {
      const loadedPixel = gameTemplate.visualizations.pixels[index];

      expect(loadedPixel.index.value).to.equal(pixel.index.value);
      expect(loadedPixel.IsData).to.equal(pixel.IsData);      
      expect(loadedPixel.R).to.equal(pixel.R);
      expect(loadedPixel.G).to.equal(pixel.G);
      expect(loadedPixel.B).to.equal(pixel.B);
      expect(loadedPixel.A).to.equal(pixel.A);
    });
  });

  it("should correctly load triggers", function () {
    const gameTemplate = new GameTemplate(testData);

    testData.triggers.forEach((trigger, index) => {
      const loadedTrigger = gameTemplate.triggers[index];

      expect(loadedTrigger.index.value).to.equal(trigger.index.value);
      expect(loadedTrigger.extension.name).to.equal(trigger.extension.name);
      expect(loadedTrigger.extension.description).to.equal(trigger.extension.description);
    });
  });

  it("should correctly load effects", function () {
    const gameTemplate = new GameTemplate(testData);

    testData.effects.forEach((effect, index) => {
      const loadedEffect = gameTemplate.effects[index];

      expect(loadedEffect.index.value).to.equal(effect.index.value);
      expect(loadedEffect.extension.name).to.equal(effect.extension.name);
      expect(loadedEffect.extension.description).to.equal(effect.extension.description);
    });
  });

  it("should correctly load conditions", function () {
    const gameTemplate = new GameTemplate(testData);

    testData.conditions.forEach((condition, index) => {
      const loadedCondition = gameTemplate.conditions[index];

      expect(loadedCondition.index.value).to.equal(condition.index.value);
      expect(loadedCondition.extension.name).to.equal(condition.extension.name);
      expect(loadedCondition.extension.description).to.equal(condition.extension.description);
    });
  });

  it("should correctly load events", function () {
    const gameTemplate = new GameTemplate(testData);

    testData.events.forEach((event, index) => {
      const loadedEvent = gameTemplate.events[index];

      expect(loadedEvent.index.value).to.equal(event.index.value);
      expect(loadedEvent.extension.name).to.equal(event.extension.name);
      expect(loadedEvent.extension.description).to.equal(event.extension.description);
    });
  });

  after(function () {
    const gameTemplate = new GameTemplate(testData);
    prettyPrintGameDefinition(gameTemplate);
  });
});