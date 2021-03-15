import { HorizontalCenterLayout } from 'layouts'
import * as React from 'react'
import Image from 'next/image'
import PageTitle from './PageTitle'

const FRONT_IMAGE_DIMENSIONS = {
  width: 250,
  height: 160
}
const FRONT_IMAGE_SCALE = 1.5
const PAGE_TITLE = `Liesbury's receptenlijst`

const Banner: React.FC = () => (
  <HorizontalCenterLayout className="mt-3">
    <Image
      src="/images/liesbury-recipes-colored.svg"
      alt="Liesbury's receptenlijst"
      className="cursor-pointer"
      width={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.width}
      height={FRONT_IMAGE_SCALE * FRONT_IMAGE_DIMENSIONS.height}
      onClick={() => window.location.reload()}
    />
    <PageTitle className="mt-4">{PAGE_TITLE}</PageTitle>
  </HorizontalCenterLayout>
)

export default Banner
