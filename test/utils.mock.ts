import { CatalogFields } from "../src/index"


export const getCatalogString = {
    single: {
        mock: (): CatalogFields => {
            return {
                sku: 'SKU_1',
                price: 100
            }
        },
        expected: (): string => {
            return `price;sku;\n100;SKU_1;`
        }
    },
    multi: {
        mock: (): CatalogFields[] => {
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
            ]
        },
        expected: (): string => {
            return 'price;sku;\n100;SKU_1;\n75;SKU_2;\n50;SKU_3;\n25;SKU_4;'
        }
    },
    delimiter: {
        expected: (): string => {
            return `price,sku,\n100,SKU_1,`
        }
    },
    heteroEntries: {
        mock: (): CatalogFields[] => {
            return [
                {
                    sku: 'SKU_1',
                    quantity: 2
                },
                {
                    sku: 'SKU_2',
                    price: 75
                },
                {
                    sku: 'SKU_3',
                    quantity: 5
                },
                {
                    sku: 'SKU_4',
                    price: 25
                }
            ]
        },
        expected: (): string => {
            return 'price;quantity;sku;\n;2;SKU_1;\n75;;SKU_2;\n;5;SKU_3;\n25;;SKU_4;'
        }
    }
}