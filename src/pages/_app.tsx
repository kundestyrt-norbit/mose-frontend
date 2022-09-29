import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { theme } from '../styles/theme'
import createEmotionCache from '../utils/createEmotionCache'
import Amplify, { withSSRContext } from 'aws-amplify'

import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import config from '../aws-exports'

// Configure SSR with Amplify
Amplify.configure({
  ...config,
  ssr: true
})

// Auth from SSR
const { Auth } = withSSRContext()

// Configure Auth
Auth.configure({
  region: process.env.AUTH_REGION,
  userPoolId: process.env.AUTH_POOL,
  userPoolWebClientId: process.env.AUTH_POOL_CLIENT,
  mandatorySignIn: true,
  // Set this only if you wish to use cookies to storage otherwise ignore it
  cookieStorage: {
    domain: 'localhost',
    // Set true if is a domain with https. For localhost set it to false
    secure: false,
    path: '/',
    expires: 2
  }
})

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps): JSX.Element => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
export default withAuthenticator(MyApp)
