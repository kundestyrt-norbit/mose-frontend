import { SensorGraph } from './SensorGraph'
import { Sensor } from '../../../pages/api/sensor/_queryClient'

const DashBoardView = ({ dashboard }: any): JSX.Element => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      minWidth: '45%',
      maxWidth: '100%',
      alignItems: 'center',
      margin: '1% 1%',
      padding: '0',
      justifyContent: 'space-evenly'
    }}>
      <h1 style={{ minWidth: '100%', textAlign: 'center' }}>{dashboard.dashboardName}</h1>
      {dashboard.sensors?.map((sensor: Sensor) => {
        return (
          <div key={sensor.id.toString() + sensor.column} style={{ flexDirection: 'column', textAlign: 'center', minWidth: '45%', border: '1px solid rgba(0, 0, 0, 0.229)', borderRadius: '4px', margin: '1% 0' }}>
            <h2>{sensor.metaData?.friendlyName ?? sensor.column}</h2>
            <SensorGraph id={sensor.id} column={sensor.column} />
          </div>
        )
      })}
    </div>

  )
}

export default DashBoardView
