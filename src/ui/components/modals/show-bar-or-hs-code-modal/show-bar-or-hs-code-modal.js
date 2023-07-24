import React from 'react'

import { Container, Link, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'

import { t } from '@utils/translations'

import { useClassNames } from './show-bar-or-hs-code-modal.style'

export const ShowBarOrHscodeModal = ({ barcode, hscode, onCloseModal }) => {
  const { classes: classNames } = useClassNames()

  const renderText = () => {
    if (barcode) {
      return (
        <div className={classNames.modalTitleWrapper}>
          <Link className={classNames.modalTitle} target="__blank" href={barcode}>
            {barcode}
          </Link>
          <CopyValue text={barcode} />
        </div>
      )
    } else if (hscode) {
      return (
        <div className={classNames.modalTitleWrapper}>
          <Typography className={classNames.modalTitle}>{hscode}</Typography>
          <CopyValue text={hscode} />
        </div>
      )
    } else {
      return <Typography className={classNames.modalNoTitle}>{t(TranslationKey['No data'])}</Typography>
    }
  }

  return (
    <Container disableGutters>
      <div className={classNames.modalWrapper}>
        {renderText()}
        <div className={classNames.modalBtnWrapper}>
          <Button onClick={onCloseModal}>{t(TranslationKey.Close)}</Button>
        </div>
      </div>
    </Container>
  )
}
