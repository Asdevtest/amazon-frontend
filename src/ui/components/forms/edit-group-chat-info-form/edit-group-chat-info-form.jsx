import { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { toast } from 'react-toastify'

import { Avatar as AvatarMui } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './edit-group-chat-info-form.style'

export const EditGroupChatInfoForm = ({ onSubmit, onCloseModal, chat }) => {
  const { classes: styles, cx } = useStyles()

  const sourceState = {
    title: chat?.info?.title || '',
    preview: chat?.info?.image || null,
  }

  const [state, setState] = useState(sourceState)

  const onClose = () => {
    setState({ ...state, preview: sourceState?.preview })
  }

  const onCrop = preview => {
    setState({ ...state, preview })
  }

  const onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 15728640) {
      toast.warning(t(TranslationKey['The file is too big!']))

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
      toast.warning(t(TranslationKey['Inappropriate format!']))

      elem.target.value = ''
    }
  }

  const disanledSubmit = JSON.stringify(sourceState) === JSON.stringify(state) || !state.title.replace(/ /g, '')
  const currentChatAvatar = state?.preview?.includes('data') ? state?.preview : getAmazonImageUrl(state?.preview, true)

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Change group chat info'])}</p>

      <Field
        inputProps={{ maxLength: 254 }}
        label={t(TranslationKey['Name of group chat']) + '*'}
        labelClasses={styles.label}
        value={state.title}
        onChange={e => setState({ ...state, title: e.target.value })}
      />

      <Field
        label={t(TranslationKey.Image)}
        labelClasses={styles.label}
        inputComponent={
          <div className={styles.mainWrapper}>
            <Avatar
              exportAsSquare
              height={180}
              labelStyle={{
                width: '100%',
                backgroundColor: SettingsModel.uiTheme === UiTheme.light ? '#EBEBEB' : '#36363F',
                textAlign: 'center',
                transition: '0.3s ease',
                cursor: 'pointer',
                color: SettingsModel.uiTheme === UiTheme.light ? '#001029' : '#fff',
              }}
              borderStyle={{
                border: ' 3px dashed rgba(0,123, 255, .7)',
                transition: '0.3s ease',
                cursor: 'pointer',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
            />
            <AvatarMui className={styles.avatar} src={currentChatAvatar} />
          </div>
        }
      />

      <div className={styles.textsWrapper}>
        <p className={cx(styles.standartText, { [styles.successText]: state.preview })}>
          {t(TranslationKey['The image size should not exceed'])} {<span className={styles.spanText}>{'15 mb.'}</span>}
        </p>

        <p className={cx(styles.standartText, { [styles.successText]: state.preview })}>
          {t(TranslationKey['Allowed image formats'])}
          {'('}
          {<span className={styles.spanText}>{`'jpeg', 'jpg', 'png', 'webp', 'gif', 'ico', 'svg', 'avif'`}</span>}
          {')'}
        </p>
      </div>

      <div className={styles.btnsWrapper}>
        <Button disabled={disanledSubmit} onClick={() => onSubmit(state, sourceState)}>
          {t(TranslationKey.Save)}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} className={styles.cancelBtn} onClick={onCloseModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
