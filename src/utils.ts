export function getRandom(arr, n) {
  let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

/**
 *
 * @param min inclusive
 * @param max exclusive
 */
export const rand = (min: number, max: number) => Math.random() * (max - min) + min;

