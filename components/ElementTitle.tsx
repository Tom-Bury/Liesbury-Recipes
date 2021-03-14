import classNames from 'classnames'
import * as React from 'react'

type TProps = {
  className?: string
}

const ElementTitle: React.FC<TProps> = ({ children, className }) => {
  const classes = classNames('text-xl text-dark md:text-2xl font-medium text-center', className)
  return <h3 className={classes}>{children}</h3>
}

export default ElementTitle
