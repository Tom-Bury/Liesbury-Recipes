import { useRouter } from 'next/router'
import * as React from 'react'
import Image from "next/legacy/image"
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton.component'
import FloatingWrap from '../FloatingActionButton/FloatingWrap.component'

const canGoBack = (path: string) => {
  return path !== '/' && path !== ''
}

const BackButton: React.FC = () => {
  const router = useRouter()

  if (canGoBack(router.pathname)) {
    return (
      <FloatingWrap placement="left">
        <FloatingActionButton onPress={router.back}>
          <Image src="/icons/back.svg" alt="Back icon" width={24} height={24} />
        </FloatingActionButton>
      </FloatingWrap>
    )
  }
  return null
}

export default BackButton
