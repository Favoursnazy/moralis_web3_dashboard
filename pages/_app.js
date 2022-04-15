import '@fontsource/open-sans/700.css'
import { ChakraProvider } from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'
import theme from "../theme/fonts/generalFont"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <MoralisProvider 
      appId={process.env.NEXT_PUBLIC_APPID} 
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
        <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  )
}

export default MyApp
