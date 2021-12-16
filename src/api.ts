import { BackMarketAPIInterface } from "./api-interface"
import * as axios from 'axios'
import { CountryCode } from "./enums"
import { BuyBoxData, Category, Order, OrderLineUpdateData } from "./types"
import { ResponseMapper } from "./response-mapper"
import { indexArray } from "./utils"


export class BackMarketAPI implements BackMarketAPIInterface {

    /**
     * The root endpoint of the api.
     */
    private rootEndpoint: string

    /**
     * Headers that will be used in each request, since each request requires the same headers.
     */
    private headers: Record<string, string>

    private mapper: ResponseMapper

    constructor(
        websiteURL: string,
        countryCode: CountryCode,
        userAgent: string,
        accessToken: string
    ) {
        this.rootEndpoint = websiteURL
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': countryCode,
            'Authorization': `Basic ${accessToken}`,
            'User-Agent': userAgent
        }
        this.mapper = new ResponseMapper()
    }

    getCategoryTree(): Promise<Category[]> {
        return axios.default.get(
            `${this.rootEndpoint}/category/tree`,
            { headers: this.headers }
        ).then(res => {
            return res.data as Category[]
        })
    }

    async getBuyBoxDataRange(startPage: number, endPage?: number): Promise<{ count: number, results: BuyBoxData[] }> {
        if (endPage === undefined) {
            const firstPage = await this.getBuyBoxData(startPage)
            const pageSize = 10
            const newStartPage = startPage + 1
            const newEndPage = Math.trunc(firstPage.count / pageSize) + 1
            const pageNums = indexArray(newStartPage, newEndPage - newStartPage + 1)
            const buyBoxPages = await Promise.all(pageNums.map(page => this.getBuyBoxData(page)))
            return this.condenseBuyBoxPages(buyBoxPages)
        } else {
            if (startPage < endPage) {
                throw new Error('End page cannot be less than start page.')
            }
            const pageNums = indexArray(startPage, endPage - startPage + 1)
            const buyBoxPages = await Promise.all(pageNums.map(page => this.getBuyBoxData(page)))
            return this.condenseBuyBoxPages(buyBoxPages)
        }
    }

    private condenseBuyBoxPages(pages: { count: number, results: BuyBoxData[] }[]): { count: number, results: BuyBoxData[] } {
        let count = 0
        const results: BuyBoxData[] = []

        pages.forEach(page => {
            count = page.count
            page.results.forEach(pageResult => {
                results.push(pageResult)
            })
        })
        return {
            count: count,
            results: results
        }
    }

    getBuyBoxData(page: number): Promise<{ count: number, results: BuyBoxData[] }> {
        return axios.default.get(
            `${this.rootEndpoint}/ws/listings_bi/?page=${page}`,
            { headers: this.headers }
        ).then(res => {
            return {
                count: res.data.count,
                results: res.data.results.map((buybox: any) => this.mapper.mapBuyBox(buybox))
            }
        }).catch(err => {
            throw this.mapper.mappErr(err)
        })
    }

    async updateOrderLine(orderLineId: number, data: OrderLineUpdateData): Promise<void> {
        await axios.default.patch(
            `${this.rootEndpoint}/ws/orderlines/${orderLineId}`,
            data,
            { headers: this.headers }
        )
    }

    getOrder(orderId: number): Promise<Order> {
        return axios.default.get(
            `${this.rootEndpoint}/ws/order/${orderId}`,
            { headers: this.headers }
        ).then(res => {
            return this.mapper.mapOrder(res.data)
        })
    }


}