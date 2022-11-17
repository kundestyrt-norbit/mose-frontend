import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { theme } from '../styles/theme'
import createEmotionCache from '../utils/createEmotionCache'
import Amplify from 'aws-amplify'
import '../index.css'
import {
  Authenticator,
  Button,
  useAuthenticator,
  useTheme,
  Heading,
  Text
} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import config from '../aws-exports'
import NorbitLogo from '../components/layout/NorbitLogo'
// Configure SSR with Amplify
Amplify.configure({
  ...config,
  oauth: {
    domain: 'moseauth.auth.eu-north-1.amazoncognito.com',
    scope: ['email', 'openid'],
    redirectSignIn: process.env.AUTH_REDIRECT,
    redirectSignOut: process.env.AUTH_REDIRECT,
    responseType: 'code'
  },
  ssr: true
})

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps): JSX.Element => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter Your username here',
        isRequired: true
      }
    }
  }
  const components = {
    SignIn: {
      Header () {
        const { tokens } = useTheme()
        const { toFederatedSignIn } = useAuthenticator()
        return (
          <>
            <Heading
              // textAlign='center'
              padding={`${tokens.space.xl.value} ${tokens.space.xl.value} 0 ${tokens.space.xl.value}`}
              level={3}
            >
              <Button justifyContent='normal' width='100%' fontWeight="normal" onClick={() => toFederatedSignIn({ provider: 'Norbit' })} size="large">
                <NorbitLogo sx={{ alignSelf: 'left' }} viewBox='0 0 48 48' height={24}/><Text textAlign='center' width='100%' paddingRight={24}>Sign in with Norbit</Text></Button>
            </Heading>
            <Text
              fontSize='larger'
              marginLeft='1rem'
              padding={`${tokens.space.xl.value} ${tokens.space.xl.value} 0 ${tokens.space.xl.value}`}
            >
              Or sign in using username and password
            </Text>
          </>
        )
      }
    }
  }
  return (
    <Authenticator
      components={components}
      formFields={formFields}
      hideSignUp={true}
      variation="modal"
      >
      <CacheProvider value={emotionCache}>
        <Head>
          <title>MOSE</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
   </Authenticator>
  )
}

export default MyApp
