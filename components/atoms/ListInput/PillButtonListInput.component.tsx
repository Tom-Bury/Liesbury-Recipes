import React, { useEffect, useState } from 'react'
import { setFromLists } from '~/utils/set.utils'
import { PillButton } from '../PillButton/PillButton.component'
import ListInput, { TListInputProps } from './ListInput.component'

type TPillButtonListInputProps = {
  enabledItems?: Set<string>
  extraItems?: Set<string>
  onRemove: (item: string) => void
} & TListInputProps

export const PillButtonListInput: React.FC<TPillButtonListInputProps> = props => {
  const { enabledItems, extraItems, onRemove, onAdd } = props
  const [allItems, setAllItems] = useState(setFromLists(enabledItems, extraItems))

  useEffect(() => {
    setAllItems(prevAllItems => setFromLists(prevAllItems, enabledItems, extraItems))
  }, [enabledItems, extraItems])

  return (
    <ListInput {...props}>
      <div className="flex flex-row flex-wrap mt-4 gap-y-1">
        {allItems &&
          [...allItems].map(item => {
            const included = enabledItems?.has(item)
            return (
              <PillButton key={item} toggleValue={included} onClick={() => (included ? onRemove(item) : onAdd(item))} className="mr-2">
                {item}
              </PillButton>
            )
          })}
      </div>
    </ListInput>
  )
}
