import Moralis from 'moralis'

export default async function handler(req, res) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  const address = '0x196Ff55Af7Ca5df332faf3A72972dDf6d5e109A4'
  const [nativeBal, tokenBalances] = await Promise.all([
    Moralis.EvmApi.account.getNativeBalance({ address }),
    Moralis.EvmApi.account.getTokenBalances({ address }),
  ])
  res.status(200).json({
    nativeBal: nativeBal.result.balance.ether,
    tokenBalances: tokenBalances.result.map((token) => token.display()),
  })
}
