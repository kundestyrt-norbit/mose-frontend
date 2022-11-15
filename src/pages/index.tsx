import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RedirectPage = (): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/dashboard').catch(err => console.log(err))
  }, [])
  return <div style={{ display: 'none' }}></div>
}

export default RedirectPage
