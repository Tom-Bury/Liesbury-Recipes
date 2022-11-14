import * as React from 'react'
import { useCallback, useState } from 'react'
import Button from '../Button/Button'

export type TListInputProps = {
  id: string
  label: string
  onAdd: (item: string) => void
}

const ListInput: React.FC<TListInputProps> = ({ label, onAdd, children }) => {
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
      {children}
    </>
  )
}

export default ListInput
