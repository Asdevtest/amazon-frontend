import { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { toast } from 'react-toastify'

import { Avatar as AvatarMui } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './avatar-editor-form.style'

export const AvatarEditorForm = ({ onSubmit, onCloseModal }) => {
  const { classes: styles, theme, cx } = useStyles()

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

  const labelStyle = {
    width: '100%',
    backgroundColor: theme.palette.background.chatIncomeMessage,
    textAlign: 'center',
    transition: '0.3s ease',
    cursor: 'pointer',
    color: theme.palette.text.general,
  }

  const borderStyle = {
    border: `2px dashed ${theme.palette.primary.main}`,
    transition: '0.3s ease',
    cursor: 'pointer',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey.Load)}</p>

      <div className={styles.mainWrapper}>
        <Avatar
          width={320}
          height={200}
          labelStyle={labelStyle}
          borderStyle={borderStyle}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
        />

        <AvatarMui className={styles.img} src={state.preview} />
      </div>

      <div className={styles.textsWrapper}>
        <p className={cx({ [styles.successText]: state.preview })}>
          {t(TranslationKey['The image size should not exceed'])} {<span className={styles.spanText}>{'15 mb.'}</span>}
        </p>

        <p className={cx({ [styles.successText]: state.preview })}>
          {t(TranslationKey['Allowed image formats'])}
          {'('}
          {<span className={styles.spanText}>{`'jpeg', 'jpg', 'png', 'webp', 'gif', 'ico', 'svg', 'avif'`}</span>}
          {')'}
        </p>
      </div>

      <div className={styles.btnsWrapper}>
        <Button disabled={!state.preview} onClick={() => onSubmit(state.preview)}>
          {t(TranslationKey.Load)}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} conClick={onCloseModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
