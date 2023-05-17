import Link from 'next/link'
import { truncate, useGlobalState } from '@/store'
import { connectWallet } from '@/services/blockchain'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
      <Link href="/" className="text-black text-2xl font-bold">
        DappLazy
      </Link>

      {connectedAccount ? (
        <>
          <nav className="hidden sm:flex gap-6">
            <Link
              className="text-black hover:text-blue-500 transition-colors duration-300"
              href="/collection"
            >
              Collection
            </Link>

            <Link
              className="text-black hover:text-blue-500 transition-colors duration-300"
              href="/create"
            >
              Create
            </Link>
          </nav>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md
        hover:bg-gray-200 transition-colors duration-300"
          >
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded-md
          hover:bg-gray-200 transition-colors duration-300"
        >
          Connect Wallet
        </button>
      )}
    </header>
  )
}

export default Header
