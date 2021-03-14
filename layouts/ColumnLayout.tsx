import * as React from 'react'
import classNames from 'classnames'

interface TProps {
  className?: string
}

const ColumnLayout: React.FC<TProps> = ({ children, className }) => {
  const classes = classNames('mx-auto px-4', className)
  return <div className={classes}>{children}</div>
}

export default ColumnLayout
