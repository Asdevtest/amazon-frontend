import { useState } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/button'
import { CustomAvatar } from '@components/shared/custom-avatar'
import { Field } from '@components/shared/field'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './edit-group-chat-info-form.style'

export const EditGroupChatInfoForm = ({ onSubmit, onCloseModal, chat }) => {
  const { classes: styles, cx } = useStyles()

  const sourceState = {
    title: chat?.info?.title || '',
    preview: chat?.info?.image || null,
  }

  const [state, setState] = useState(sourceState)

  const onChangeImage = preview => {
    setState({ ...state, preview })
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

      <div className={styles.editImageContainer}>
        <div className={styles.avatarContainer}>
          <CustomAvatar isEditable initialUrl={currentChatAvatar} onSubmit={onChangeImage} />
        </div>
      </div>

      <div className={styles.textsWrapper}>
        <p className={cx(styles.standartText, { [styles.successText]: state.preview })}>
          {t(TranslationKey['The image size should not exceed'])} {<span className={styles.spanText}>{'15 mb.'}</span>}
        </p>

        <p className={cx(styles.standartText, { [styles.successText]: state.preview })}>
          {t(TranslationKey['Allowed image formats'])}
          {'('}
          {<span className={styles.spanText}>{`'jpeg', 'jpg', 'png', 'webp', 'svg', 'avif'`}</span>}
          {')'}
        </p>
      </div>

      <div className={styles.btnsWrapper}>
        <Button disabled={disanledSubmit} onClick={() => onSubmit(state, sourceState)}>
          {t(TranslationKey.Save)}
        </Button>

        <Button styleType={ButtonStyle.CASUAL} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
