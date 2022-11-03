import { SensorMetaDataMap } from '../../../pages/api/sensor/_sensorMetaData'
import { SensorGraph } from './SensorGraph'
import { Dashboard, Sensor } from './types'

const DashBoardView = ({ dashboard }: { dashboard: Dashboard }): JSX.Element => {
  console.log(dashboard.sensors)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '100%',
      alignItems: 'center',
      margin: '1% 1%',
      padding: '0',
      justifyContent: 'space-evenly'
    }}>
      <h1 style={{ width: '100%', textAlign: 'center', margin: '1% 3%' }}>{dashboard.dashboardName}</h1>
      {dashboard.sensors?.map((sensor: Sensor) => {
        return (
          <div key={sensor.id.toString() + sensor.column} style={{ flexDirection: 'column', textAlign: 'center', width: '45%', minWidth: '350px', border: '1px solid rgba(0, 0, 0, 0.229)', borderRadius: '4px', margin: '1% 0' }}>
            <h2 style={{ height: '3rem' }}>{SensorMetaDataMap[sensor.column].friendlyName ?? sensor.column}</h2>
            <SensorGraph id={sensor.id} column={sensor.column} ></SensorGraph>
          </div>
        )
      })}
    </div>

  )
}

export default DashBoardView
