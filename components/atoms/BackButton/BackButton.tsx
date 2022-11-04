import { useRouter } from 'next/router'
import * as React from 'react'
import Image from 'next/image'
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton.component'
import FloatingWrap from '../FloatingActionButton/FloatingWrap.component'

const canGoBack = (path: string) => {
  return path !== '/' && path !== ''
}

const BackButton: React.FC = () => {
  const router = useRouter()

  const onGoBack = () => {
    if (router.pathname.startsWith('/recipe/')) {
      router.replace('/')
      return
    }

    if (router.pathname === '/add-recipe') {
      router.back()
      return
    }

    router.back()
  }

  if (canGoBack(router.pathname)) {
    return (
      <FloatingWrap placement="left">
        <FloatingActionButton onPress={onGoBack}>
          <Image src="/icons/back.svg" alt="Back icon" width={24} height={24} />
        </FloatingActionButton>
      </FloatingWrap>
    )
  }
  return null
}

export default BackButton
