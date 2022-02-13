import { HorizontalCenterLayout } from 'layouts'
import * as React from 'react'
import Loading from './Loading'

const RecipePlaceholder: React.FC = () => {
  return (
    <HorizontalCenterLayout className="pt-12 justify-center">
      <Loading className="py-8" />
      <h3 className="text-dark">Aan het laden...</h3>
    </HorizontalCenterLayout>
  )
}

export default RecipePlaceholder
