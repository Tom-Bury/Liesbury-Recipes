import classNames from 'classnames'
import * as React from 'react'
import styles from './Button.module.css'

type TProps = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onPress?: () => void
}

const Card: React.FC<TProps> = ({ type, children, className, disabled }) => {
  const classes = classNames(styles.button, className)
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type || 'button'} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}

export default Card
