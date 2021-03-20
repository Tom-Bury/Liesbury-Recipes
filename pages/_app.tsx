import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch2 = require('@vercel/fetch-retry')(require('node-fetch'))

if (!globalThis.fetch) {
  globalThis.fetch = fetch2
}

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Liesbury Recipes</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
