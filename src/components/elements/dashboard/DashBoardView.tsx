import { SensorGraph } from './SensorGraph'
import { Sensor } from '../../../pages/api/sensor/_queryClient'

const DashBoardView = ({ dashboard }: any): JSX.Element => {
  console.log(dashboard)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '1% 3%',
      padding: '0'
    }}>
      <h1>{dashboard.dashboardName}</h1>
      {dashboard.sensors?.forEach((sensor: Sensor) => {
        <SensorGraph id={sensor.id} sensor={sensor.column} />
      })}
    </div>

  )
}

export default DashBoardView
