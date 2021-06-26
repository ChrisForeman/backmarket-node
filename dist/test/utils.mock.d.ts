import { CatalogFields } from "../src/types";
export declare const getCatalogString: {
    single: {
        mock: () => CatalogFields;
        expected: () => string;
    };
    multi: {
        mock: () => CatalogFields[];
        expected: () => string;
    };
    delimiter: {
        expected: () => string;
    };
    heteroEntries: {
        mock: () => CatalogFields[];
    };
};
