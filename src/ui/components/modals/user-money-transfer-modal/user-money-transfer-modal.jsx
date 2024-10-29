import { memo } from 'react'

import { Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './user-money-transfer-modal.style'

export const UserMoneyTransferModal = memo(({ openModal, setOpenModal, isWithdraw }) => {
  const { classes: styles } = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.modalMessageWrapper}>
        <p className={styles.title}>
          {!isWithdraw ? t(TranslationKey['Withdraw money']) : t(TranslationKey['Add money'])}
        </p>

        <p className={styles.text}>
          {t(TranslationKey['Money transfer is possible with the administrator at the link below:'])}
        </p>

        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl('ссылка')}>
          <p className={styles.link}>{t(TranslationKey['Money transfer link'])}</p>
        </Link>

        <CustomButton type="primary" onClick={setOpenModal}>
          {t(TranslationKey.Ok)}
        </CustomButton>
      </div>
    </Modal>
  )
})
