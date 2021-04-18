import { HorizontalCenterLayout } from 'layouts'
import { NextPage } from 'next'
import * as React from 'react'

const OfflinePage: NextPage = () => {
  return (
    <HorizontalCenterLayout className="h-screen justify-center">
      <h1 className="text-darkest mb-8">You're offline...</h1>
      <h3 className="text-primary">Please connect to the internet to continue</h3>
    </HorizontalCenterLayout>
  )
}

export default OfflinePage
