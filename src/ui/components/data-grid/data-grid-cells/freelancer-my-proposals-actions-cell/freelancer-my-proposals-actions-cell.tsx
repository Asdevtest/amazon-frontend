import { FC, memo } from 'react'

import { disabledCancelBtnStatuses, noDisabledEditBtnStatuses } from '@constants/requests/request-proposal-status'
import { showResultStatuses } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './freelancer-my-proposals-actions-cell.style'

interface FreelancerMyProposalsActionsCellProps {
  status: string
  onClickDeleteButton: () => void
  onClickEditButton: () => void
  onClickResultButton: () => void
}

export const FreelancerMyProposalsActionsCell: FC<FreelancerMyProposalsActionsCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { status, onClickDeleteButton, onClickEditButton, onClickResultButton } = props

  return (
    <div className={styles.proposalsActions}>
      <Button
        iconButton
        isTableButton
        disabled={!noDisabledEditBtnStatuses.includes(status)}
        onClick={onClickEditButton}
      >
        <EditIcon />
      </Button>

      <Button
        iconButton
        isTableButton
        styleType={ButtonStyle.DANGER}
        disabled={disabledCancelBtnStatuses.includes(status)}
        onClick={onClickDeleteButton}
      >
        <CrossIcon />
      </Button>

      <Button
        isTableButton
        styleType={ButtonStyle.SUCCESS}
        disabled={!showResultStatuses.includes(status)}
        onClick={onClickResultButton}
      >
        {t(TranslationKey.Result)}
      </Button>
    </div>
  )
})
