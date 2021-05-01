import { HorizontalCenterLayout } from 'layouts'
import { NextPage } from 'next'
import * as React from 'react'

const OfflinePage: NextPage = () => {
  return (
    <HorizontalCenterLayout className="h-screen justify-center">
      <h1 className="text-darkest mb-8">Geen internet</h1>
      <h3 className="text-primary">Verbind met het internet om verder te gaan</h3>
    </HorizontalCenterLayout>
  )
}

export default OfflinePage
