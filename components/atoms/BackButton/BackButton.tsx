import { useRouter } from 'next/router'
import * as React from 'react'
import Image from 'next/image'
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton.component'

const canGoBack = (path: string) => {
  return path !== '/' && path !== ''
}

const BackButton: React.FC = () => {
  const router = useRouter()

  if (canGoBack(router.pathname)) {
    return (
      <FloatingActionButton placement="left" onPress={router.back}>
        <Image src="/icons/back.svg" alt="Back icon" width={24} height={24} />
      </FloatingActionButton>
    )
  }
  return null
}

export default BackButton
