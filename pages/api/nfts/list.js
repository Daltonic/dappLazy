import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.NEXT_APP_MONGO_DB

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect()

      const nftsCollection = client.db('dapplazy').collection('nfts')
      const nfts = await nftsCollection.find({}).toArray()

      return res.status(200).json(nfts)
    } catch (error) {
      console.error('Error retrieving NFTs:', error)
      return res.status(500).json({ message: 'Error retrieving NFTs' })
    } finally {
      await client.close()
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
