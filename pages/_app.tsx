import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import 'tailwindcss/tailwind.css'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Liesbury Recipes</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
