import * as React from 'react'
import classNames from 'classnames'

type TProps = {
  className: string
}

const PageTitle: React.FC<TProps> = ({ children, className }) => {
  const classes = classNames('text-4xl font-title text-darkest sm:text-5xl font-medium text-center', className)
  return <h1 className={classes}>{children}</h1>
}

export default PageTitle
