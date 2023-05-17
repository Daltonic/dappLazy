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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { name, description, price, imageUrl, owner } = req.body

    await client.connect()
    await client
      .db('dapplazy')
      .collection('nfts')
      .insertOne({ name, description, price, imageUrl, owner })

    return res.status(200).json({ message: 'NFT created successfully' })
  } catch (error) {
    console.error('Error creating NFT:', error)
    return res.status(500).json({ message: 'Failed to create NFT' })
  } finally {
    await client.close()
  }
}
