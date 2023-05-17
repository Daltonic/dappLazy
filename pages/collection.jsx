import Head from 'next/head'
import Card from '@/components/Card'
import Header from '@/components/Header'
import { useGlobalState } from '@/store'

export default function Collection({ nfts }) {
  const [connectedAccount] = useGlobalState('connectedAccount')
  nfts = nfts.filter((nft) => nft.owner == connectedAccount)

  return (
    <div>
      <Head>
        <title>Dapp Lazy - Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container p-10">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6">Off-Chain Collection</h1>
          {nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
              {nfts.map((nft, i) => (
                <Card key={i} nftData={nft} btn />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">You have no collection on your account...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(process.env.NEXT_APP_BASE_URI + '/api/nfts/list')
    if (response.ok) {
      const nfts = await response.json()
      return {
        props: { nfts },
      }
    } else {
      console.error('Failed to fetch NFTs:', response.statusText)
      return {
        props: { nfts: [] },
      }
    }
  } catch (error) {
    console.error('Error fetching NFTs:', error)
    return {
      props: { nfts: [] },
    }
  }
}
