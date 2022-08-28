import { Button, Paper } from '@mui/material'
import React, { useState } from 'react'
import { Row, Card, CryptoLogos } from '@web3uikit/core'
import { NFT } from '@web3uikit/web3'
import DataGrid1 from './TokenGrid'
import { useChain, useWeb3ExecuteFunction, useMoralis } from 'react-moralis'
import {
  TokenGeneratorAddr,
  KeyrxngTokenAddr,
  KxyChainAddr,
  PlaygroundAddr,
  KeyChainxAddr,
} from '../../data/contractAddrs'
import TokenGenABI from '../../data/ERC20Gen.json'
import PlaygroundABI from '../../data/Playground.json'
import swal from 'sweetalert'

export default function Playground() {
  const { switchNetwork } = useChain()
  const { Moralis, account, chainId, isWeb3Enabled, enableWeb3 } = useMoralis()
  const [hasAccess, setHasAccess] = useState(false)
  const [hasAccessTwo, setHasAccessTwo] = useState(false)
  const contractProcessor = useWeb3ExecuteFunction()

  let name = 'test'
  let symbol = 'tst'

  const matic = '0x13881'
  const avax = '0xa869'
  const bsc = '0x61'

  const deployERC20 = async () => {
    let options = {
      contractAddress: TokenGeneratorAddr,
      functionName: 'deployNewMockERC20',
      abi: TokenGenABI,
      params: {
        _name: name,
        _symbol: symbol,
      },
    }

    const tx = await contractProcessor.fetch({
      params: options,
      onSuccess: (e) => {
        swal(`Deploying your new ERC20 Token from wallet ${account}`, {
          icon: 'success',
        })
      },
      onError: (error) => {
        swal(`${error.message}`, {
          icon: 'warning',
          dangerMode: true,
        })
      },
    })

    const rx = await tx.wait()
    swal({
      text: `Your new token deployed to ${rx.events[3].args[1]}`,
      icon: 'success',
    })
  }
  const deployERC721 = async () => {
    let options = {
      contractAddress: TokenGeneratorAddr,
      functionName: 'deployNewMockERC721',
      abi: TokenGenABI,
      params: {
        _name: name,
        _symbol: symbol,
      },
    }

    const tx = await contractProcessor.fetch({
      params: options,
      onSuccess: (e) => {
        swal(`Deploying your new ERC721 Token from wallet ${account}`, {
          icon: 'success',
        })
      },
      onError: (error) => {
        swal(`${error.message}`, {
          icon: 'warning',
          dangerMode: true,
        })
      },
    })

    const rx = await tx.wait()

    swal({
      text: `Your new token deployed to ${rx.events[2].args[1]}`,
      icon: 'success',
    })
  }
  const deployERC1155 = async () => {
    let options = {
      contractAddress: TokenGeneratorAddr,
      functionName: 'deployNewMockERC1155',
      abi: TokenGenABI,
    }

    const tx = await contractProcessor.fetch({
      params: options,
      onSuccess: (e) => {
        swal(`Deploying your new ERC1155 Token from wallet ${account}`, {
          icon: 'success',
        })
      },
      onError: (error) => {
        swal(`${error.message}`, {
          icon: 'warning',
          dangerMode: true,
        })
      },
    })

    const rx = await tx.wait()

    swal({
      text: `Your new token deployed to ${rx.events[1].args[1]}`,
      icon: 'success',
    })
  }

  async function addTokenToWallet(address, name, symbol) {
    const tokenDecimals = parseInt(18)
    const tokenImage =
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: address, // The address that the token is at.
            symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const mintKeyrxng = async () => {
    let options = {
      contractAddress: PlaygroundAddr,
      functionName: 'init',
      abi: PlaygroundABI,
    }

    const tx = await contractProcessor.fetch({
      params: options,
      onSuccess: (e) => {
        swal(`Welcome to the playground! Have fun and don't get lost!`, {
          icon: 'success',
        })
      },
      onError: (error) => {
        swal(`${error.message}`, {
          icon: 'warning',
          dangerMode: true,
        })
      },
    })

    await tx.wait()
    const accept = await swal({
      text: `Accept the MetaMask prompt`,
      icon: 'success',
      dangerMode: true,
    })

    if (accept) {
      addTokenToWallet(KeyrxngTokenAddr, 'Keyrxng', 'KXY')
    }

    setHasAccess(true)
  }

  const mintKxyChain = async () => {
    let options = {
      contractAddress: PlaygroundAddr,
      functionName: 'mintERC721',
      abi: PlaygroundABI,
      params: { _who: account },
    }

    const tx = await contractProcessor.fetch({
      params: options,
      onSuccess: (e) => {
        swal(`Hmm, I wonder what this NFT allows access to?`, {
          icon: 'success',
        })
      },
      onError: (error) => {
        swal(`${error.message}`, {
          icon: 'warning',
          dangerMode: true,
        })
      },
    })

    await tx.wait()

    const accept = await swal({
      text: `Accept the MetaMask prompt`,
      icon: 'success',
      dangerMode: true,
    })
    if (accept) {
      addTokenToWallet(KxyChainAddr, 'KxyChain', 'CHAIN')
    }
    setHasAccessTwo(true)
  }

  const mintKeyChainx = async () => {
    let options = {
      contractAddress: PlaygroundAddr,
      functionName: 'mintERC1155',
      abi: PlaygroundABI,
      params: { _who: account },
    }

    const tx = await contractProcessor.fetch({
      params: options,
      onSuccess: (e) => {
        swal(`Hmm, I wonder what this NFT allows access to?`, {
          icon: 'success',
        })
      },
      onError: (error) => {
        swal(`${error.message}`, {
          icon: 'warning',
          dangerMode: true,
        })
      },
    })

    await tx.wait()
    const accept = await swal({
      text: `Accept the MetaMask prompt`,
      icon: 'success',
      dangerMode: true,
    })
    if (accept) {
      addTokenToWallet(KeyChainxAddr, 'keyChainX', 'CHAINX')
    }
  }

  return (
    <Row
      style={{
        colGap: '1rem',
        rowGap: 'rem',
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: '2',
          minWidth: 'fit-content',
        }}
      >
        <DataGrid1 />
        <div style={{ display: 'flex' }}></div>
      </div>
      <div
        style={{
          flex: '1',
          display: 'grid',
        }}
      >
        {' '}
        <Paper
          style={{
            display: 'flex',
            height: '95%',
            mixWidth: 'fit-content',
            color: 'aqua',
            backgroundColor: 'lightslategray',
            borderColor: 'white',
            textColor: '#ffffff',
          }}
        >
          <div
            style={{
              flex: '3',
              display: 'flex',
              textColor: 'white',
            }}
          >
            <div>
              <Button onClick={() => switchNetwork(avax)}>
                <CryptoLogos
                  className="logos"
                  chain={'avalanche'}
                  size={'48px'}
                  style={{ margin: '2px' }}
                />
              </Button>
              <Button onClick={() => switchNetwork(bsc)}>
                <CryptoLogos
                  className="logos"
                  chain={'binance'}
                  size={'48px'}
                  style={{ margin: '2px' }}
                />
              </Button>
              <Button onClick={() => switchNetwork(matic)}>
                <CryptoLogos
                  className="logos"
                  chain={'polygon'}
                  size={'48px'}
                  style={{ margin: '2px' }}
                />
              </Button>
              {/* Not Active Links
              <Button onClick={() => switchNetwork(matic)}>
                <CryptoLogos
                  className="logos"
                  chain={'ethereum'}
                  size={'48px'}
                  style={{ margin: '2px' }}
                />
              </Button>
              <Button onClick={() => switchNetwork(matic)}>
                <CryptoLogos
                  className="logos"
                  chain={'fantom'}
                  size={'48px'}
                  style={{ margin: '2px' }}
                />
              </Button>
              <Button onClick={() => switchNetwork(matic)}>
                <CryptoLogos
                  className="logos"
                  chain={'arbitrum'}
                  size={'48px'}
                  style={{ margin: '2px' }}
                />
              </Button>
              <Button onClick={() => switchNetwork(matic)}>
                <CryptoLogos
                  className="logos"
                  chain={'cronos'}
                  size={'48px'}
                  style={{ margin: '2px' }}
                />
              </Button>{' '} */}
            </div>
          </div>
        </Paper>
        <Paper
          style={{
            display: 'flex',
            height: '95%',
            color: 'aqua',
            backgroundColor: 'lightslategray',
            borderColor: 'white',
            textColor: '#ffffff',
          }}
        >
          <Card
            title={'Basic ERC20 Deployer'}
            description={
              'Deploy your own ERC20 with a balance of 1 million tokens'
            }
            style={{
              textColor: '#ffffff',
            }}
            tooltipMove={70}
            tooltipMoveBody={-70}
            tooltipText={
              <span style={{ width: 200 }}>
                'It's pretty pointless but also handy to be able to quickly
                deploy tokens on the fly from this UI for some playground fun.
                Get cracking!'
              </span>
            }
            onClick={deployERC20}
          ></Card>
        </Paper>
        <Paper
          style={{
            display: 'flex',
            marginTop: '10px',
            height: '95%',
            color: 'aqua',
            backgroundColor: 'lightslategray',
            borderColor: 'white',
            textColor: '#ffffff',
          }}
        >
          <Card
            title={'Basic ERC721 Deployer'}
            description={'Deploy your own ERC721 with a balance of 1 token'}
            style={{
              textColor: '#ffffff',
              minWidth: 'fit-content',
            }}
            tooltipMove={70}
            tooltipMoveBody={-70}
            tooltipText={
              <span style={{ width: 200 }}>
                'It's pretty pointless but also handy to be able to quickly
                deploy tokens on the fly from this UI for some playground fun.
                Get cracking!'
              </span>
            }
            onClick={deployERC721}
          ></Card>
        </Paper>
        <Paper
          style={{
            display: 'flex',
            marginTop: '10px',
            height: '95%',

            color: 'aqua',
            backgroundColor: 'lightslategray',
            borderColor: 'white',
            textColor: '#ffffff',
          }}
        >
          <Card
            title={'Basic ERC1155 Deployer'}
            description={'Deploy your own ERC1155 with a balance of 1 token'}
            style={{
              textColor: '#ffffff',
            }}
            tooltipMove={70}
            tooltipMoveBody={-70}
            tooltipText={
              <span style={{ width: 200 }}>
                'It's pretty pointless but also handy to be able to quickly
                deploy tokens on the fly from this UI for some playground fun.
                Get cracking!'
              </span>
            }
            onClick={deployERC1155}
          ></Card>
        </Paper>
        <Paper
          style={{
            display: 'flex',
            marginTop: '10px',
            height: '95%',

            color: 'aqua',
            backgroundColor: 'lightslategray',
            borderColor: 'white',
            textColor: '#ffffff',
          }}
        >
          <Card
            title={'Playground Tokens'}
            description={'Checkout the tooltip for more info!'}
            style={{
              textColor: '#ffffff',
            }}
            tooltipMove={70}
            tooltipMoveBody={-70}
            tooltipText={
              <span style={{ width: 200 }}>
                These tokens are simply for use in my personal sandbox and are
                the first step in a short interactive experience should you wish
                to partake.
                <br />
              </span>
            }
            onClick={mintKeyrxng}
          ></Card>
        </Paper>
        <Paper
          style={{
            display: 'flex',
            marginTop: '10px',
            height: '95%',

            color: 'aqua',
            backgroundColor: 'lightslategray',
            borderColor: 'white',
            textColor: '#ffffff',
          }}
        >
          {!hasAccess ? (
            <Card
              title={'Access Locked'}
              description={'Can you access me?'}
              isDisabled
              style={{
                textColor: '#ffffff',
              }}
              tooltipMove={70}
              tooltipMoveBody={-70}
              tooltipText={
                <span style={{ width: 200 }}>
                  These tokens are simply for use in my personal sandbox and are
                  the first step in a short interactive experience should you
                  wish to partake.
                  <br />
                </span>
              }
            ></Card>
          ) : (
            <Card
              title={'Playground NFT'}
              description={'Checkout the tooltip for more info!'}
              style={{
                textColor: '#ffffff',
              }}
              tooltipMove={70}
              tooltipMoveBody={-70}
              tooltipText={
                <span style={{ width: 200 }}>
                  This NFT will grant access to a discord server, a telegram
                  group and more. I wonder what other playground features I can
                  use this with?
                  <br />
                </span>
              }
              onClick={mintKxyChain}
            ></Card>
          )}
        </Paper>{' '}
        <Paper
          style={{
            display: 'flex',
            marginTop: '10px',
            height: '95%',

            color: 'aqua',
            backgroundColor: 'lightslategray',
            borderColor: 'white',
            textColor: '#ffffff',
          }}
        >
          {!hasAccessTwo ? (
            <Card
              title={'Access Locked'}
              description={'Can you access me?'}
              isDisabled
              style={{
                textColor: '#ffffff',
              }}
              tooltipMove={70}
              tooltipMoveBody={-70}
              tooltipText={
                <span style={{ width: 200 }}>
                  These tokens are simply for use in my personal sandbox and are
                  the first step in a short interactive experience should you
                  wish to partake.
                  <br />
                </span>
              }
            ></Card>
          ) : (
            <Card
              title={'Playground NFT'}
              description={'Checkout the tooltip for more info!'}
              style={{
                textColor: '#ffffff',
              }}
              tooltipMove={70}
              tooltipMoveBody={-70}
              tooltipText={
                <span style={{ width: 200 }}>
                  This NFT will grant access to a discord server, a telegram
                  group and more. I wonder what other playground features I can
                  use this with?
                  <br />
                </span>
              }
              onClick={mintKeyChainx}
            ></Card>
          )}
        </Paper>{' '}
      </div>
    </Row>
  )
}
