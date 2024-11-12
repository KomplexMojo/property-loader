import { expect } from "chai";
import { CompiledTriggerIndex } from "../src/trigger.index.schema.js";
import IndexRangeRegistry from "../src/indexregistry.js";

const { start: triggerStart, end: triggerEnd } = IndexRangeRegistry.triggerRange;

describe("Trigger Index Schema Validation", function () {

    it("should validate a correct Trigger Index object", function () {
        const validTriggerIndex = {
            value: 170 // Assuming within trigger range
        };

        const isValid = CompiledTriggerIndex(validTriggerIndex);
        expect(isValid).to.be.true;
        expect(CompiledTriggerIndex.errors).to.be.null;

        if (CompiledTriggerIndex.errors) {
            console.error("Validation errors for index below range:", CompiledTriggerIndex.errors);
        }
    });

    it("should invalidate when 'index' is below the minimum range", function () {
        const invalidTriggerIndex = {
            value: triggerStart - 1 // Below the trigger range
        };

        const isValid = CompiledTriggerIndex(invalidTriggerIndex);
        expect(isValid).to.be.false;

        if (CompiledTriggerIndex.errors) {
            console.error("Validation errors for index below range:", CompiledTriggerIndex.errors);
        }
    });

    it("should invalidate when 'index' is above the maximum range", function () {
        const invalidTriggerIndex = {
            value: triggerEnd + 1 // Above the trigger range
        };

        const isValid = CompiledTriggerIndex(invalidTriggerIndex);
        expect(isValid).to.be.false;

        if (CompiledTriggerIndex.errors) {
            console.error("Validation errors for index above range:", CompiledTriggerIndex.errors);
        }
    });

    it("should invalidate when 'index' is not an integer", function () {
        const invalidTriggerIndex = {
            value: "not an integer" // Invalid type
        };

        const isValid = CompiledTriggerIndex(invalidTriggerIndex);
        expect(isValid).to.be.false;

        if (CompiledTriggerIndex.errors) {
            console.error("Validation errors for non-integer 'index':", CompiledTriggerIndex.errors);
        }
    });

    it("should invalidate when 'index' is missing", function () {
        const invalidTriggerIndex = {}; // Missing index

        const isValid = CompiledTriggerIndex(invalidTriggerIndex);
        expect(isValid).to.be.false;

        if (CompiledTriggerIndex.errors) {
            console.error("Validation errors for missing 'index':", CompiledTriggerIndex.errors);
        }
    });

    it("should invalidate when additional properties are present", function () {
        const invalidTriggerIndex = {
            value: 100, // Valid index within range
            extraProperty: "Not allowed" // Additional property
        };

        const isValid = CompiledTriggerIndex(invalidTriggerIndex);
        expect(isValid).to.be.false;

        if (CompiledTriggerIndex.errors) {
            console.error("Validation errors for additional properties:", CompiledTriggerIndex.errors);
        }
    });
});