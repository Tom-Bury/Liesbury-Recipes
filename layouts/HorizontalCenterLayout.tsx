import * as React from 'react'

interface TProps {
  classNames?: string
}

const defaultProps: TProps = {
  classNames: ''
}

const HorizontalCenterLayout: React.FC<TProps> = ({ children, classNames }) => {
  const baseClasses = 'flex flex-col items-center'
  return <div className={`${baseClasses} ${classNames}`}>{children}</div>
}

HorizontalCenterLayout.defaultProps = defaultProps

export default HorizontalCenterLayout
