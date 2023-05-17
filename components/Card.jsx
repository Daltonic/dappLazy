import { mintNft } from '@/services/blockchain'
import { truncate, useGlobalState } from '@/store'
import { useRouter } from 'next/router'
import { FaEthereum } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Card = ({ nftData, btn }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const router = useRouter()

  const handleMint = async () => {
    if (!connectedAccount) return toast.warning('Please connect wallet...')

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await mintNft(nftData)
          .then(async () => {
            const deleted = await onDelete()
            if (deleted) {
              router.push('/')
              resolve()
            } else {
              reject()
            }
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Listing NFT...',
        success: 'NFT Listed successfully...',
        error: 'Encoutered an error',
      }
    )
  }

  const handleDelete = async () => {
    if (nftData.owner != connectedAccount) return toast.warning('Unauthorized...')

    await toast.promise(
      new Promise(async (resolve, reject) => {
        const deleted = await onDelete()
        if (deleted) {
          resolve(deleted)
        } else {
          reject(deleted)
        }
      }),
      {
        pending: 'Deleting NFT...',
        success: 'NFT deleted successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const onDelete = async () => {
    try {
      const response = await fetch('/api/nfts/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nftData),
      })

      if (response.ok) {
        window.location.reload()
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error creating NFT:', error)
      return false
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <img src={nftData.imageUrl} alt={nftData.name} className="w-full h-56 object-cover mb-4" />
      <h2 className="text-xl font-bold">{nftData.name}</h2>
      <p className="text-gray-500 mb-4">{truncate(nftData.description, 100, 0, 103)}</p>
      {btn ? (
        <div className="flex justify-between items-center">
          <button
            onClick={handleMint}
            className="bg-blue-500 text-white px-2 py-1 rounded-md
          hover:bg-gray-200 transition-colors duration-300"
          >
            <p className="flex justify-start items-center space-x-1">
              <FaEthereum />
              <span>{nftData.price} List</span>
            </p>
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded-md
          hover:bg-gray-200 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      ) : (
        <p className="flex justify-start items-center space-x-1 text-black font-semibold">
          <FaEthereum />
          <span>{nftData.price}</span>
        </p>
      )}
    </div>
  )
}

export default Card
