import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.NEXT_APP_MONGO_DB

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const createNFT = async (nftData) => {
  try {
    await client.connect()
    await client.db('dapplazy').collection('nfts').insertOne(nftData)
    return true
  } finally {
    await client.close()
  }
}

export { createNFT }
