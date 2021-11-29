"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.CountryCode = void 0;
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
