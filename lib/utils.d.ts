import { CatalogFields } from './interal-types';
export declare function getCatalogString(items: CatalogFields[], delimiter: string): string;
/**
 * Creates an array where each element is a number n where n represents the index element's index.
 * Created as an alternative to slice() to allow mapping of large object arrays without copying the objects.
 * @param startIndex The index to start counting from
 * @param length The length of the array to output
 * @returns A numbered array
 */
export declare function indexArray(startIndex: number, length: number): number[];
/**
 * This creates a new date object, but avoid invalid edge cases not caught by the default date constructor.
 */
export declare function serializeDate(value: any): Date | undefined;
