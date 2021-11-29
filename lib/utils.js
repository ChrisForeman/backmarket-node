"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeDate = exports.indexArray = exports.getCatalogString = void 0;
function getCatalogString(items, delimiter) {
    const set = new Set();
    items.forEach(item => {
        Object.keys(item).forEach(key => {
            set.add(key);
        });
    });
    const headings = Array.from(set).sort(); //Sorting so for testing the headings will always be in the same ordering.
    let catalogStr = `${headings.join(delimiter)}${delimiter}\n`;
    items.forEach((item, i) => {
        let rowStr = '';
        headings.forEach(h => {
            const val = item[h];
            if (val !== undefined) {
                rowStr += `${val}${delimiter}`;
            }
            else {
                rowStr += delimiter;
            }
        });
        if (i < items.length - 1) {
            rowStr += '\n';
        }
        catalogStr += rowStr;
    });
    return catalogStr;
}
exports.getCatalogString = getCatalogString;
/**
 * Creates an array where each element is a number n where n represents the index element's index.
 * Created as an alternative to slice() to allow mapping of large object arrays without copying the objects.
 * @param startIndex The index to start counting from
 * @param length The length of the array to output
 * @returns A numbered array
 */
function indexArray(startIndex, length) {
    let i = 0;
    const a = Array(length);
    while (i < length) {
        a[i] = i + startIndex;
        i++;
    }
    return a;
}
exports.indexArray = indexArray;
/**
 * This creates a new date object, but avoid invalid edge cases not caught by the default date constructor.
 */
function serializeDate(value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    const date = new Date(value);
    const isDate = date !== 'Invalid Date' && !isNaN(date);
    return isDate ? date : undefined;
}
exports.serializeDate = serializeDate;
