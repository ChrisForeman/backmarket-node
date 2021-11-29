"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = exports.Gender = exports.ErrorCode = exports.CountryCode = exports.OrderLineState = exports.OrderState = void 0;
var OrderState;
(function (OrderState) {
    OrderState["awaitPayment"] = "Awaiting Payment";
    OrderState["awaitMerchant"] = "Awaiting Merchant";
    OrderState["awaitShipment"] = "Awaiting Shipment";
    OrderState["failed"] = "Failed";
    OrderState["shipped"] = "Shipped";
    OrderState["unknown"] = "Unknown";
})(OrderState = exports.OrderState || (exports.OrderState = {}));
var OrderLineState;
(function (OrderLineState) {
    OrderLineState["awaitPayment"] = "Awaiting Payment";
    OrderLineState["awaitMerchant"] = "Awaiting Merchant";
    OrderLineState["awaitShipment"] = "Awaiting Shipment";
    OrderLineState["inProgress"] = "In Progress";
    OrderLineState["cancelled"] = "Cancelled";
    OrderLineState["refundedPreShip"] = "Refunded Pre-Shipment";
    OrderLineState["refundedPostShip"] = "Refunded Post-Shipment";
    OrderLineState["unpaid"] = "Unpaid";
    OrderLineState["unknown"] = "Unknown";
})(OrderLineState = exports.OrderLineState || (exports.OrderLineState = {}));
var CountryCode;
(function (CountryCode) {
    CountryCode["France"] = "fr-fr";
    CountryCode["Spain"] = "es-es";
    CountryCode["Germany"] = "de-de";
    CountryCode["Austria"] = "de-at";
    CountryCode["Italy"] = "it-it";
    CountryCode["UnitedKingdom"] = "en-gb";
    CountryCode["Netherlands"] = "nl-nl";
    CountryCode["UnitedStates"] = "en-us";
})(CountryCode = exports.CountryCode || (exports.CountryCode = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["badRequest"] = 400] = "badRequest";
    ErrorCode[ErrorCode["unauthorized"] = 401] = "unauthorized";
    ErrorCode[ErrorCode["forbidden"] = 403] = "forbidden";
    ErrorCode[ErrorCode["notFound"] = 404] = "notFound";
    ErrorCode[ErrorCode["tooManyCalls"] = 429] = "tooManyCalls";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var Gender;
(function (Gender) {
    Gender["male"] = "Male";
    Gender["female"] = "Female";
    Gender["other"] = "Other";
})(Gender = exports.Gender || (exports.Gender = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["card"] = "CARD";
    PaymentMethod["paypal"] = "PAYPAL";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
