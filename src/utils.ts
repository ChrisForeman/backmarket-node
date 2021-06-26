import { CatalogFields } from './types'

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