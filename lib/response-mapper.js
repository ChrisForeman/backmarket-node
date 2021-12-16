"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMapper = void 0;
const enums_1 = require("./enums");
const utils_1 = require("./utils");
class ResponseMapper {
    mapBuyBox(data) {
        return {
            productId: data.product,
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
    mapOrder(data) {
        return {
            id: data.order_id,
            shippingAddress: this.mapAddress(data.shipping_address),
            billingAddress: this.mapAddress(data.billing_address),
            deliveryNoteUrl: data.delivery_note,
            trackingNumber: data.tracking_number,
            trackingUrl: data.tracking_url,
            shipperDisplay: data.shipper,
            dateCreated: new Date(data.date_creation),
            dateModified: utils_1.serializeDate(data.date_modification),
            dateShipped: utils_1.serializeDate(data.date_shipping),
            datePaid: utils_1.serializeDate(data.date_payment),
            state: this.mapOrderState(data.state),
            total: Number(data.price),
            shippingTotal: Number(data.shipping_price),
            currency: data.currency,
            country: data.country_code,
            paypalRef: data.paypal_reference,
            installmentPayment: data.installment_payment,
            paymentMethod: data.payment_method,
            salesTax: data.sales_taxes,
            orderLines: data.orderlines.map((orderLine) => this.mapOrderLine(orderLine))
        };
    }
    mapOrderState(rawValue) {
        switch (rawValue) {
            case 0:
                return enums_1.OrderState.awaitPayment;
            case 1:
                return enums_1.OrderState.awaitMerchant;
            case 3:
                return enums_1.OrderState.awaitShipment;
            case 8:
                return enums_1.OrderState.failed;
            case 9:
                return enums_1.OrderState.shipped;
            default:
                return enums_1.OrderState.unknown;
        }
    }
    mapAddress(data) {
        return {
            company: data.company === '' ? undefined : data.company,
            firstName: data.first_name,
            lastName: data.last_name,
            gender: this.mapGender(data.gender),
            street: data.street,
            street2: data.street2 === '' ? undefined : data.street2,
            postalCode: data.postal_code,
            country: data.country,
            city: data.city,
            phone: data.phone,
            email: data.email === '' ? undefined : data.email
        };
    }
    mapGender(data) {
        switch (data) {
            case 0:
                return enums_1.Gender.male;
            case 1:
                return enums_1.Gender.female;
            default:
                return enums_1.Gender.other;
        }
    }
    mapOrderLine(data) {
        return {
            id: data.id,
            dateCreated: new Date(data.date_creation),
            state: this.mapOrderLineState(data.state),
            price: Number(data.price),
            shippingPrice: Number(data.shipping_price),
            shippingDelay: data.shipping_delay,
            currency: data.currency,
            returnReason: data.return_reason === '' ? undefined : data.return_reason,
            returnMessage: data.return_message === '' ? undefined : data.return_message,
            sku: data.listing,
            listingId: data.listing_id,
            productTitle: data.product,
            quantity: data.quantity,
            brand: data.brand,
            productId: data.product_id,
            hasBackCare: data.backcare,
            backCarePrice: data.backcare_price,
            salesTax: Number(data.sales_taxes),
            imei: data.imei === '' ? undefined : data.imei,
            serialNumber: data.serial_number === '' ? undefined : data.serial_number
        };
    }
    mapOrderLineState(rawValue) {
        switch (rawValue) {
            case 0:
                return enums_1.OrderLineState.awaitPayment;
            case 1:
                return enums_1.OrderLineState.awaitMerchant;
            case 2:
                return enums_1.OrderLineState.awaitShipment;
            case 3:
                return enums_1.OrderLineState.inProgress;
            case 4:
                return enums_1.OrderLineState.cancelled;
            case 5:
                return enums_1.OrderLineState.refundedPreShip;
            case 6:
                return enums_1.OrderLineState.refundedPostShip;
            case 7:
                return enums_1.OrderLineState.unpaid;
            default:
                return enums_1.OrderLineState.unknown;
        }
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
