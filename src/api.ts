import { Language, BuyBoxPage, CatalogFields } from "./common/types"
import axios from 'axios'
import { getCatalogString } from "./common/utils"


export class BackMarketAPI {

    /**
     * The root endpoint of the api.
     */
    private rootEndpoint: string

    /**
     * Headers that will be used in each request, since each request requires the same headers.
     */
    private headers: Record<string, string>

    constructor(
        websiteURL: string,
        language: Language,
        userAgent: string,
        accessToken: string
    ) {
        this.rootEndpoint = websiteURL
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': language,
            'Authorization': `Basic ${accessToken}`,
            'User-Agent': userAgent
        }
    }


    getBuyBoxData(page: number): Promise<BuyBoxPage> {
        return axios.get(
            `${this.rootEndpoint}/ws/listings_bi/?page=${page}`,
            { headers: this.headers }
        ).then(resp => {
            return resp.data as BuyBoxPage
        })
    }


    updateListingBulk(fields: CatalogFields[]): Promise<void> {
        const delimiter = ';'
        return axios.post(
            `${this.rootEndpoint}/ws/listings`,
            {
                'encoding': 'latin1',
                'delimiter': delimiter,
                'quotechar': '"',
                'header': true,
                'catalog': getCatalogString(fields, delimiter)
            },
            {
                headers: this.headers
            }
        ).then(() => { return })
    }



}