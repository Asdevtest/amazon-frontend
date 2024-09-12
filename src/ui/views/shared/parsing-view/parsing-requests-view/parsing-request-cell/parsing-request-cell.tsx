import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

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
        showFirst
        showSecond
        secondDanger
        firstContent={t(TranslationKey.Approve)}
        secondContent={t(TranslationKey.Reject)}
        onClickFirst={onApproveProfile}
        onClickSecond={onRejectProfile}
      />
    )
  }

  const statusText = status === ProfileRequestStatus.APPROVED ? t(TranslationKey.Approved) : t(TranslationKey.Rejected)
  const color = status === ProfileRequestStatus.APPROVED ? theme.palette.primary.main : theme.palette.text.red

  return <Text isCell color={color} text={statusText} />
})
