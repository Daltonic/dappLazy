import Head from 'next/head'
import { useState } from 'react'
import Header from '@/components/Header'
import { toast } from 'react-toastify'

export default function CreateNFTPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  })

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await fetch('/api/nfts/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })

          if (response.ok) {
            setFormData({
              name: '',
              description: '',
              price: '',
              imageUrl: '',
            })
            resolve()
          } else {
            reject()
          }
        } catch (error) {
          console.error('Error creating NFT:', error)
          reject()
        }
      }),
      {
        pending: 'Lazy minting...',
        success: 'NFT created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div>
      <Head>
        <title>Dapp Lazy - Create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container mx-auto py-10 w-2/5">
        <h1 className="text-3xl font-bold mb-6">Create NFT</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block font-semibold mb-2">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Create NFT
          </button>
        </form>
      </div>
    </div>
  )
}
