import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const PrintIcon = (props: SvgIconProps) => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    style={{ fill: 'currentColor' }}
    {...props}
  >
    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3m-3 11H8v-5h8zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-1-9H6v4h12z" />
  </SvgIcon>
)
