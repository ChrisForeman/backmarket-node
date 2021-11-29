import { BuyBoxData } from "./types";
export declare class ResponseMapper {
    mapBuyBox(data: any): BuyBoxData;
    /**
   * This method formats an error from BackMarket so that it is error handling friendly.
   * @param err An axios response error
   * @returns A rejected Promise
   */
    mappErr(err: any): Error;
}
