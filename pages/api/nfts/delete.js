import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const uri = process.env.NEXT_APP_MONGO_DB

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { _id, owner } = req.body

    await client.connect()
    const result = await client
      .db('dapplazy')
      .collection('nfts')
      .deleteOne({ _id: new ObjectId(_id), owner })

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'NFT deleted successfully' })
    } else {
      return res.status(404).json({ message: 'NFT not found' })
    }
  } catch (error) {
    console.error('Error deleting NFT:', error)
    return res.status(500).json({ message: 'Failed to delete NFT' })
  } finally {
    await client.close()
  }
}
