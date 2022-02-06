import classNames from 'classnames'
import * as React from 'react'
import Button from '../Button/Button'

type TProps = {
  className?: string
  disabled?: boolean
  onPress?: () => void
}

const CircularButton: React.FC<TProps> = props => {
  const { className, ...otherProps } = props
  const classes = classNames(className, 'w-16 h-16 hardShadow flex items-center justify-center border-4 border-dark')
  return <Button className={classes} {...otherProps} circular />
}

export default CircularButton
