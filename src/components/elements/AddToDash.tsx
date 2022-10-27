import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { getDashboards } from '../../utils/dashboardUtils'
import { DashboardListItem } from './dashboard/types'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function CheckboxesTags(): JSX.Element {
  const [dashboardList, setDashboardList] = React.useState<DashboardListItem[]>([])
  React.useEffect(() => {
    getDashboards().then(res => setDashboardList(res)).catch(err => console.log(err))
  }, [])
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={dashboardList}
      disableCloseOnSelect
      getOptionLabel={(option) => option.dashboardName}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8, color: 'white' }}
            checked={selected}
            onChange={() => {
              if (checkedIcon) {

              } else {

              }
            }}
          />
          {option.dashboardName}
        </li>
      )}
      style={{ minWidth: '30%', margin: '3%' }}
      renderInput={(params) => (
        <TextField {...params} label="Add to dashboard" placeholder="Dashboards" />
      )}
    />
  )
}
