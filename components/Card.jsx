const Card = ({ nftData }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-80">
      <img src={nftData.imageUrl} alt={nftData.name} className="w-full h-auto mb-4" />
      <h2 className="text-xl font-bold">{nftData.name}</h2>
      <p className="text-gray-500 mb-4">{nftData.description}</p>
      <p className="text-blue-500 font-semibold">{nftData.price}</p>
    </div>
  )
}

export default Card
