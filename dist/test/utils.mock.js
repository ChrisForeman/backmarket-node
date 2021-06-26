"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatalogString = void 0;
exports.getCatalogString = {
    single: {
        mock: () => {
            return {
                sku: 'SKU_1',
                price: 100
            };
        },
        expected: () => {
            return `sku;price;\nSKU_1;100;`;
        }
    },
    multi: {
        mock: () => {
            return [
                {
                    sku: 'SKU_1',
                    price: 100
                },
                {
                    sku: 'SKU_2',
                    price: 75
                },
                {
                    sku: 'SKU_3',
                    price: 50
                },
                {
                    sku: 'SKU_4',
                    price: 25
                }
            ];
        },
        expected: () => {
            return 'sku;price;\nSKU_1;100;\nSKU_2;75;\nSKU_3;50;\nSKU_4;25;';
        }
    },
    delimiter: {
        expected: () => {
            return `sku,price,\nSKU_1,100,`;
        }
    },
    heteroEntries: {
        mock: () => {
            return [];
        }
    }
};
