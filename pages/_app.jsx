import '../styles/App.modules.scss'
import {createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi'
import {publicProvider} from 'wagmi/providers/public'
import {SessionProvider} from 'next-auth/react'
import { MoralisProvider } from 'react-moralis'


const {provider, webSocketProvider} = configureChains(defaultChains, [publicProvider()])

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true
})

function MyApp({ Component, pageProps }) {
  return (
  <WagmiConfig client={client}>
    <MoralisProvider
        appId={process.env.REACT_APP_APPID}
        serverUrl={process.env.REACT_APP_SERVER_URL}
        initializeOnMount={false}
      >
    <SessionProvider session={pageProps.session} refetchInterval={0}>
    <Component {...pageProps} />
    </SessionProvider>
    </MoralisProvider>
  </WagmiConfig>
  )
}

export default MyApp
