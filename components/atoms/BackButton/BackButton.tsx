import { useRouter } from 'next/router'
import * as React from 'react'
import Image from 'next/image'
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton.component'
import { ERecipeBackNavigationLocalStorageKeys } from '~/utils/navigation.utils'

const canGoBack = (path: string) => {
  return path !== '/' && path !== ''
}

const BackButton: React.FC = () => {
  const router = useRouter()

  const onGoBack = () => {
    if (router.pathname.startsWith('/recipe/')) {
      localStorage.setItem(ERecipeBackNavigationLocalStorageKeys.HOME_SHOULD_NAVIGATE, true)
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
      <FloatingActionButton placement="left" onPress={onGoBack}>
        <Image src="/icons/back.svg" alt="Back icon" width={24} height={24} />
      </FloatingActionButton>
    )
  }
  return null
}

export default BackButton
