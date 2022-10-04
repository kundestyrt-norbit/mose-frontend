import dynamic from 'next/dynamic'

export default function Map (): JSX.Element {
  const Map = dynamic(
    async () => await import('../components/elements/Map'),
    { ssr: false }
  )
  return <Map />
}
