import { CatalogFields } from './types'

export function getCatalogString(items: CatalogFields[], delimiter: string): string {
    const set = new Set<string>()
    const headings: string[] = Array.from(set)
    const catalogStr = ''

    items.forEach(item => {
        Object.keys(item).forEach(key => {
            set.add(key)
        })
    })
    items.forEach((item, i) => {
        let rowStr = ''
        headings.forEach(h => {
            const val = (item as any)[h]
            if (val !== undefined) {
                rowStr += `${val}${delimiter}`
            }
        })
        if (i < items.length - 1) {
            rowStr += '\n'
        }
    })
    return catalogStr
}