import Moralis from "moralis"

function Native({nativeBal, address}) {

  return (
    <div><h2>Wallet: {address}</h2><h2>Native Balance: {nativeBal}</h2></div>
  )
}

export async function getServerSideProps(context) {
    await Moralis.start({apiKey: process.env.MORALIS_API_KEY});

    const address = '0x196Ff55Af7Ca5df332faf3A72972dDf6d5e109A4';

    const nativeBal = await Moralis.EvmApi.account.getNativeBalance({address});

    return {
        props: {
            address,
            nativeBal: nativeBal.result.balance.ether
        },
    }
}

export default Native