import { expect } from "chai";
import { CompiledEventTemplateSchema } from "../schemas/event.template.schema.js";

describe("Event Template Schema Validation", function () {

    it("should validate a correct Event Template object..", function () {
        const validEventTemplate = {
            event: {
                index: { value: 140 },  // Ensure index is an object here
                subindex: { value: 100 },
                value: { value: 50 }
            },
            defaults: [
                {
                    index: 1,
                    name: "Default Profile",
                    value: 50
                },
            ],
            triggers: [
                {
                    index: { value: 160 },  // Ensure index is an object here
                    subindex: { value: 100 },
                    value: { value: 50 }
                }
            ],
            effects: [
                {
                    index: { value: 192 },  // Ensure index is an object here
                    subindex: { value: 120 },
                    value: { value: 80 }
                }
            ],
            conditions: [
                {
                    index: { value: 224 },  // Ensure index is an object here
                    subindex: { value: 60 },
                    value: { value: 30 }
                }
            ]
        };

        const isValid = CompiledEventTemplateSchema(validEventTemplate);
        expect(isValid).to.be.true;
        expect(CompiledEventTemplateSchema.errors).to.be.null;
        console.error(CompiledEventTemplateSchema.errors);
    });

    it("should invalidate when 'header' is missing", function () {
        const invalidEventTemplate = {
            triggers: [
                { index: 160, subindex: { value: 100 }, value: { value: 50 } }
            ],
            effects: [
                { index: 192, subindex: { value: 120 }, value: { value: 80 } }
            ],
            conditions: [
                { index: 224, subindex: { value: 60 }, value: { value: 30 } }
            ]
        };

        const isValid = CompiledEventTemplateSchema(invalidEventTemplate);
        expect(isValid).to.be.false;
        if (CompiledEventTemplateSchema.errors) {
            console.error("Validation errors for missing 'header':", CompiledEventTemplateSchema.errors);
        }
    });

    it("should invalidate when 'triggers' exceeds maximum items", function () {
        const invalidEventTemplate = {
            header: {
                index: 140,
                name: "Valid Event Header",
                description: "This is a valid event header description.",
            },
            triggers: Array(32 + 1).fill({
                index: 160,
                subindex: { value: 100 },
                value: { value: 50 }
            }),
            effects: [
                { index: 192, subindex: { value: 120 }, value: { value: 80 } }
            ],
            conditions: [
                { index: 224, subindex: { value: 60 }, value: { value: 30 } }
            ]
        };

        const isValid = CompiledEventTemplateSchema(invalidEventTemplate);
        expect(isValid).to.be.false;
        if (CompiledEventTemplateSchema.errors) {
            console.error("Validation errors for 'triggers' exceeding maximum items:", CompiledEventTemplateSchema.errors);
        }
    });

    it("should invalidate when 'effects' has fewer than minimum items", function () {
        const invalidEventTemplate = {
            header: {
                name: "Valid Event Header",
                description: "This is a valid event header description.",
            },
            triggers: [
                { index: 160, subindex: { value: 100 }, value: { value: 50 } }
            ],
            effects: [], // No effects, violating minItems
            conditions: [
                { index: 224, subindex: { value: 60 }, value: { value: 30 } }
            ]
        };

        const isValid = CompiledEventTemplateSchema(invalidEventTemplate);
        expect(isValid).to.be.false;
        if (CompiledEventTemplateSchema.errors) {
            console.error("Validation errors for 'effects' with fewer than minimum items:", CompiledEventTemplateSchema.errors);
        }
    });

    it("should invalidate when 'conditions' has extra properties", function () {
        const invalidEventTemplate = {
            header: {
                name: "Valid Event Header",
                description: "This is a valid event header description.",
            },
            triggers: [
                { index: 160, subindex: { value: 100 }, value: { value: 50 } }
            ],
            effects: [
                { index: 192, subindex: { value: 120 }, value: { value: 80 } }
            ],
            conditions: [
                {
                    index: 224,
                    subindex: { value: 60 },
                    value: { value: 30 },
                    extraProperty: "Not allowed"
                }
            ]
        };

        const isValid = CompiledEventTemplateSchema(invalidEventTemplate);
        expect(isValid).to.be.false;
        if (CompiledEventTemplateSchema.errors) {
            console.error("Validation errors for 'conditions' with extra properties:", CompiledEventTemplateSchema.errors);
        }
    });

    it("should invalidate when 'defaults' exceeds maximum items", function () {
        const invalidEventTemplate = {
            header: {
                name: "Valid Event Header",
                description: "This is a valid event header description.",
            },
            defaults: Array(11).fill({
                index: 1,
                name: "Default Profile",
                value: 50
            }),
            triggers: [
                { index: 160, subindex: { value: 100 }, value: { value: 50 } }
            ],
            effects: [
                { index: 192, subindex: { value: 120 }, value: { value: 80 } }
            ],
            conditions: [
                { index: 224, subindex: { value: 60 }, value: { value: 30 } }
            ]
        };

        const isValid = CompiledEventTemplateSchema(invalidEventTemplate);
        expect(isValid).to.be.false;
        if (CompiledEventTemplateSchema.errors) {
            console.error("Validation errors for 'defaults' exceeding maximum items:", CompiledEventTemplateSchema.errors);
        }
    });

    it("should invalidate when 'header' has invalid data", function () {
        const invalidEventTemplate = {
            header: {
                name: "Invalid Event Header",
                description: "This is an invalid event header description.",
            },
            defaults: [
                { index: 1, name: "Default Profile", value: 50 }
            ],
            triggers: [
                { index: 160, subindex: { value: 100 }, value: { value: 50 } }
            ],
            effects: [
                { index: 192, subindex: { value: 120 }, value: { value: 80 } }
            ],
            conditions: [
                { index: 224, subindex: { value: 60 }, value: { value: 30 } }
            ]
        };

        const isValid = CompiledEventTemplateSchema(invalidEventTemplate);
        expect(isValid).to.be.false;
        if (CompiledEventTemplateSchema.errors) {
            console.error("Validation errors for invalid 'header' data:", CompiledEventTemplateSchema.errors);
        }
    });
});