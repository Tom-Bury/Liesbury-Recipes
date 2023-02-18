// Source: https://stackoverflow.com/questions/47632622/typescript-and-filter-boolean

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
