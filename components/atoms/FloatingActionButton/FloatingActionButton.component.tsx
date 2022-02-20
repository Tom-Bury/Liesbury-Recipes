import classNames from 'classnames'
import * as React from 'react'
import Button from '../Button/Button'
import styles from './FloatingActionButton.module.css'

type TProps = {
  className?: string
  disabled?: boolean
  placement: 'left' | 'right'
  onPress?: () => void
}

const FloatingActionButton: React.FC<TProps> = props => {
  const { className, placement, ...otherProps } = props
  const placementClass = placement === 'left' ? styles['float-left'] : styles['float-right']
  const classes = classNames(
    className,
    placementClass,
    styles['fab-shadow'],
    'w-16 h-16 flex items-center justify-center border-4 border-dark fixed bottom-0 mb-4 z-50'
  )
  return <Button className={classes} {...otherProps} circular />
}

export default FloatingActionButton
