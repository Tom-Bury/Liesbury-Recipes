import classNames from 'classnames'
import * as React from 'react'
import styles from './Card.module.css'

type TProps = {
  className?: string
  hoverable?: boolean
}

const Card: React.FC<TProps> = ({ children, className, hoverable }) => {
  const classes = hoverable
    ? classNames(styles['card-base'], styles['card-hoverable'], className)
    : classNames(styles['card-base'], className)
  return <div className={classes}>{children}</div>
}

export default Card
