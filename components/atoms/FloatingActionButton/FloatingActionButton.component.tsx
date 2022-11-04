import classNames from 'classnames'
import * as React from 'react'
import Button from '../Button/Button'
import styles from './FloatingActionButton.module.css'

type TProps = {
  className?: string
  disabled?: boolean
  error?: boolean
  size?: 's' | 'm'
  onPress?: () => void
}

const FloatingActionButton: React.FC<TProps> = props => {
  const { className, error, size, ...otherProps } = props
  const classes = classNames(
    className,
    styles['fab-shadow'],
    'flex items-center justify-center border-4',
    size === undefined || size === 'm' ? 'w-16 h-16' : 'w-14 h-14',
    error ? 'border-error-dark' : 'border-dark'
  )
  return <Button className={classes} {...otherProps} circular error={Boolean(error)} />
}

export default FloatingActionButton
