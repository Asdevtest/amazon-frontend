import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const EditIcon = (props: SvgIconProps) => (
  <SvgIcon
    style={{ fill: 'transparent', stroke: 'currentColor' }}
    width="22"
    height="23"
    viewBox="0 0 22 23"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.331 3.3412L18.8055 9.06437L6.85899 21.5536L0.948158 22.9796C0.888267 22.9936 0.829599 23 0.770931 23C0.290584 23 -0.0944267 22.5285 0.0204654 22.0084L1.3845 15.8304L13.331 3.3412ZM14.1953 2.43768L15.6189 0.949389C16.2227 0.316889 17.0159 0 17.808 0C18.6012 0 19.3932 0.316889 19.9982 0.949389L21.0934 2.09428C22.3022 3.358 22.3022 5.40756 21.0934 6.67256L19.6698 8.16084L14.1953 2.43768Z"
    />
  </SvgIcon>
)
