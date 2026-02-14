"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOTAL_LENGTH = exports.CHECKSUM_LENGTH = exports.RANDOM_LENGTH = exports.PREFIX = exports.ALPHABET = void 0;
exports.isPoolIdFormat = isPoolIdFormat;
exports.ALPHABET = '23456789abcdefghjkmnpqrstuvwxyz';
exports.PREFIX = 'n';
exports.RANDOM_LENGTH = 6;
exports.CHECKSUM_LENGTH = 3;
exports.TOTAL_LENGTH = exports.PREFIX.length + exports.RANDOM_LENGTH + exports.CHECKSUM_LENGTH; // 10
/**
 * Quick format check without secret
 * Useful for distinguishing Pool IDs from wallet addresses
 * Works in both Node.js and browser environments
 */
function isPoolIdFormat(id) {
    if (!id || id.length !== exports.TOTAL_LENGTH)
        return false;
    id = id.toLowerCase();
    if (id[0] !== exports.PREFIX)
        return false;
    for (const char of id) {
        if (!exports.ALPHABET.includes(char))
            return false;
    }
    return true;
}
