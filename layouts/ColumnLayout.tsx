import * as React from 'react'

interface TProps {
  classNames?: string
}

const defaultProps: TProps = {
  classNames: ''
}

const ColumnLayout: React.FC<TProps> = ({ children, classNames }) => {
  const baseClasses = 'mx-auto px-4'
  return <div className={`${baseClasses} ${classNames}`}>{children}</div>
}

ColumnLayout.defaultProps = defaultProps

export default ColumnLayout
