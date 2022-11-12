import React, { useEffect, useState } from 'react'
import { PillButton } from '../PillButton/PillButton.component'
import ListInput, { TListInputProps } from './ListInput.component'

type TPillButtonListInputProps = {
  items: Set<string> | undefined
  onRemove: (item: string) => void
} & TListInputProps

export const PillButtonListInput: React.FC<TPillButtonListInputProps> = props => {
  const { items, onRemove, onAdd } = props
  const [allItems, setAllItems] = useState(new Set(items))

  useEffect(() => {
    setAllItems(prevAllItems => new Set([...prevAllItems, ...(items || [])]))
  }, [items])

  return (
    <ListInput {...props}>
      <div className="flex flex-row mt-4">
        {items &&
          allItems &&
          [...allItems].map(item => {
            const included = items.has(item)
            return (
              <PillButton
                key={item}
                toggleValue={included}
                capitalize
                onClick={() => (included ? onRemove(item) : onAdd(item))}
                className="mr-2"
              >
                {item}
              </PillButton>
            )
          })}
      </div>
    </ListInput>
  )
}
