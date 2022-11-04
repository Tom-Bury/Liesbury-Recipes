import * as React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { HorizontalCenterLayout } from 'layouts'
import { useEffect, useState } from 'react'
import { EErrorCode } from 'types/enums'
import useFadeInStyle from 'hooks/useFadeInStyle'
import { AuthApi } from 'api/auth/Auth.api'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn.hook'
import Card from '~/components/Card/Card'
import Input from '~/components/atoms/Input/Input'
import Button from '~/components/atoms/Button/Button'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const fadeInStyle = useFadeInStyle()
  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    if (isLoggedIn === true) {
      router.replace('/')
    }
  }, [isLoggedIn])

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
      if (await AuthApi.login(password)) {
        const { redirectTo } = router.query
        router.replace(`/${redirectTo || ''}`)
      } else {
        throw new Error(EErrorCode.HTTP_401)
      }
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
    <HorizontalCenterLayout className={`h-screen flex justify-center items-center p-4 ${fadeInStyle}`}>
      <h1 className="text-darkest">Beheerder?</h1>
      <hr className="w-full max-w-xl mb-8 border-t-4 border-primary" />
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
    </HorizontalCenterLayout>
  )
}

export default LoginPage
