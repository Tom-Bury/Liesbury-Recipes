import { HorizontalCenterLayout } from 'layouts'
import * as React from 'react'
import Image from 'next/image'

const FRONT_IMAGE_DIMENSIONS = {
  width: 250,
  height: 160
}
const FRONT_IMAGE_SCALE = 1.5
const PAGE_TITLE = `Liesbury's receptenlijst`

type TBannerProps = {
  onClick?: () => void
}

const Banner: React.FC<TBannerProps> = ({ onClick }) => {
  return (
    <HorizontalCenterLayout className="mt-3">
      <Image
        src="/images/liesbury-recipes-banner.webp"
        alt="Liesbury's receptenlijst"
        className="cursor-pointer"
        width={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.width}
        height={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.height}
        onClick={onClick}
        priority
      />
      <h1 className="mt-4 text-darkest text-center">{PAGE_TITLE}</h1>
    </HorizontalCenterLayout>
  )
}

export default Banner
