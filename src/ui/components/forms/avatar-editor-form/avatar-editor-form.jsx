import { cx } from '@emotion/css'
import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'

import { Avatar as AvatarMui, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useClassNames } from './avatar-editor-form.style'

export const AvatarEditorForm = ({ onSubmit, onCloseModal }) => {
  const { classes: classNames, theme } = useClassNames()
  const [showInfoModal, setShowInfoModal] = useState(false)

  const [showInfoModalText, setShowInfoModalText] = useState('')

  const [state, setState] = useState({
    preview: null,
  })

  const onClose = () => {
    setState({ preview: null })
  }

  const onCrop = preview => {
    setState({ preview })
  }

  const onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 15728640) {
      setShowInfoModalText(t(TranslationKey['The file is too big!']))
      setShowInfoModal(true)
      elem.target.value = ''
    } else if (
      ![
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/ico',
        'image/gif',
        'image/svg',
        'image/webp',
        'image/avif',
      ].includes(elem.target.files[0].type)
    ) {
      setShowInfoModalText(t(TranslationKey['Inappropriate format!']))
      setShowInfoModal(true)
      elem.target.value = ''
    }
  }

  const labelStyle = {
    width: '100%',
    backgroundColor: theme.palette.background.chatIncomeMessage,
    textAlign: 'center',
    transition: '0.3s ease',
    cursor: 'pointer',
    color: theme.palette.text.general,
  }

  const borderStyle = {
    border: `3px dashed ${theme.palette.primary.main}`,
    transition: '0.3s ease',
    cursor: 'pointer',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
  }

  return (
    <div className={classNames.root}>
      <Typography variant="h4" className={classNames.mainTitle}>
        {t(TranslationKey.Load)}
      </Typography>

      <div className={classNames.mainWrapper}>
        <div className={classNames.avatarWrapper}>
          <Avatar
            width={320}
            height={210}
            imageWidth={320}
            // imageHeight={210}
            labelStyle={labelStyle}
            borderStyle={borderStyle}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
          />
        </div>

        <div className={classNames.imgWrapper}>
          <AvatarMui className={classNames.img} src={state.preview} />
        </div>
      </div>

      <div className={classNames.textsWrapper}>
        <Typography className={cx(classNames.standartText, { [classNames.successText]: state.preview })}>
          {t(TranslationKey['The image size should not exceed'])}{' '}
          {<span className={classNames.spanText}>{'15 mb.'}</span>}
        </Typography>

        <Typography className={cx(classNames.standartText, { [classNames.successText]: state.preview })}>
          {t(TranslationKey['Allowed image formats'])}
          {'('}
          {<span className={classNames.spanText}>{`'jpeg', 'jpg', 'png', 'webp', 'gif', 'ico', 'svg', 'avif'`}</span>}
          {')'}
        </Typography>
      </div>

      <div className={classNames.btnsWrapper}>
        <Button disabled={!state.preview} onClick={() => onSubmit(state.preview)}>
          {t(TranslationKey.Load)}
        </Button>

        <Button variant="text" className={classNames.cancelBtn} onClick={onCloseModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>

      <WarningInfoModal
        openModal={showInfoModal}
        setOpenModal={() => setShowInfoModal(!showInfoModal)}
        title={showInfoModalText}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          setShowInfoModal(!showInfoModal)
        }}
      />
    </div>
  )
}
