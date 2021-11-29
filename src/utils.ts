import { CatalogFields } from './interal-types'

export function getCatalogString(items: CatalogFields[], delimiter: string): string {
    const set = new Set<string>()

    items.forEach(item => {
        Object.keys(item).forEach(key => {
            set.add(key)
        })
    })

    const headings: string[] = Array.from(set).sort() //Sorting so for testing the headings will always be in the same ordering.
    let catalogStr = `${headings.join(delimiter)}${delimiter}\n`

    items.forEach((item, i) => {
        let rowStr = ''
        headings.forEach(h => {
            const val = (item as any)[h]
            if (val !== undefined) {
                rowStr += `${val}${delimiter}`
            } else {
                rowStr += delimiter
            }
        })
        if (i < items.length - 1) {
            rowStr += '\n'
        }
        catalogStr += rowStr
    })
    return catalogStr
}


/**
 * Creates an array where each element is a number n where n represents the index element's index.
 * Created as an alternative to slice() to allow mapping of large object arrays without copying the objects.
 * @param startIndex The index to start counting from
 * @param length The length of the array to output
 * @returns A numbered array
 */
export function indexArray(startIndex: number, length: number): number[] {
    let i = 0;
    const a = Array(length)
    while (i < length) {
        a[i] = i + startIndex
        i++
    }
    return a
}


/**
 * This creates a new date object, but avoid invalid edge cases not caught by the default date constructor.
 */
export function serializeDate(value: any): Date | undefined {
    if (value === null || value === undefined) { return undefined }
    const date = new Date(value)
    const isDate = (date as any) !== 'Invalid Date' && !isNaN((date as any))
    return isDate ? date : undefined
}