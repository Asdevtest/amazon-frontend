import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ProfileRequestStatus } from '@typings/enums/request/profile-request-status'

import { useStyles } from './parsing-request-cell.style'

interface ParsingRequestCellProps {
  status: ProfileRequestStatus
  onApproveProfile: () => void
  onRejectProfile: () => void
}

export const ParsingRequestCell: FC<ParsingRequestCellProps> = memo(props => {
  const { status, onApproveProfile, onRejectProfile } = props

  const { theme } = useStyles()

  if (status === ProfileRequestStatus.PENDING) {
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

  const statusText = status === ProfileRequestStatus.APPROVED ? t(TranslationKey.Approved) : t(TranslationKey.Rejected)
  const color = status === ProfileRequestStatus.APPROVED ? theme.palette.primary.main : theme.palette.text.red

  return <Text isCell color={color} text={statusText} />
})
