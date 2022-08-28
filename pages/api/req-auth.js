import Moralis from 'moralis'

const config = {
  domain: process.env.APP_DOMAIN,
  statement:
    'Welcome to my web3 playground, gain access to my cv and more! Hit me up!',
  uri: process.env.NEXTAUTH_URL,
  timeout: 60,
}

export default async function handler(req, res) {
  const { address, chain, network } = req.body

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      ...config,
    })
    res.status(200).json(message)
  } catch (error) {
    res.status(400).json({ error })
    console.error(error)
  }
}
