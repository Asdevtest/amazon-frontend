import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const FavoritesIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="23" cy="23" r="23" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 13.5C13 12.1193 14.1193 11 15.5 11H29.5C30.8807 11 32 12.1193 32 13.5V36L22.5 30.4421L13 36L13 13.5ZM16 14V30.4421L22 26.8032H22.5H23L29 30.4421V14H16Z"
      fill="white"
    />
  </SvgIcon>
)
