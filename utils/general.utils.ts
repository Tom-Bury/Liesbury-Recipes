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

export const listToMap = <T>(list: string[], defaultValue: T): Record<string, T> => {
  const result: Record<string, T> = {}
  list.forEach(item => {
    result[item] = defaultValue
  })
  return result
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const arraysHaveSameContents = (arr1: Array<unknown>, arr2: Array<unknown>): boolean => {
  if (arr1.length !== arr2.length) {
    return false
  }

  const sortedArr1 = arr1.slice().sort()
  const sortedArr2 = arr2.slice().sort()

  for (let i = 0; i < sortedArr1.length; i += 1) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false
    }
  }

  return true
}
