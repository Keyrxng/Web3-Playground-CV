import React from 'react'
import {useConnect} from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'
import axios from 'axios'
import { ConnectButton } from '@web3uikit/web3';

function SignIn() {
    const {connectAsync} = useConnect();
    
    const handleAuth = async () => {
        const {account, chain} = await connectAsync({connector: new InjectedConnector()})
        const userData = {address: account, chain: chain.id, network: 'evm'}
        console.log(userData)
    }
  return (<>
    <div>SignIn</div>
<ConnectButton onClick={() => handleAuth}/>    </>)
}

export default SignIn