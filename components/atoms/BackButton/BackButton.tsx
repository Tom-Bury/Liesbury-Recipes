import { useRouter } from 'next/router'
import * as React from 'react'
import Image from 'next/image'
import FloatingActionButton from '../FloatingActionButton/FloatingActionButton.component'

const BackButton: React.FC = () => {
  const router = useRouter()

  return (
    <FloatingActionButton placement="left" onPress={router.back}>
      <Image src="/icons/back.svg" alt="Back icon" width={24} height={24} />
    </FloatingActionButton>
  )
}

export default BackButton
