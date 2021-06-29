"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatalogString = void 0;
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
