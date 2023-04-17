import classNames from 'classnames'
import React from 'react'
import styles from './PillButton.module.css'

type TPillProps = {
  className?: string
  toggleValue?: boolean
  onClick?: () => void
  children: string
}

const PillButtonCommon: React.FC<TPillProps> = ({ className, onClick, children }) => {
  const classes = classNames(styles.buttonCommon, onClick ? styles.pillButton : styles.pillOnly, className)

  return (
    <button className={classes} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export const PillButton: React.FC<TPillProps> = ({ className, toggleValue, ...props }) => {
  const classes = classNames(toggleValue ? styles.buttonOn : styles.buttonOff, className)

  return <PillButtonCommon className={classes} {...props} />
}

export const ErrorPillButton: React.FC<TPillProps> = ({ className, toggleValue, ...props }) => {
  const classes = classNames(toggleValue ? styles.buttonOnError : styles.buttonOffError, className)

  return <PillButtonCommon className={classes} {...props} />
}
