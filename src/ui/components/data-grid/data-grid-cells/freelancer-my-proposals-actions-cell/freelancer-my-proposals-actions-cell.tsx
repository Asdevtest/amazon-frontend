import { FC, memo } from 'react'
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { disabledCancelBtnStatuses, noDisabledEditBtnStatuses } from '@constants/requests/request-proposal-status'
import { showResultStatuses } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

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
      <CustomButton
        icon={<MdOutlineEdit size={18} />}
        disabled={!noDisabledEditBtnStatuses.includes(status)}
        onClick={onClickEditButton}
      />

      <CustomButton
        danger
        icon={<MdOutlineDelete size={18} />}
        disabled={disabledCancelBtnStatuses.includes(status)}
        onClick={onClickDeleteButton}
      />

      <CustomButton type="primary" disabled={!showResultStatuses.includes(status)} onClick={onClickResultButton}>
        {t(TranslationKey.Result)}
      </CustomButton>
    </div>
  )
})
