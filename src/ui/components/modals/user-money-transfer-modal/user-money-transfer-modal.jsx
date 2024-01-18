import { Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './user-money-transfer-modal.style'

export const UserMoneyTransferModal = ({ openModal, setOpenModal, isWithdraw }) => {
  const { classes: styles } = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.modalMessageWrapper}>
        <Typography paragraph className={styles.title}>
          {!isWithdraw ? t(TranslationKey['Withdraw money']) : t(TranslationKey['Add money'])}
        </Typography>

        <Typography paragraph className={styles.text}>
          {t(TranslationKey['Money transfer is possible with the administrator at the link below:'])}
        </Typography>

        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl('ссылка')}>
          <Typography className={styles.link}>{t(TranslationKey['Money transfer link'])}</Typography>
        </Link>

        <Button success disableElevation variant="contained" className={styles.button} onClick={setOpenModal}>
          {t(TranslationKey.Ok)}
        </Button>
      </div>
    </Modal>
  )
}
