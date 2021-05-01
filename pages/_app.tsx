import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          registration => {
            console.log('Service Worker registration successful with scope: ', registration)
          },
          err => {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  return (
    <>
      <Head>
        {/* Basic metadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="application-name" content="Liesbury's receptenlijst" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/liesbury_maskable_icon_x48.png" />
        <link rel="mask-icon" href="/icon/liesbury_maskable_icon_x72.png" color="#005259" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Liesbury Recipes</title>
        <meta name="description" content="A collection of recipes found across the internet that we like to cook." />

        {/* PWA data */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="a.pple-touch-icon" href="/icons/liesbury-192.png" />
        <meta name="theme-color" content="#005259" />

        {/* Facebook meta tags */}
        <meta property="og:url" content="https://recipes.lies.bury.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Liesbury's receptenlijst" />
        <meta property="og:site_name" content="Liesbury's receptenlijst" />
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
