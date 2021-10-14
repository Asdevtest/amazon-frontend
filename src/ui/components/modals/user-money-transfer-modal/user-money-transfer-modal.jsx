import React from 'react'

import {Link, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './user-money-transfer-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').userMoneyTransferModal

export const UserMoneyTransferModal = ({openModal, setOpenModal, isWithdraw}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph variant="h3">
          {isWithdraw ? textConsts.titleWithdraw : textConsts.titleAdd}
        </Typography>

        <Typography paragraph>{'Перевод средств возможен при помощи администратора по ссылке ниже:'}</Typography>

        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl('ссылка')}>
          <Typography className={classNames.link}>{'Ссылка на перевод денежных средств'}</Typography>
        </Link>

        <Button disableElevation variant="contained" onClick={setOpenModal}>
          {textConsts.okBtn}
        </Button>
      </div>
    </Modal>
  )
}
