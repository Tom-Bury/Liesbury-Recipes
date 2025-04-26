import * as React from 'react'
import Image from "next/legacy/image"
import classNames from 'classnames'

const FRONT_IMAGE_DIMENSIONS = {
  width: 250,
  height: 160
}
const FRONT_IMAGE_SCALE = 0.5

type TProps = {
  width?: number
  height?: number
  className?: string
}

const Loading: React.FC<TProps> = ({ width, height, className }) => (
  <div className={classNames(className, 'animate-bounce')}>
    <Image
      src="/images/liesbury-recipes-colored.svg"
      alt="Liesbury's receptenlijst"
      width={width || FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.width}
      height={height || FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.height}
    />
  </div>
)

export default Loading
