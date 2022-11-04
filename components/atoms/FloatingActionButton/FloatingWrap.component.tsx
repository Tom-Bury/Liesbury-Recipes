import classNames from 'classnames'
import * as React from 'react'
import styles from './FloatingActionButton.module.css'

type TProps = {
  className?: string
  placement: 'left' | 'right'
}

const FloatingWrap: React.FC<TProps> = props => {
  const { className, placement, children } = props
  const placementClass = placement === 'left' ? styles['float-left'] : styles['float-right']
  const classes = classNames(className, placementClass, 'z-50 fixed bottom-0 mb-4')

  return <div className={classes}>{children}</div>
}

export default FloatingWrap
