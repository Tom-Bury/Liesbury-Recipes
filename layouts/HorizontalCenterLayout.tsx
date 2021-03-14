import classNames from 'classnames'
import * as React from 'react'

interface TProps {
  className?: string
}

const HorizontalCenterLayout: React.FC<TProps> = ({ children, className }) => {
  const classes = classNames('flex flex-col items-center', className)
  return <div className={classes}>{children}</div>
}

export default HorizontalCenterLayout
