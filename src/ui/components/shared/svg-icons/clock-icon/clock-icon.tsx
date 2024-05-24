import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const ClockIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 9.42265V5C11 4.448 10.552 4 10 4C9.448 4 9 4.448 9 5V9.98884C8.99824 10.1653 9.04325 10.3397 9.13 10.4931C9.22746 10.6587 9.35597 10.7849 9.50967 10.8716L13.8301 13.366C14.3082 13.642 14.9202 13.478 15.1962 13C15.4722 12.522 15.3082 11.91 14.8301 11.634L11 9.42265ZM10 0C15.523 0 20 4.47701 20 10C20 15.523 15.523 20 10 20C4.47701 20 0 15.523 0 10C0 4.47701 4.47701 0 10 0Z"
      // fill="url(#paint0_linear_14353_369789)"
    />
    <defs>
      <linearGradient id="paint0_linear_14353_369789" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5BA0FE" />
        <stop offset="0.0001" stopColor="#0164F4" />
        <stop offset="1" stopColor="#0164F4" />
      </linearGradient>
    </defs>
  </SvgIcon>
)
