export declare const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
export declare const PREFIX = "n";
export declare const RANDOM_LENGTH = 6;
export declare const CHECKSUM_LENGTH = 3;
export declare const TOTAL_LENGTH: number;
/**
 * Quick format check without secret
 * Useful for distinguishing Pool IDs from wallet addresses
 * Works in both Node.js and browser environments
 */
export declare function isPoolIdFormat(id: string): boolean;
