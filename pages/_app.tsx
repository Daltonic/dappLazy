import '@/styles/global.css'
import { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { isWallectConnected } from '@/services/blockchain'
import { useGlobalState } from '@/store'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {
    const fetchData = async () => {
      await isWallectConnected()
    }

    fetchData()
  }, [connectedAccount])

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
