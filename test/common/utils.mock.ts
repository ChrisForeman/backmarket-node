import { CatalogFields } from "../../src/common/types"


export const getCatalogString = {
    single: {
        mock: (): CatalogFields => {
            return {
                sku: 'SKU_1',
                price: 100
            }
        },
        expected: (): string => {
            return ''
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
            return ''
        }
    }
}