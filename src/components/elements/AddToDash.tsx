import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { getDashboardsIncludeHasSensor } from '../../utils/dashboardUtils'
import { DashboardListItem, Sensor } from './dashboard/types'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function CheckboxesTags ({ id, column, gatewayId }: Pick<Sensor, 'gatewayId' | 'column' | 'id'>): JSX.Element {
  const [dashboardList, setDashboardList] = React.useState<DashboardListItem[]>([])
  const [value, setValue] = React.useState<DashboardListItem[]>([])
  React.useEffect(() => {
    getDashboardsIncludeHasSensor(gatewayId, id, column)
      .then(res => setDashboardList(res)).catch(err => console.log(err))
  }, [])
  React.useEffect(() => {
    setValue(dashboardList.filter(d => d.hasSensor))
  }, [dashboardList])

  return (
    <>
      {dashboardList.length > 0 &&
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={dashboardList}
          disableCloseOnSelect
          value={value}
          onChange={(event, newValue, reason, detail) => {
            setValue(newValue)
            if (detail != null) {
              if (reason === 'removeOption') {
                fetch(`/api/dashboard/${detail.option.dashboardId}/${gatewayId}/${id}/${column}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-type': 'application/json'
                    }
                  })
                  .catch(err => console.log(err))
              } else if (reason === 'selectOption') {
                fetch(`/api/dashboard/${detail.option.dashboardId}/${gatewayId}/${id}/${column}`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-type': 'application/json'
                    }
                  })
                  .then(async res => await res.json()).catch(err => console.log(err))
              }
            }
          }}
          getOptionLabel={(option) => option.dashboardName}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8, color: 'white' }}
                checked={selected}
              />
              {option.dashboardName}
            </li>
          )}
          style={{ minWidth: '100%', margin: '3% 0%' }}
          renderInput={(params) => (
            <TextField {...params} label="Add to dashboard" placeholder="Dashboards" />
          )}
        />
      }
    </>
  )
}
