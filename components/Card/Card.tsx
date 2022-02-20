import classNames from 'classnames'
import * as React from 'react'
import styles from './Card.module.css'

type TProps = {
  className?: string
  hoverable?: boolean
  gradient?: boolean
}

const Card: React.FC<TProps> = ({ children, className, hoverable, gradient }) => {
  const classes = [
    styles['card-base'],
    ...(hoverable ? [styles['card-hoverable']] : []),
    ...(gradient ? [styles['card-gradient']] : [styles['card-plain']]),
    className
  ]
  return <div className={classNames(classes)}>{children}</div>
}

export default Card
