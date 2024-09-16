import { ReactNode } from 'react'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

export interface ActionButtonsCellProps {
  fullWidth?: boolean
  isFirstRow?: boolean
  iconButton?: boolean
  row?: boolean
  buttonWrapperClassName?: string
  buttonClassName?: string
  firstButtonElement?: string | JSX.Element
  secondButtonElement?: string | JSX.Element
  thirdButtonElement?: string | JSX.Element
  firstButtonTooltipText?: string
  secondButtonTooltipText?: string
  thirdButtonTooltipText?: string
  isFirstButton?: boolean
  isSecondButton?: boolean
  isThirdButton?: boolean
  firstButtonStyle?: ButtonStyle
  secondButtonStyle?: ButtonStyle
  thirdButtonStyle?: ButtonStyle
  firstButtonVariant?: ButtonVariant
  secondButtonVariant?: ButtonVariant
  thirdButtonVariant?: ButtonVariant
  disabledFirstButton?: boolean
  disabledSecondButton?: boolean
  disabledThirdButton?: boolean
  firstDescriptionText?: ReactNode
  secondDescriptionText?: ReactNode
  thirdDescriptionText?: ReactNode
  onClickFirstButton?: () => void
  onClickSecondButton?: () => void
  onClickThirdButton?: () => void
}
