import Head from 'next/head'
import Card from '@/components/Card'
import Header from '@/components/Header'

export default function Collection({ nfts }) {
  return (
    <div>
      <Head>
        <title>Dapp Lazy - Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Off-Chain Collection</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {nfts.map((nft, i) => (
            <Card key={i} nftData={nft} btn />
          ))}
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
