import { useState } from 'react'

type TItemState = { [item: string]: boolean }

export const useSelectableItems = (
  items: TItemState | undefined
): {
  items: TItemState
  toggleItem: (item: string) => void
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
  return { items: itemsState, toggleItem }
}
