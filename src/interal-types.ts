


export interface BuyBoxPageResponse {
    count: number
    next?: string
    previous?: string
    results: RawBuyBoxListing[]
}

export interface RawBuyBoxListing {
    product: number
    sku: string,
    quantity: number
    price: string
    buybox: boolean
    price_for_buybox: number
    currency: string
    condition: number
}

export interface CatalogFields {
    backmarket_id?: number
    ean?: string
    sku: string
    quantity?: number
    price?: number
    state?: number
    warranty_delay?: number
    comment?: string
    currency?: string
    shipper_1?: string
    shipping_price_1?: number
    shipping_delay_1?: number
    shipper_2?: string
    shipping_price_2?: number
    shipping_delay_2?: number
    shipper_3?: string
    shipping_price_3?: number
    shipping_delay_3?: number
    snowden?: boolean
    noisy_camera?: boolean
    images?: string[]
}