import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, TextCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { RequestStatus } from '@typings/enums/request/request-status'

import { useStyles } from './parsing-request-cell.style'

interface ParsingRequestCellProps {
  status: RequestStatus
  onApproveProfile: () => void
  onRejectProfile: () => void
}

export const ParsingRequestCell: FC<ParsingRequestCellProps> = memo(props => {
  const { status, onApproveProfile, onRejectProfile } = props

  const { theme } = useStyles()

  if (status === RequestStatus.PENDING) {
    return (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        firstButtonElement={t(TranslationKey.Approve)}
        secondButtonElement={t(TranslationKey.Reject)}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={onApproveProfile}
        onClickSecondButton={onRejectProfile}
      />
    )
  }

  const statusText = status === RequestStatus.APPROVED ? t(TranslationKey.Approved) : t(TranslationKey.Rejected)
  const color = status === RequestStatus.APPROVED ? theme.palette.primary.main : theme.palette.text.red

  return <TextCell color={color} text={statusText} />
})
