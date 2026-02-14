import crypto from 'crypto'
import { ALPHABET, PREFIX, RANDOM_LENGTH, CHECKSUM_LENGTH } from './format'

export { isPoolIdFormat, ALPHABET, PREFIX, RANDOM_LENGTH, CHECKSUM_LENGTH, TOTAL_LENGTH } from './format'

/**
 * Generate a Pool ID
 * Format: n + 6 random + 3 checksum = 10 characters
 */
export function generate(secret: string): string {
  let id = PREFIX
  for (let i = 0; i < RANDOM_LENGTH; i++) {
    id += ALPHABET[crypto.randomInt(ALPHABET.length)]
  }

  const hash = crypto.createHmac('sha256', secret).update(id).digest()
  for (let i = 0; i < CHECKSUM_LENGTH; i++) {
    id += ALPHABET[hash[i] % ALPHABET.length]
  }

  return id
}

/**
 * Validate a Pool ID (full check with HMAC)
 * Case-insensitive
 */
export function validate(id: string, secret: string): boolean {
  const { isPoolIdFormat } = require('./format')
  if (!isPoolIdFormat(id)) return false
  id = id.toLowerCase()

  const base = id.slice(0, PREFIX.length + RANDOM_LENGTH)
  const checksum = id.slice(PREFIX.length + RANDOM_LENGTH)

  const hash = crypto.createHmac('sha256', secret).update(base).digest()
  for (let i = 0; i < CHECKSUM_LENGTH; i++) {
    if (ALPHABET[hash[i] % ALPHABET.length] !== checksum[i]) {
      return false
    }
  }

  return true
}
