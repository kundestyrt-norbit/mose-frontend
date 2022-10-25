import PageLayoutWrapper from '../layout/PageLayoutWrapper'
import 'leaflet/dist/leaflet.css'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/images/marker-icon-2x.png'
import Link from 'next/link'
import { Button } from '@mui/material'

function useMyCustomHook<T extends HTMLElement> (): { ref: MutableRefObject<T | null> } {
  const myRef = useRef<T>(null)
  // do something with the ref, e.g. adding event listeners
  return { ref: myRef }
}

const Map = (): JSX.Element => {
  const { ref: boxRef } = useMyCustomHook<HTMLDivElement>()

  // Y
  const [y, setY] = useState(0)

  // This function calculate X and Y
  const getPosition = (): void => {
    const y = boxRef.current?.offsetTop ?? 0
    setY(y)
  }

  // Get the position of the red box in the beginning
  useEffect(() => {
    getPosition()
  }, [])

  // Re-calculate X and Y of the red box when the window is resized by the user
  useEffect(() => {
    window.addEventListener('resize', getPosition)
  }, [])

  return (
    <PageLayoutWrapper>
      <div ref={boxRef} style={{ height: 'calc(100vh - ' + y.toString() + 'px)', width: '100%' }}>
        {window !== undefined && y !== 0 &&
          <MapContainer center={[63.443016, 10.429332]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[63.443016, 10.429332]}>
              <Popup>
                <Link href='/list'>
                  <Button>📡NORBIT <br /> </Button>
                </Link>
              </Popup>

            </Marker>
            <Marker position={[63.419728, 10.401713]}>
              <Popup>
                🏖GLØSHAUGEN <br />
              </Popup>
            </Marker>
          </MapContainer>
        }
      </div>
    </PageLayoutWrapper>
  )
}

export default Map
