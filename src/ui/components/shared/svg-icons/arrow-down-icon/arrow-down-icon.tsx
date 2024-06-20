import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const ArrowDownIcon = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    style={{ fill: 'none' }}
  >
    <path
      d="M15 1.5L8 8.5L1 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
