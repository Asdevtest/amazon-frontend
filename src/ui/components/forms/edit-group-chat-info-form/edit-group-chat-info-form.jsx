import { cx } from '@emotion/css'
import { Typography, Avatar as AvatarMui } from '@mui/material'

import React, { useState } from 'react'

import Avatar from 'react-avatar-edit'

import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useClassNames } from './edit-group-chat-info-form.style'

export const EditGroupChatInfoForm = ({ onSubmit, onCloseModal, chat }) => {
  const { classes: classNames } = useClassNames()

  const [showInfoModal, setShowInfoModal] = useState(false)

  const [showInfoModalText, setShowInfoModalText] = useState('')

  const sourceState = {
    title: chat?.info?.title || '',
    preview: chat?.info?.image || null,
  }

  const [state, setState] = useState(sourceState)

  const onClose = () => {
    setState({ ...state, preview: null })
  }

  const onCrop = preview => {
    setState({ ...state, preview })
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

  const disanledSubmit = JSON.stringify(sourceState) === JSON.stringify(state) || !state.title.replace(/ /g, '')

  return (
    <div className={classNames.root}>
      <Typography variant="h4" className={classNames.mainTitle}>
        {t(TranslationKey['Change group chat info'])}
      </Typography>

      <Field
        label={t(TranslationKey['Name of group chat']) + '*'}
        labelClasses={classNames.labelField}
        value={state.title}
        onChange={e => setState({ ...state, title: e.target.value })}
      />

      <Field
        label={t(TranslationKey.Image)}
        labelClasses={classNames.labelField}
        inputComponent={
          <div className={classNames.mainWrapper}>
            <div className={classNames.avatarWrapper}>
              <Avatar
                exportAsSquare
                width={320}
                height={210}
                imageWidth={320}
                // imageHeight={210}
                labelStyle={{
                  width: '100%',
                  backgroundColor: SettingsModel.uiTheme === UiTheme.light ? '#EBEBEB' : '#36363F',
                  textAlign: 'center',
                  transition: '0.3s ease',
                  cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
                  color: SettingsModel.uiTheme === UiTheme.light ? '#001029' : '#fff',
                }}
                borderStyle={{
                  border: ' 3px dashed rgba(0,123, 255, .7)',
                  transition: '0.3s ease',
                  cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                // className={classNames.avatarImage}
                // src={state.preview}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
              />
            </div>
            <div className={classNames.imgWrapper}>
              <AvatarMui className={classNames.img} src={state.preview} />
            </div>
          </div>
        }
      />

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
        <Button disabled={disanledSubmit} onClick={() => onSubmit(state, sourceState)}>
          {t(TranslationKey.Save)}
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
