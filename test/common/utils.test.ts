import { describe } from 'mocha'
import * as assert from 'assert'

import { getCatalogString } from '../../src/common/utils'
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

        })

        it(`Leaves an empty placeholder for a field that is undefined`, () => {

        })

        it(`Uses a dynamic delimiter`, () => {

        })
    })

    describe(`#updateListingBulk()`, () => {

        it(`Updates a list of `, () => {

        })
    })


})