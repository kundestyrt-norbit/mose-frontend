import { SvgIcon, SvgIconProps } from '@mui/material'

function Icon (props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
        <path
            d="M139 453C71 418 25 359 10 287c-6-29-9-105-8-168L5 5h150c141 0 153 1 195 25 127 71 163 238 77 353-41 54-124 97-187 97-31 0-65-9-101-27zm72-144l27-34 4 34c3 34 3 34 53 34h50l3-117 3-116h-45c-39 0-47 4-65 33l-21 32v-65H110v113c0 63 2 116 4 118s19 4 37 3c24-1 39-10 60-35z"
            transform="matrix(.1 0 0 -.1 0 48)"
        ></path>
    </SvgIcon>
  )
}

export default Icon
