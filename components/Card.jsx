import { truncate } from '@/store'
import { FaEthereum } from 'react-icons/fa'

const Card = ({ nftData, btn }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <img src={nftData.imageUrl} alt={nftData.name} className="w-full h-56 object-cover mb-4" />
      <h2 className="text-xl font-bold">{nftData.name}</h2>
      <p className="text-gray-500 mb-4">{truncate(nftData.description, 100, 0, 103)}</p>
      {btn ? (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-md
        hover:bg-gray-200 transition-colors duration-300"
        >
          <p className="flex justify-start items-center space-x-1">
            <FaEthereum />
            <span>{nftData.price} List</span>
          </p>
        </button>
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
