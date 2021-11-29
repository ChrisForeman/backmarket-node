"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMapper = void 0;
class ResponseMapper {
    mapBuyBox(data) {
        return {
            productId: `${data.product}`,
            sku: data.sku,
            quantity: data.quantity,
            price: Number(data.price),
            hasBuyBox: data.buybox,
            priceForBuyBox: data.price_for_buybox,
            currency: data.currency,
            condition: data.condition,
            sameMerchantWinner: data.same_merchant_winner
        };
    }
    /**
   * This method formats an error from BackMarket so that it is error handling friendly.
   * @param err An axios response error
   * @returns A rejected Promise
   */
    mappErr(err) {
        const hasStatusCode = typeof err.response.status === 'number';
        const hasStatusText = typeof err.response.statusText === 'string';
        if (hasStatusCode && hasStatusText) {
            const error = new Error(err.response.statusText);
            error.code = err.response.status;
            return error;
        }
        else {
            return err;
        }
    }
}
exports.ResponseMapper = ResponseMapper;
