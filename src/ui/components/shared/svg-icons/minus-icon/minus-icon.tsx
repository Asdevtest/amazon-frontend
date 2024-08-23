import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const MinusIcon = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="3"
    viewBox="0 0 10 3"
    style={{ fill: 'currentColor' }}
  >
    <path d="M1 1.5H9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SvgIcon>
)
