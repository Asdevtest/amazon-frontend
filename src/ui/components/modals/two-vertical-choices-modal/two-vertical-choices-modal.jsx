import { memo } from 'react'

import { Button } from '@components/shared/button'
import { Modal } from '@components/shared/modal'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './two-vertical-choices-modal.style'

export const TwoVerticalChoicesModal = memo(
  ({
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
        <div className={styles.wrapper}>
          <p className={styles.title}>{title}</p>

          <Button tooltipInfoContent={tooltipFirstButton} onClick={onClickTopBtn}>
            {topBtnText}
          </Button>

          <Button tooltipInfoContent={tooltipSecondButton} variant={ButtonVariant.OUTLINED} onClick={onClickBottomBtn}>
            {bottomBtnText}
          </Button>

          {onClickThirdBtn && thirdBtnText && (
            <Button tooltipInfoContent={tooltipThirdButton} variant={ButtonVariant.OUTLINED} onClick={onClickThirdBtn}>
              {thirdBtnText}
            </Button>
          )}
        </div>
      </Modal>
    )
  },
)
