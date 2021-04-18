import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />

        <title>Liesbury Recipes</title>
        <meta name="description" content="A collection of recipes found across the internet that we like to cook." />

        {/* Facebook meta tags */}
        <meta property="og:url" content="https://recipes.lies.bury.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Liesbury Recipes" />
        <meta property="og:description" content="A collection of recipes found across the internet that we like to cook." />
        <meta property="og:image" content="/images/liesbury-og-image.png" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="recipes.lies.bury.dev" />
        <meta property="twitter:url" content="https://recipes.lies.bury.dev" />
        <meta name="twitter:title" content="Liesbury Recipes" />
        <meta name="twitter:description" content="A collection of recipes found across the internet that we like to cook." />
        <meta name="twitter:image" content="/images/liesbury-og-image.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
