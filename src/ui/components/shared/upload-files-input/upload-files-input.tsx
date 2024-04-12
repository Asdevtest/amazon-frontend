import { FC, memo } from 'react'

import { docValidTypes } from '@constants/media/doc-types'
import { imageValidTypes } from '@constants/media/image-types'
import { videoValidTypes } from '@constants/media/video-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './upload-files-input.style'

import { CustomPlusIcon } from '../svg-icons'

import { Files } from './components'
import { generateAcceptString } from './helpers/generate-accept-string'
import { UploadFilesInputProps } from './upload-files-input.type'
import { useUploadFilesInput } from './use-upload-files-input'

export const UploadFilesInput: FC<UploadFilesInputProps> = memo(props => {
  const {
    maxNumber = 50,
    acceptTypes = [...videoValidTypes, ...docValidTypes, ...imageValidTypes],
    disabled,
    dragAndDropButtonHeight,
    maxHeight,
    minimized,
    title,
    withComment,
    withoutActionsButtons,
    withoutLinks,
    withoutTitles,
  } = props

  const { classes: styles, cx } = useStyles()

  const {
    currentFileIndex,
    disabledLoadButton,
    files,
    setFiles,
    linkInput,
    linkInputError,
    showImages,
    showGalleryModal,
    onChangeComment,
    onChangeLink,
    onLoadFile,
    onRemoveFile,
    onShowImages,
    onShowGalleryModal,
    onUploadFile,
    onUploadFiles,
  } = useUploadFilesInput(props)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={cx(styles.wrapper, { [styles.minimazed]: minimized })}>
          {!withoutLinks ? (
            <div className={cx(styles.linkInputWrapper, { [styles.linkInputWrapperMinimazed]: minimized })}>
              <Field
                disabled={disabled}
                placeholder={t(TranslationKey.Link)}
                tooltipInfoContent={t(TranslationKey['Ability to attach photos/documents/links'])}
                label={withoutTitles ? '' : title ? title : t(TranslationKey['Attach file'])}
                labelClasses={styles.label}
                error={linkInputError && t(TranslationKey['Invalid link!'])}
                containerClasses={styles.linkInputContainer}
                inputClasses={styles.linkInput}
                value={linkInput}
                onChange={onChangeLink}
              />

              <Button
                disabled={disabledLoadButton}
                tooltipInfoContent={t(TranslationKey['Adds a document/file from the entered link'])}
                className={styles.loadButton}
                onClick={onLoadFile}
              >
                {t(TranslationKey.Load)}
              </Button>
            </div>
          ) : null}

          <div className={cx(styles.uploadInputWrapper, { [styles.uploadInputWrapperMinimazed]: minimized })}>
            {!withoutTitles && !minimized ? (
              <p className={styles.attachFiles}>{t(TranslationKey['Attach files'])}</p>
            ) : null}

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
                accept={generateAcceptString(acceptTypes)}
                className={styles.uploadInput}
                onChange={onUploadFiles}
              />
            </button>
          </div>
        </div>

        {!withoutActionsButtons ? (
          <div className={styles.buttonsWrapper}>
            <Button disabled={files?.length === 0} variant={ButtonVariant.OUTLINED} onClick={onShowImages}>
              {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
            </Button>

            <p className={styles.imagesCount}>
              <span className={styles.imagesCountSpan}>{`${files?.length || 0}/${maxNumber}`}</span>
              {t(TranslationKey.files)}
            </p>

            <Button
              disabled={files?.length === 0}
              styleType={ButtonStyle.DANGER}
              variant={ButtonVariant.OUTLINED}
              onClick={() => setFiles([])}
            >
              {t(TranslationKey['Remove all'])}
            </Button>
          </div>
        ) : null}

        {showImages ? (
          <Files
            files={files}
            maxHeight={maxHeight}
            withComment={withComment}
            onRemoveFile={onRemoveFile}
            onShowGalleryModal={onShowGalleryModal}
            onChangeComment={onChangeComment}
            onUploadFile={onUploadFile}
          />
        ) : null}
      </div>

      {showGalleryModal ? (
        <SlideshowGalleryModal
          isEditable
          withoutMakeMainImage={!withComment}
          files={files}
          currentFileIndex={currentFileIndex}
          openModal={showGalleryModal}
          onOpenModal={onShowGalleryModal}
          onChangeImagesForLoad={setFiles}
        />
      ) : null}
    </>
  )
})
