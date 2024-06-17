import classNames from 'classnames'
import * as React from 'react'
import { PropsWithChildren, forwardRef } from 'react'

interface TProps {
  className?: string
  id?: string
}

const HorizontalCenterLayout = forwardRef<HTMLDivElement, PropsWithChildren<TProps>>(({ children, className, id }, ref) => {
  const classes = classNames('flex flex-col items-center', className)
  return (
    <div ref={ref} id={id} className={classes}>
      {children}
    </div>
  )
})

export default HorizontalCenterLayout
