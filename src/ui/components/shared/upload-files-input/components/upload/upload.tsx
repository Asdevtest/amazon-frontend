import { ChangeEvent, FC, MouseEventHandler, memo } from 'react'

import { docValidTypes } from '@constants/media/doc-types'
import { imageValidTypes } from '@constants/media/image-types'
import { videoValidTypes } from '@constants/media/video-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './upload.style'

import { generateAcceptString } from '../../helpers/generate-accept-string'

interface UploadProps {
  onUploadFiles: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  minimized?: boolean
  acceptTypes?: string[]
  withoutTitles?: boolean
  dragAndDropButtonHeight?: number
}

export const Upload: FC<UploadProps> = memo(props => {
  const {
    onUploadFiles,
    disabled,
    minimized,
    acceptTypes = [...videoValidTypes, ...docValidTypes, ...imageValidTypes],
    withoutTitles,
    dragAndDropButtonHeight,
  } = props

  const { classes: styles, cx } = useStyles()

  const handleInputClick: MouseEventHandler<HTMLInputElement> = event => {
    event.currentTarget.value = ''
  }

  return (
    <div className={cx(styles.uploadInputWrapper, { [styles.uploadInputWrapperMinimazed]: minimized })}>
      {!withoutTitles && !minimized ? <p className={styles.attachFiles}>{t(TranslationKey['Attach files'])}</p> : null}

      <button
        disabled={disabled}
        className={cx(styles.uploadButton, {
          [styles.uploadButtonMinimized]: minimized,
        })}
        style={{ height: dragAndDropButtonHeight }}
      >
        {minimized ? (
          <>
            {t(TranslationKey['Add file'])}
            <CustomPlusIcon />
          </>
        ) : (
          t(TranslationKey['Click or Drop here'])
        )}

        <input
          multiple
          type="file"
          title={t(TranslationKey['File not selected'])}
          accept={generateAcceptString(acceptTypes)}
          className={styles.uploadInput}
          onChange={onUploadFiles}
          onClick={handleInputClick}
        />
      </button>
    </div>
  )
})
