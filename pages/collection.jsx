import Head from 'next/head'
import Card from '@/components/Card'
import Header from '@/components/Header'

export default function Collection() {
  const nftData = {
    name: 'Lazy NFT',
    description: 'A beautiful lazy NFT artwork.',
    price: '0.05 ETH',
    imageUrl: 'https://www.marketsmithinc.com/wp-content/uploads/2022/05/latest-1.jpg',
  }

  return (
    <div>
      <Head>
        <title>Dapp Lazy - Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Off-Chain Collection</h1>
        <Card nftData={nftData} />
      </div>
    </div>
  )
}
