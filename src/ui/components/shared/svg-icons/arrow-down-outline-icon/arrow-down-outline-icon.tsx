import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const ArrowDownOutlineIcon = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    // style={{ fill: 'none', stroke: 'correntColor' }}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.42857 1V6.53846H1L7 13L13 6.53846H9.57143V1H4.42857Z"
      strokeWidth="1.05"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
