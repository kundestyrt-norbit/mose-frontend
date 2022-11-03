import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { getSensorsIncludeDashboard } from '../../../utils/dashboardUtils'
import { SensorIncludeDashboard } from './types'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function CheckboxesTags({ dashboardId, updateDashboard }: { dashboardId: string, updateDashboard: () => void }): JSX.Element {
  const [sensorList, setSensorList] = React.useState<SensorIncludeDashboard[]>([])
  const [value, setValue] = React.useState<SensorIncludeDashboard[]>([])
  React.useEffect(() => {
    getSensorsIncludeDashboard(dashboardId)
      .then(res => setSensorList(res)).catch(err => console.log(err))
  }, [])
  React.useEffect(() => {
    setValue(sensorList.filter(s => s.sensorIncludedInDashboard))
  }, [sensorList])

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={sensorList}
      disableCloseOnSelect
      value={value}
      onChange={(event, newValue, reason, detail) => {
        setValue(newValue)
        if (detail != null) {
          if (reason === 'removeOption') {
            fetch(`/api/dashboard/${dashboardId}/${detail.option.gatewayId}/${detail.option.id}/${detail.option.column}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-type': 'application/json'
                }
              })
              .then(() => updateDashboard()).catch(err => console.log(err))
          } else if (reason === 'selectOption') {
            fetch(`/api/dashboard/${dashboardId}/${detail.option.gatewayId}/${detail.option.id}/${detail.option.column}`,
              {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json'
                }
              })
              .then(async res => await res.json()).then(() => updateDashboard()).catch(err => console.log(err))
          }
        }
      }}
      getOptionLabel={(option) => option.metaData?.friendlyName ?? ''}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8, color: 'white' }}
            checked={selected}
          />
          {option.metaData?.friendlyName}
        </li>
      )}
      style={{ maxWidth: '100%', margin: '1% 3%' }}
      renderInput={(params) => (
        <TextField {...params} label="Add sensors" placeholder="Sensors" />
      )}
    />
  )
}
