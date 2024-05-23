import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const ArrowUpOutlineIcon = (props: SvgIconProps) => (
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
      d="M4.42857 13V7.46154H1L7 1L13 7.46154H9.57143V13H4.42857Z"
      strokeWidth="1.05"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)
