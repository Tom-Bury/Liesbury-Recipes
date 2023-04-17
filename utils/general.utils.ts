export const enableKeys = (boolMap: Record<string, boolean>, keys: string[]): Record<string, boolean> => {
  const result = { ...boolMap }
  keys.forEach(key => {
    if (result[key] !== undefined) {
      result[key] = true
    }
  })
  return result
}

export const capitalize = (str: string): string => {
  if (str.length === 0) return str

  return str.charAt(0).toUpperCase() + str.slice(1)
}
