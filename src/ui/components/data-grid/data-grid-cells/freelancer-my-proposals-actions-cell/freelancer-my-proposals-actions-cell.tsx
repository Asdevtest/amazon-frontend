import React, { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { disabledCancelBtnStatuses, noDisabledEditBtnStatuses } from '@constants/requests/request-proposal-status'
import { showResultStatuses } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './freelancer-my-proposals-actions-cell.style'

interface FreelancerMyProposalsActionsCellProps {
  status: string
  onClickDeleteButton: () => void
  onClickEditButton: () => void
  onClickResultButton: () => void
}

export const FreelancerMyProposalsActionsCell: FC<FreelancerMyProposalsActionsCellProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { status, onClickDeleteButton, onClickEditButton, onClickResultButton } = props

  return (
    <div className={styles.proposalsActions}>
      <Button
        danger
        disabled={disabledCancelBtnStatuses.includes(status)}
        className={styles.freelancerMyProposalsButton}
        onClick={onClickDeleteButton}
      >
        <CloseIcon />
      </Button>

      <Button
        className={styles.freelancerMyProposalsButton}
        disabled={!noDisabledEditBtnStatuses.includes(status)}
        onClick={onClickEditButton}
      >
        <EditOutlinedIcon />
      </Button>

      <Button success disabled={!showResultStatuses.includes(status)} onClick={onClickResultButton}>
        {t(TranslationKey.Result)}
      </Button>
    </div>
  )
})
