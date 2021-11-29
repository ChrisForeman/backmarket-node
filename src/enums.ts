


export enum OrderState {
    awaitPayment = 'Awaiting Payment',
    awaitMerchant = 'Awaiting Merchant',
    awaitShipment = 'Awaiting Shipment',
    failed = 'Failed',
    shipped = 'Shipped',
    unknown = 'Unknown'
}

export enum OrderLineState {
    awaitPayment = 'Awaiting Payment',
    awaitMerchant = 'Awaiting Merchant',
    awaitShipment = 'Awaiting Shipment',
    inProgress = 'In Progress',
    cancelled = 'Cancelled',
    refundedPreShip = 'Refunded Pre-Shipment',
    refundedPostShip = 'Refunded Post-Shipment',
    unpaid = 'Unpaid',
    unknown = 'Unknown'

}

export enum CountryCode {
    France = 'fr-fr',
    Spain = 'es-es',
    Germany = 'de-de',
    Austria = 'de-at',
    Italy = 'it-it',
    UnitedKingdom = 'en-gb',
    Netherlands = 'nl-nl',
    UnitedStates = 'en-us'
}

export enum ErrorCode {
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    tooManyCalls = 429
}


export enum Gender {
    male = 'Male',
    female = 'Female',
    other = 'Other'
}


export enum PaymentMethod {
    card = 'CARD',
    paypal = 'PAYPAL'
}