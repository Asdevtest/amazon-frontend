import { Link, Typography } from '@mui/material'

import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './user-money-transfer-modal.style'

export const UserMoneyTransferModal = ({ openModal, setOpenModal, isWithdraw }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph className={classNames.title}>
          {!isWithdraw ? t(TranslationKey['Withdraw money']) : t(TranslationKey['Add money'])}
        </Typography>

        <Typography paragraph className={classNames.text}>
          {t(TranslationKey['Money transfer is possible with the administrator at the link below:'])}
        </Typography>

        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl('ссылка')}>
          <Typography className={classNames.link}>{t(TranslationKey['Money transfer link'])}</Typography>
        </Link>

        <Button success disableElevation variant="contained" className={classNames.button} onClick={setOpenModal}>
          {t(TranslationKey.Ok)}
        </Button>
      </div>
    </Modal>
  )
}
