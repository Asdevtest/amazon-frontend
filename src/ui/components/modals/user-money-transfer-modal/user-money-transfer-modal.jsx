import React from 'react'

import {Link, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'

import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './user-money-transfer-modal.style'

export const UserMoneyTransferModal = ({openModal, setOpenModal, isWithdraw}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph className={classNames.title}>
          {!isWithdraw ? t(TranslationKey['Withdraw money']) : t(TranslationKey['Add money'])}
        </Typography>

        <Typography paragraph>
          {t(TranslationKey['Money transfer is possible with the administrator at the link below:'])}
        </Typography>

        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl('ссылка')}>
          <Typography className={classNames.link}>{t(TranslationKey['Money transfer link'])}</Typography>
        </Link>

        <Button disableElevation variant="contained" onClick={setOpenModal}>
          {t(TranslationKey.Ok)}
        </Button>
      </div>
    </Modal>
  )
}
