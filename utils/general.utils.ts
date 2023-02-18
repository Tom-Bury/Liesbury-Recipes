export const enableKeys = (boolMap: Record<string, boolean>, keys: string[]): Record<string, boolean> => {
  const result = { ...boolMap }
  keys.forEach(key => {
    if (result[key] !== undefined) {
      result[key] = true
    }
  })
  return result
}
