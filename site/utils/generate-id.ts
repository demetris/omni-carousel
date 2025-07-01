/**
 * Generates a random string ID with 8 characters
 * Uses base-36 representation (0-9 and a-z) of a random number.
 * 
 * @returns {string} An 8-character random alphanumeric string
 */
function generateID (): string {
  return Math.random().toString(36).slice(2, 10);
}

export { generateID };