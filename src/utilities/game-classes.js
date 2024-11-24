import IndexRangeRegistry from "../../schemas/_indexregistry.js";

// Base Index Class
class Index {
  constructor(data, rangeStart, rangeEnd) {
    if (data.value < rangeStart || data.value > rangeEnd) {
      throw new Error(`Index value ${data.value} is out of range (${rangeStart} - ${rangeEnd})`);
    }
    this.value = data.value;
  }
}

// Specific Index Classes
class TriggerIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.triggerRange.start, IndexRangeRegistry.triggerRange.end);
  }
}

class EffectIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.effectRange.start, IndexRangeRegistry.effectRange.end);
  }
}

class ConditionIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.conditionRange.start, IndexRangeRegistry.conditionRange.end);
  }
}

class EventIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.eventRange.start, IndexRangeRegistry.eventRange.end);
  }
}

class InstanceIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.instanceRange.start, IndexRangeRegistry.instanceRange.end);
  }
}

class DefinitionIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.definitionRange.start, IndexRangeRegistry.definitionRange.end);
  }
}

class PixelIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.pixelRange.start, IndexRangeRegistry.pixelRange.end);
  }
}

class SubIndex extends Index {
  constructor(data) {
    super(data, IndexRangeRegistry.subindexRange.start, IndexRangeRegistry.subindexRange.end);
  }
}

// Main Classes
class Header {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
  }
}

class InstanceValues {
  constructor(data) {
    this.index = new InstanceIndex(data.index);
    this.subindex = new SubIndex(data.subindex);
    this.value = data.value.value;
  }
}

class DefinitionExtension {
  constructor(data) {
    this.subindex = data.subindex;
    this.name = data.name;
    this.description = data.description;
  }
}

class Definition {
  constructor(data) {
    this.index = new DefinitionIndex(data.index);
    this.extension = new DefinitionExtension(data.extension);
  }
}

class Pixel {
  constructor(data) {
    this.index = new PixelIndex(data.index);
    this.IsData = data.IsData;
    this.R = data.R;
    this.G = data.G;
    this.B = data.B;
    this.A = data.A;
  }
}

class Visualization {
  constructor(data) {
    this.defaults = new InstanceValues(data.defaults);
    this.definition = new Definition(data.definition);
    this.pixels = data.pixels.map(pixelData => new Pixel(pixelData));
  }
}

class Trigger {
  constructor(data) {
    this.index = new TriggerIndex(data.index);
    this.extension = new DefinitionExtension(data.extension);
  }
}

class Effect {
  constructor(data) {
    this.index = new EffectIndex(data.index);
    this.extension = new DefinitionExtension(data.extension);
  }
}

class Condition {
  constructor(data) {
    this.index = new ConditionIndex(data.index);
    this.extension = new DefinitionExtension(data.extension);
  }
}

class Event {
  constructor(data) {
    this.index = new EventIndex(data.index);
    this.extension = new DefinitionExtension(data.extension);
  }
}

class GameTemplate {
  constructor(data) {
    this.header = new Header(data["game.template"].header);
    this.visualizations = new Visualization(data["game.template"].visualizations);
    this.characteristics = {
      defaults: new InstanceValues(data.characteristics.defaults),
      definition: new Definition(data.characteristics.definition),
    };
    this.behaviours = {
      defaults: new InstanceValues(data.behaviours.defaults),
      definition: new Definition(data.behaviours.definition),
    };
    this.triggers = data.triggers.map(triggerData => new Trigger(triggerData));
    this.effects = data.effects.map(effectData => new Effect(effectData));
    this.conditions = data.conditions.map(conditionData => new Condition(conditionData));
    this.events = data.events.map(eventData => new Event(eventData));
  }
}

export { GameTemplate, Header, InstanceValues, Definition, DefinitionExtension, Pixel, Visualization, Trigger, Effect, Condition, Event, TriggerIndex, EffectIndex, ConditionIndex, EventIndex, InstanceIndex, DefinitionIndex, PixelIndex };