import { BuyBoxData, Order } from "./types";
export declare class ResponseMapper {
    mapBuyBox(data: any): BuyBoxData;
    mapOrder(data: any): Order;
    private mapOrderState;
    private mapAddress;
    private mapGender;
    private mapOrderLine;
    private mapOrderLineState;
    /**
   * This method formats an error from BackMarket so that it is error handling friendly.
   * @param err An axios response error
   * @returns A rejected Promise
   */
    mappErr(err: any): Error;
}
