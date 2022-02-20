/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react'
import { useCallback, useState } from 'react'
import Button from '../Button/Button'

type TListInputProps = {
  label: string
  id: string
  items?: string[]
  onAdd: (items: string) => void
  onRemove: (index: number) => void
}

type TListItemProps = {
  index: number
  onPress: (index: number) => void
}

const ListItem: React.FC<TListItemProps> = ({ children, index, onPress }) => {
  const [isHover, setIsHovered] = useState(false)

  return (
    <div
      className="cursor-pointer inline-flex flex-row items-center rounded w-full bg-lightest shadow-inner px-2"
      onClick={() => onPress(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={`${children}`}
    >
      <p className={isHover ? 'line-through opacity-50' : ''}>{children}</p>
      <span className={isHover ? 'font-bold text-error ml-auto' : 'invisible'}>×</span>
    </div>
  )
}

const ListInput: React.FC<TListInputProps> = ({ label, items, onAdd, onRemove }) => {
  const [newElement, setNewElement] = useState('')

  const handleNewElementInputChange = useCallback(
    async event => {
      const { value } = event.target
      setNewElement(value)
    },
    [setNewElement]
  )

  const onSubmitNewElement = useCallback(() => {
    if (newElement) {
      onAdd(newElement)
      setNewElement('')
    }
  }, [newElement, onAdd, setNewElement])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        onSubmitNewElement()
      }
    },
    [onSubmitNewElement]
  )

  return (
    <>
      <p className="font-semibold">{label}</p>
      <div className="flex flex-row">
        <input
          className="bg-lightest w-full md:w-1/2 px-2 py-1 rounded-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-2"
          value={newElement}
          type="text"
          onChange={handleNewElementInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="ml-2 h-8 w-8 rounded-full flex items-center justify-center font-semibold text-center"
          disabled={!newElement}
          onPress={onSubmitNewElement}
        >
          +
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-2">
        {items &&
          items.map((item, i) => {
            return (
              <ListItem index={i} onPress={() => onRemove(i)}>
                {item}
              </ListItem>
            )
          })}
      </div>
    </>
  )
}

export default ListInput
