export { isPoolIdFormat, ALPHABET, PREFIX, RANDOM_LENGTH, CHECKSUM_LENGTH, TOTAL_LENGTH } from './format';
/**
 * Generate a Pool ID
 * Format: n + 6 random + 3 checksum = 10 characters
 */
export declare function generate(secret: string): string;
/**
 * Validate a Pool ID (full check with HMAC)
 * Case-insensitive
 */
export declare function validate(id: string, secret: string): boolean;
