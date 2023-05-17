import Head from 'next/head'
import Card from '@/components/Card'
import Header from '@/components/Header'
import { loadNFTs } from '@/services/blockchain'

export default function Home({ nfts }) {
  return (
    <div>
      <Head>
        <title>Dapp Lazy - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container p-10">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6">On-Chain Collection</h1>
          {nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
              {nfts.map((nft, i) => (
                <Card key={i} nftData={nft} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nothing on-chain yet, please mint...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data = await loadNFTs()
  return {
    props: { nfts: JSON.parse(JSON.stringify(data)) },
  }
}
