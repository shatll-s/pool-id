"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOTAL_LENGTH = exports.CHECKSUM_LENGTH = exports.RANDOM_LENGTH = exports.PREFIX = exports.ALPHABET = exports.isPoolIdFormat = void 0;
exports.generate = generate;
exports.validate = validate;
const crypto_1 = __importDefault(require("crypto"));
const format_1 = require("./format");
var format_2 = require("./format");
Object.defineProperty(exports, "isPoolIdFormat", { enumerable: true, get: function () { return format_2.isPoolIdFormat; } });
Object.defineProperty(exports, "ALPHABET", { enumerable: true, get: function () { return format_2.ALPHABET; } });
Object.defineProperty(exports, "PREFIX", { enumerable: true, get: function () { return format_2.PREFIX; } });
Object.defineProperty(exports, "RANDOM_LENGTH", { enumerable: true, get: function () { return format_2.RANDOM_LENGTH; } });
Object.defineProperty(exports, "CHECKSUM_LENGTH", { enumerable: true, get: function () { return format_2.CHECKSUM_LENGTH; } });
Object.defineProperty(exports, "TOTAL_LENGTH", { enumerable: true, get: function () { return format_2.TOTAL_LENGTH; } });
/**
 * Generate a Pool ID
 * Format: n + 6 random + 3 checksum = 10 characters
 */
function generate(secret) {
    let id = format_1.PREFIX;
    for (let i = 0; i < format_1.RANDOM_LENGTH; i++) {
        id += format_1.ALPHABET[crypto_1.default.randomInt(format_1.ALPHABET.length)];
    }
    const hash = crypto_1.default.createHmac('sha256', secret).update(id).digest();
    for (let i = 0; i < format_1.CHECKSUM_LENGTH; i++) {
        id += format_1.ALPHABET[hash[i] % format_1.ALPHABET.length];
    }
    return id;
}
/**
 * Validate a Pool ID (full check with HMAC)
 * Case-insensitive
 */
function validate(id, secret) {
    const { isPoolIdFormat } = require('./format');
    if (!isPoolIdFormat(id))
        return false;
    id = id.toLowerCase();
    const base = id.slice(0, format_1.PREFIX.length + format_1.RANDOM_LENGTH);
    const checksum = id.slice(format_1.PREFIX.length + format_1.RANDOM_LENGTH);
    const hash = crypto_1.default.createHmac('sha256', secret).update(base).digest();
    for (let i = 0; i < format_1.CHECKSUM_LENGTH; i++) {
        if (format_1.ALPHABET[hash[i] % format_1.ALPHABET.length] !== checksum[i]) {
            return false;
        }
    }
    return true;
}
