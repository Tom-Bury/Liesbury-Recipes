import classNames from 'classnames'
import * as React from 'react'

type TProps = {
  className: string
}

const Card: React.FC<TProps> = ({ children, className }) => {
  const classes = classNames('m-4 rounded-xl shadow bg-light', className)
  return <div className={classes}>{children}</div>
}

export default Card
