import classNames from 'classnames'
import * as React from 'react'
import styles from './Button.module.css'

type TProps = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  circular?: boolean
  onPress?: () => void
}

const Button: React.FC<TProps> = ({ type, children, className, disabled, circular, onPress }) => {
  const classes = classNames(styles.button, className, circular ? 'rounded-full' : 'rounded-xl', 'rmMobileClickBox')
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type || 'button'} className={classes} disabled={disabled} onClick={onPress}>
      {children}
    </button>
  )
}

export default Button
