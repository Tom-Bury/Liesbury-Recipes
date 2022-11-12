/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react'
import ListInput, { TListInputProps } from './ListInput.component'

type TRegularListItemProps = {
  onPress: () => void
}

const RegularListItem: React.FC<TRegularListItemProps> = ({ children, onPress }) => {
  const [isHover, setIsHovered] = useState(false)

  return (
    <div
      className="cursor-pointer inline-flex flex-row items-center rounded w-full bg-lightest shadow-inner px-2"
      onClick={onPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={`${children}`}
    >
      <p className={isHover ? 'line-through opacity-50' : ''}>{children}</p>
      <span className={isHover ? 'font-bold text-error ml-auto' : 'invisible'}>×</span>
    </div>
  )
}

type TRegularListInputProps = {
  items: string[] | undefined
  onRemove: (index: number) => void
} & TListInputProps

export const RegularListInput: React.FC<TRegularListInputProps> = props => {
  const { items, onRemove } = props
  return (
    <ListInput {...props}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-2">
        {items &&
          items.map((item, i) => {
            return <RegularListItem onPress={() => onRemove(i)}>{item}</RegularListItem>
          })}
      </div>
    </ListInput>
  )
}
