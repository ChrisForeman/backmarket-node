"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert = require("assert");
const utils_1 = require("../src/utils");
const utilsMock = require("./utils.mock");
mocha_1.describe(`Common`, () => {
    mocha_1.describe(`#getCatalogString()`, () => {
        it(`Creates a valid catalog string for a single listing`, () => {
            const mockData = utilsMock.getCatalogString.single.mock();
            const expected = utilsMock.getCatalogString.single.expected();
            const actual = utils_1.getCatalogString([mockData], ';');
            assert.strictEqual(actual, expected);
            console.log('WHOA', actual, expected);
        });
        it(`Creates a valid catalog string for multiple listings`, () => {
            const mockData = utilsMock.getCatalogString.multi.mock();
            const expected = utilsMock.getCatalogString.multi.expected();
            const actual = utils_1.getCatalogString(mockData, ';');
            assert.strictEqual(actual, expected);
        });
        it(`Leaves an empty string for a field that is undefined`, () => {
        });
        it(`Uses a dynamic delimiter`, () => {
            const mockData = utilsMock.getCatalogString.single.mock();
            const expected = utilsMock.getCatalogString.delimiter.expected();
            const actual = utils_1.getCatalogString([mockData], ',');
            assert.strictEqual(actual, expected);
        });
    });
});
