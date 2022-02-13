import * as React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { HorizontalCenterLayout } from 'layouts'
import { useState } from 'react'
import authUser from 'api/authUser'
import { EErrorCode } from 'types/enums'
import Card from '~/components/Card/Card'
import Input from '~/components/atoms/Input/Input'
import Button from '~/components/atoms/Button/Button'
import BackButton from '~/components/atoms/BackButton/BackButton'

const LoginPage: NextPage = () => {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [isNotAuthorized, setIsNotAuthorized] = useState(false)
  const [isUnknownError, setIsUnknownError] = useState(false)

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setPassword(event.target.value)
    setIsNotAuthorized(false)
    setIsUnknownError(false)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    try {
      await authUser(password)
      const { redirectTo } = router.query
      router.push(`/${redirectTo || ''}`)
    } catch (error: any) {
      console.error(error)
      if (error.name === EErrorCode.HTTP_401) {
        // Unauthorized -> wrong password
        setIsNotAuthorized(true)
      } else {
        // Other
        setIsUnknownError(true)
      }
    }
  }

  return (
    <HorizontalCenterLayout className="h-screen flex justify-center items-center p-2 md:p-4">
      <h1 className="text-darkest">Beheerder?</h1>
      <hr className="w-full max-w-xl mb-8 border-2 border-primary" />
      <Card className="p-4 md:p-8 w-full max-w-xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <fieldset>
            <Input label="Wachtwoord" id="password" type="password" onChange={handleInputChange} />
          </fieldset>
          <Button disabled={password.length === 0} className="w-full" type="submit">
            Aanmelden
          </Button>
          {isNotAuthorized && <h6 className="text-error font-bold text-center mt-2">Verkeerd paswoord</h6>}
          {isUnknownError && <h6 className="text-error font-bold text-center mt-2">Er is iets misgelopen, probeer het later opnieuw</h6>}
        </form>
      </Card>
      <span className="fab-container">
        <BackButton />
      </span>
    </HorizontalCenterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { cookies } = context.req

  if (cookies.authToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default LoginPage
