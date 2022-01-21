import * as React from 'react'

type TInputProps = {
  id: string
  label?: string
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const Input: React.FC<TInputProps> = ({ label, id, type, onChange, onBlur }) => {
  return (
    <label htmlFor={id}>
      {label && <p>{label}</p>}
      <input
        className="px-2 w-full py-1 bg-lightest truncate rounded-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-2"
        id={id}
        name={id}
        type={type || 'text'}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  )
}

export default Input
