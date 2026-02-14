export const ALPHABET = '23456789abcdefghjkmnpqrstuvwxyz'
export const PREFIX = 'n'
export const RANDOM_LENGTH = 6
export const CHECKSUM_LENGTH = 3
export const TOTAL_LENGTH = PREFIX.length + RANDOM_LENGTH + CHECKSUM_LENGTH // 10

/**
 * Quick format check without secret
 * Useful for distinguishing Pool IDs from wallet addresses
 * Works in both Node.js and browser environments
 */
export function isPoolIdFormat(id: string): boolean {
  if (!id || id.length !== TOTAL_LENGTH) return false
  id = id.toLowerCase()
  if (id[0] !== PREFIX) return false
  for (const char of id) {
    if (!ALPHABET.includes(char)) return false
  }
  return true
}
