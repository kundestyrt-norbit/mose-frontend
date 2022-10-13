import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function FilterDash (): JSX.Element {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={areas}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8, color: 'white' }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ minWidth: '30%', margin: '1% 3%' }}
      renderInput={(params) => (
        <TextField {...params} label="choose environment area" placeholder="Areas" />
      )}
    />
  )
}

const areas = [
  { title: 'NORBIT Parking area' }
]
