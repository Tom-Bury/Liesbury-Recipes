import * as React from 'react'
import Image from 'next/image'

const FRONT_IMAGE_DIMENSIONS = {
  width: 250,
  height: 160
}
const FRONT_IMAGE_SCALE = 0.5

const Loading: React.FC = () => (
  <div className="py-8 animate-bounce">
    <Image
      src="/images/liesbury-recipes-colored.svg"
      alt="Liesbury's receptenlijst"
      width={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.width}
      height={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.height}
    />
  </div>
)

export default Loading
