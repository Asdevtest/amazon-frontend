import React from 'react'

import {Container, Link, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './show-bar-or-hs-code-modal.style'

export const ShowBarOrHscodeModal = ({barcode, hscode, onCloseModal}) => {
  const classNames = useClassNames()
  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }
  const renderText = () => {
    if (barcode) {
      return (
        <div className={classNames.modalTitleWrapper}>
          <Link className={classNames.modalTitle} target="__blank" href={barcode}>
            {barcode}
          </Link>
          <img
            className={classNames.copyImg}
            src="/assets/icons/copy-img.svg"
            alt=""
            onClick={e => {
              e.stopPropagation()
              copyValue(barcode)
            }}
          />
        </div>
      )
    } else if (hscode) {
      return (
        <div className={classNames.modalTitleWrapper}>
          <Typography className={classNames.modalTitle}>{hscode}</Typography>
          <img
            className={classNames.copyImg}
            src="/assets/icons/copy-img.svg"
            alt=""
            onClick={e => {
              e.stopPropagation()
              copyValue(hscode)
            }}
          />
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
