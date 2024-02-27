import { FC, MouseEvent, memo } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { disabledCancelBtnStatuses, noDisabledEditBtnStatuses } from '@constants/requests/request-proposal-status'
import { showResultStatuses } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

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

  const handleClick = (e: MouseEvent<HTMLButtonElement>, callback: () => void) => {
    e.stopPropagation()
    callback()
  }

  return (
    <div className={styles.proposalsActions}>
      <Button
        styleType={ButtonStyle.DANGER}
        disabled={disabledCancelBtnStatuses.includes(status)}
        className={styles.freelancerMyProposalsButton}
        onClick={(e: MouseEvent<HTMLButtonElement>) => handleClick(e, onClickDeleteButton)}
      >
        <CloseIcon />
      </Button>

      <Button
        className={styles.freelancerMyProposalsButton}
        disabled={!noDisabledEditBtnStatuses.includes(status)}
        onClick={(e: MouseEvent<HTMLButtonElement>) => handleClick(e, onClickEditButton)}
      >
        <EditOutlinedIcon />
      </Button>

      <Button
        styleType={ButtonStyle.SUCCESS}
        disabled={!showResultStatuses.includes(status)}
        onClick={(e: MouseEvent<HTMLButtonElement>) => handleClick(e, onClickResultButton)}
      >
        {t(TranslationKey.Result)}
      </Button>
    </div>
  )
})
