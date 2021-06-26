"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatalogString = void 0;
function getCatalogString(items, delimiter) {
    const set = new Set();
    const headings = Array.from(set);
    let catalogStr = '';
    items.forEach(item => {
        Object.keys(item).forEach(key => {
            set.add(key);
        });
    });
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
