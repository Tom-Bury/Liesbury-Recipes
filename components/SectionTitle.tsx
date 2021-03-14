import * as React from 'react'
import classNames from 'classnames'

type TProps = {
  className?: string
}

const SectionTitle: React.FC<TProps> = ({ children, className }) => {
  const classes = classNames('text-3xl font-title text-darkest sm:text-4xl font-medium text-center', className)
  return <h2 className={classes}>{children}</h2>
}

export default SectionTitle
