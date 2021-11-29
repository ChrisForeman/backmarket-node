import { BuyBoxData, Category, Order, OrderLineUpdateData } from "./types";
export interface BackMarketAPIInterface {
    getCategoryTree(): Promise<Category[]>;
    getBuyBoxDataRange(startPage: number, endPage?: number): Promise<{
        count: number;
        results: BuyBoxData[];
    }>;
    getBuyBoxData(page: number): Promise<{
        count: number;
        results: BuyBoxData[];
    }>;
    getOrder(orderId: number): Promise<Order>;
    updateOrderLine(orderLineId: number, data: OrderLineUpdateData): Promise<void>;
}
