import classNames from 'classnames'
import React from 'react'
import styles from './PillButton.module.css'

type TPillProps = {
  className?: string
  toggleValue?: boolean
  capitalize?: boolean
  onClick?: () => void
  children: string
}

export const PillButton: React.FC<TPillProps> = ({ className, toggleValue, onClick, children }) => {
  const classes = classNames(
    styles.buttonCommon,
    toggleValue ? styles.buttonOn : styles.buttonOff,
    onClick ? styles.pillButton : styles.pillOnly,
    className
  )

  return (
    <button className={classes} type="button" onClick={onClick}>
      {children.length > 0 ? `${children[0].toUpperCase()}${children.slice(1).toLowerCase()}` : children}
    </button>
  )
}
