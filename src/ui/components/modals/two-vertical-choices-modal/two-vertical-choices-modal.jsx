import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './two-vertical-choices-modal.style'

export const TwoVerticalChoicesModal = ({
  openModal,
  setOpenModal,
  title,
  topBtnText,
  onClickTopBtn,
  bottomBtnText,
  onClickBottomBtn,
  tooltipFirstButton,
  tooltipSecondButton,
  tooltipThirdButton,
  thirdBtnText,
  onClickThirdBtn,
}) => {
  const { classes: styles } = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.modalMessageWrapper}>
        <Typography variant="h5" className={styles.title}>
          {title}
        </Typography>

        <div className={styles.resultButtonsWrapper}>
          <Button tooltipInfoContent={tooltipFirstButton} className={styles.button} onClick={onClickTopBtn}>
            {topBtnText}
          </Button>
          <Button
            tooltipInfoContent={tooltipSecondButton}
            variant={ButtonVariant.OUTLINED}
            className={styles.bottomBtnText}
            onClick={onClickBottomBtn}
          >
            {bottomBtnText}
          </Button>
          {onClickThirdBtn && thirdBtnText && (
            <Button
              tooltipInfoContent={tooltipThirdButton}
              variant={ButtonVariant.OUTLINED}
              className={styles.bottomBtnText}
              onClick={onClickThirdBtn}
            >
              {thirdBtnText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
