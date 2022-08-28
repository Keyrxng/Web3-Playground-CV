import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {
  useMoralis,
  useChain,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from 'react-moralis'

const DataGrid1 = () => {
  const {
    enableWeb3,
    Moralis,
    chainId,
    isWeb3Enabled,
    isAuthenticated,
    user,
  } = useMoralis()
  const [rows, setRows] = useState([])
  const [rowHeight, setRowHeight] = useState(28)
  const { chain } = useChain()
  const Web3Api = useMoralisWeb3Api()
  Moralis.start({ apiKey: process.env.REACT_APP_MORALIS_API_KEY })

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    Web3Api.account.getTokenBalances,
    {
      chain: 'bsc',
    },
  )

  const balances = fetch()
  console.log('balzz', data)
  console.log('balzz', error)

  console.log('balzz', isLoading)
  console.log('balzz', balances)

  useEffect(() => {
    if (rowHeight === 29) {
      setRowHeight(29)
    } else {
      setRowHeight(28)
    }
  }, [rowHeight])

  const matic = '0x13881'
  const avax = '0xa869'
  const bsc = '0x61'

  useEffect(
    (e) => {
      async function load() {
        console.log('enabled', isWeb3Enabled)
        let balances = []
        let network = chainId

        if (network === avax) {
          balances = fetch({
            chain: `0xa869`,
            account: user,
          })
        }
        if (network === matic) {
          balances = fetch({
            chain: `mumbai`,
          })
        }
        if (network === bsc) {
          balances = fetch({
            chain: `bsc testnet`,
          })
        }
        console.log('bals', balances)

        let addressz = balances.map((balances) => balances.token_address)
        let balz = balances.map((balances) => balances.balance)
        let namez = balances.map((balances) => balances.name)

        let values = []
        let use = []
        const vals = []

        for (let i = 0; i < addressz.length; i++) {
          let formatted = Moralis.Units.ETH(balz[i], '18')
          let address = addressz[i]
          let namep = namez[i]
          if (formatted > 0) {
            values.push(formatted)
            use.push(address)
          }
          let id = i
          let j = { id: id, name: namep, address: address, balance: formatted }

          try {
            vals.push(j)
          } catch (e) {
            alert(e)
          }
          setRows(vals)
        }
      }
      load()
    },
    [
      Moralis.Units,
      Moralis.Web3Api.account,
      enableWeb3,
      isAuthenticated,
      isWeb3Enabled,
      chain,
      chainId,
    ],
  )

  const row = [...rows]

  const column = [
    { field: 'id', headerName: 'id', flex: 1 },
    { field: 'name', headerName: 'name', flex: 1 },
    { field: 'address', headerName: 'address', flex: 1 },
    { field: 'balance', headerName: 'balance', flex: 1 },
  ]

  useEffect(() => {
    setTimeout(() => {}, 3000)
  }, [])

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div>
        <DataGrid
          style={{ backgroundColor: 'lightslategray', borderColor: 'white' }}
          rows={row}
          columns={column}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          loading
        />
      </div>
    </div>
  )
}

export default DataGrid1
