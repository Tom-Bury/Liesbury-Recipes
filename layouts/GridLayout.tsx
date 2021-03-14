import classNames from 'classnames'
import * as React from 'react'

type TProps = {
  className?: string
}

const GridLayout: React.FC<TProps> = ({ children, className }) => {
  const classes = classNames(
    'grid gap-x-12 gap-y-8 place-items-center w-full max-w-screen-md xl:max-w-screen-xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    className
  )
  return <div className={classes}>{children}</div>
}

export default GridLayout
