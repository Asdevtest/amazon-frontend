import { Typography } from '@mui/material'

import { Button } from '@components/shared/button'
import { Modal } from '@components/shared/modal'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './warning-info-modal.style'

export const WarningInfoModal = props => {
  const { openModal, setOpenModal, title, btnText, onClickBtn, isWarning } = props

  if (!openModal) {
    return null
  }

  const { classes: styles, cx } = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.modalMessageWrapper}>
        <Typography variant="h6" className={cx(styles.title, { [styles.titleWarning]: isWarning })}>
          {title}
        </Typography>

        <Button styleType={ButtonStyle.SUCCESS} className={styles.button} onClick={onClickBtn}>
          {btnText}
        </Button>
      </div>
    </Modal>
  )
}
