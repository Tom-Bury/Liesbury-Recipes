import { useState } from 'react'

type TItemState = { [item: string]: boolean }

export const useSelectableItems = (
  items: TItemState | undefined
): {
  items: TItemState
  toggleItem: (item: string) => void
  disableAll: () => void
} => {
  const [itemsState, setItemsState] = useState(items || {})

  const toggleItem = (item: string) => {
    setItemsState(prevItemsState => {
      if (prevItemsState[item] !== undefined) {
        return { ...prevItemsState, [item]: !prevItemsState[item] }
      }
      return { ...prevItemsState }
    })
  }

  const disableAll = () => {
    setItemsState(prevItemsState => {
      const result: TItemState = {}
      Object.keys(prevItemsState).forEach(item => {
        result[item] = false
      })
      return result
    })
  }

  return { items: itemsState, toggleItem, disableAll }
}
