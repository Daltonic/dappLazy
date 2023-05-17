import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
      <Link href="/" className="text-black text-2xl font-bold">
        Lazy
      </Link>
      <nav className="flex gap-6">
        <Link
          className="text-black hover:text-blue-500 transition-colors duration-300"
          href="/collections"
        >
          Collections
        </Link>
        <Link
          className="text-black hover:text-blue-500 transition-colors duration-300"
          href="/create"
        >
          Create
        </Link>
      </nav>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300">
        Connect Wallet
      </button>
    </header>
  )
}

export default Header
