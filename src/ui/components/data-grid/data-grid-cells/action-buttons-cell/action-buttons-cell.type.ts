import { DefaultButtonStyles } from '@typings/enums/default-button-style'

export interface ActionButtonsCellProps {
  isFirstRow?: boolean
  firstButtonText?: string
  secondButtonText?: string
  thirdButtonText?: string
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
