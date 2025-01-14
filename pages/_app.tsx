import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { ApiClient } from 'api/client'
import BackButton from '~/components/atoms/BackButton/BackButton'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        {/* Basic metadata */}
        <title key="title">Liesbury Recipes</title>
        <meta name="description" content="A collection of recipes found across the internet that we like to cook." key="description" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="application-name" content="Liesbury's receptenlijst" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <link rel="icon" type="image/png" sizes="48x48" href="/icons/liesbury_maskable_icon_x48.png" />
        <link rel="mask-icon" href="/icon/liesbury_maskable_icon_x72.png" color="#005259" />

        {/* PWA data */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/liesbury-192.png" />
        <meta name="theme-color" content="#005259" />

        {/* Facebook meta tags */}
        <meta property="og:url" content="https://recipes.lies.bury.dev" key="og-url" />
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:title" content="Liesbury's receptenlijst" key="og-title" />
        <meta property="og:site_name" content="Liesbury's receptenlijst" key="og-site_name" />
        <meta
          property="og:description"
          content="A collection of recipes found across the internet that we like to cook."
          key="og-description"
        />
        <meta property="og:image" content="/images/liesbury-og-image.png" key="og-image" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" key="tw-card" />
        <meta property="twitter:domain" content="recipes.lies.bury.dev" key="tw-domain" />
        <meta property="twitter:url" content="https://recipes.lies.bury.dev" key="tw-url" />
        <meta name="twitter:title" content="Liesbury Recipes" key="tw-title" />
        <meta
          name="twitter:description"
          content="A collection of recipes found across the internet that we like to cook."
          key="tw-description"
        />
        <meta name="twitter:image" content="/images/liesbury-og-image.png" key="tw-image" />

        <link rel="preconnect" href={ApiClient.root} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Component {...pageProps} />
      <BackButton />
    </>
  )
}

// https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
