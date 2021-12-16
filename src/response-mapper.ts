import { Gender, OrderLineState, OrderState } from "./enums"
import { BuyBoxData, Order, Address, OrderLine } from "./types"
import { serializeDate } from "./utils"


export class ResponseMapper {

    mapBuyBox(data: any): BuyBoxData {
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
        }
    }

    mapOrder(data: any): Order {
        return {
            id: data.order_id,
            shippingAddress: this.mapAddress(data.shipping_address),
            billingAddress: this.mapAddress(data.billing_address),
            deliveryNoteUrl: data.delivery_note,
            trackingNumber: data.tracking_number,
            trackingUrl: data.tracking_url,
            shipperDisplay: data.shipper,
            dateCreated: new Date(data.date_creation),
            dateModified: serializeDate(data.date_modification),
            dateShipped: serializeDate(data.date_shipping),
            datePaid: serializeDate(data.date_payment),
            state: this.mapOrderState(data.state),
            total: Number(data.price),
            shippingTotal: Number(data.shipping_price),
            currency: data.currency,
            country: data.country_code,
            paypalRef: data.paypal_reference,
            installmentPayment: data.installment_payment,
            paymentMethod: data.payment_method,
            salesTax: data.sales_taxes,
            orderLines: data.orderlines.map((orderLine: any) => this.mapOrderLine(orderLine))
        }
    }

    private mapOrderState(rawValue: number): OrderState {
        switch (rawValue) {
            case 0:
                return OrderState.awaitPayment
            case 1:
                return OrderState.awaitMerchant
            case 3:
                return OrderState.awaitShipment
            case 8:
                return OrderState.failed
            case 9:
                return OrderState.shipped
            default:
                return OrderState.unknown
        }
    }

    private mapAddress(data: any): Address {
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
        }
    }

    private mapGender(data: number): Gender {
        switch (data) {
            case 0:
                return Gender.male
            case 1:
                return Gender.female
            default:
                return Gender.other
        }
    }

    private mapOrderLine(data: any): OrderLine {
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
        }
    }

    private mapOrderLineState(rawValue: number): OrderLineState {
        switch (rawValue) {
            case 0:
                return OrderLineState.awaitPayment
            case 1:
                return OrderLineState.awaitMerchant
            case 2:
                return OrderLineState.awaitShipment
            case 3:
                return OrderLineState.inProgress
            case 4:
                return OrderLineState.cancelled
            case 5:
                return OrderLineState.refundedPreShip
            case 6:
                return OrderLineState.refundedPostShip
            case 7:
                return OrderLineState.unpaid
            default:
                return OrderLineState.unknown
        }
    }

    /**
   * This method formats an error from BackMarket so that it is error handling friendly.
   * @param err An axios response error
   * @returns A rejected Promise
   */
    mappErr(err: any): Error {
        const hasStatusCode = typeof err.response.status === 'number'
        const hasStatusText = typeof err.response.statusText === 'string'
        if (hasStatusCode && hasStatusText) {
            const error: any = new Error(err.response.statusText)
            error.code = err.response.status
            return error
        } else {
            return err
        }
    }


}