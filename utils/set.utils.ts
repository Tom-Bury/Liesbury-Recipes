export function setFromLists<T>(...lists: Array<Array<T> | Set<T> | undefined>): Set<T> {
  return new Set(lists.reduce((prev, curr) => [...(prev || []), ...(curr || [])]))
}
