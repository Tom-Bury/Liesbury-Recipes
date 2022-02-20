import * as React from 'react'

type TInputProps = {
  id: string
  value?: string
  label?: string
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const Input: React.FC<TInputProps> = ({ label, value, id, type, onChange, onBlur }) => {
  return (
    <label htmlFor={id}>
      {label && <p className="font-semibold">{label}</p>}
      <input
        className="px-2 w-full py-1 bg-lightest shadow-inner truncate rounded-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-2"
        id={id}
        value={value}
        name={id}
        type={type || 'text'}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  )
}

export default Input
