import { useRouter } from 'next/router'
import * as React from 'react'
import Image from 'next/image'
import CircularButton from '../FloatingButton/CircularButton'

const BackButton: React.FC = () => {
  const router = useRouter()

  return (
    <span className="fixed w-full max-w-5xl bottom-0 flex flex-row">
      <CircularButton
        className="mr-auto my-4 ml-4 lg:ml-0 z-50"
        onPress={() => {
          router.back()
        }}
      >
        <Image src="/icons/back.svg" alt="Back icon" width={24} height={24} />
      </CircularButton>
    </span>
  )
}

export default BackButton
