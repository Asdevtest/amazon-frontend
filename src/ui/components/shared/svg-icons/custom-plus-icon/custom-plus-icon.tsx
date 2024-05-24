import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const CustomPlusIcon = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 12, height: 12, fill: 'currentColor' }}
  >
    <rect x="5" y="0" width="2" height="12" />
    <rect x="0" y="5" height="2" width="12" />
  </SvgIcon>
)
