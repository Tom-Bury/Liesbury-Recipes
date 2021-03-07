import * as React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { ColumnLayout, HorizontalCenterLayout } from 'layouts'
import { Title } from '../components'

const IndexPage: NextPage = () => (
  <ColumnLayout>
    <HorizontalCenterLayout classNames="pt-4 md:pt-8 pb-8 md:pb-12">
      <Image src="/images/food.jpg" alt="Some food" width={500} height={350} />
      <Title>Liesbury's recepentlijst</Title>
    </HorizontalCenterLayout>
    <h2>This is the subtitle</h2>
    <p>Some text</p>
  </ColumnLayout>
)

export default IndexPage
