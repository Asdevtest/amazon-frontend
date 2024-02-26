import { DefaultButtonStyles } from '@typings/enums/default-button-style'

export interface ActionButtonsCellProps {
  isFirstRow?: boolean
  row?: boolean
  buttonWrapperClassName?: string
  buttonClassName?: string
  resetStyles?: boolean
  firstButtonElement?: string | JSX.Element
  secondButtonElement?: string | JSX.Element
  thirdButtonElement?: string | JSX.Element
  firstButtonTooltipText?: string
  secondButtonTooltipText?: string
  thirdButtonTooltipText?: string
  isFirstButton?: boolean
  isSecondButton?: boolean
  isThirdButton?: boolean
  firstVariantStyle?: DefaultButtonStyles
  secondVariantStyle?: DefaultButtonStyles
  thirdVariantStyle?: DefaultButtonStyles
  onClickFirstButton?: () => void
  onClickSecondButton?: () => void
  onClickThirdButton?: () => void
}
