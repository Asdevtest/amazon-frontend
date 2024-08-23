import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const ArrowUpIcon = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="9"
    viewBox="0 0 16 9"
    fill="none"
    style={{ fill: 'none' }}
  >
    <path d="M15 8L8 1L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)
