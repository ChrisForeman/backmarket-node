import { describe } from 'mocha'
import * as assert from 'assert'

import { getCatalogString } from '../src/utils'
import * as utilsMock from './utils.mock'
describe(`Common`, () => {

    describe(`#getCatalogString()`, () => {

        it(`Creates a valid catalog string for a single listing`, () => {
            const mockData = utilsMock.getCatalogString.single.mock()
            const expected = utilsMock.getCatalogString.single.expected()
            const actual = getCatalogString([mockData], ';')
            assert.strictEqual(actual, expected)
        })

        it(`Creates a valid catalog string for multiple listings`, () => {
            const mockData = utilsMock.getCatalogString.multi.mock()
            const expected = utilsMock.getCatalogString.multi.expected()
            const actual = getCatalogString(mockData, ';')
            assert.strictEqual(actual, expected)
        })

        it(`Leaves an empty string for a field that is undefined`, () => {
            const mockData = utilsMock.getCatalogString.heteroEntries.mock()
            const expected = utilsMock.getCatalogString.heteroEntries.expected()
            const actual = getCatalogString(mockData, ';')
            assert.strictEqual(actual, expected)
        })

        it(`Uses a dynamic delimiter`, () => {
            const mockData = utilsMock.getCatalogString.single.mock()
            const expected = utilsMock.getCatalogString.delimiter.expected()
            const actual = getCatalogString([mockData], ',')
            assert.strictEqual(actual, expected)
        })
    })


})