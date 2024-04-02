import { FC, memo } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { docValidTypes } from '@constants/media/doc-types'
import { imageValidTypes } from '@constants/media/image-types'
import { videoValidTypes } from '@constants/media/video-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { isRequestMedia, isUploadFileType } from '@typings/guards'

import { useStyles } from './upload-files-input.style'

import { CustomFileIcon } from '../custom-file-icon'
import { SlideByType } from '../slide-by-type'
import { CustomPlusIcon } from '../svg-icons'
import { VideoPreloader } from '../video-preloader'

import { generateAcceptString } from './helpers/generate-accept-string'
import { UploadFilesInputProps } from './upload-files-input.type'
import { useUploadFilesInput } from './use-upload-files-input'

export const UploadFilesInput: FC<UploadFilesInputProps> = memo(props => {
  const {
    setImages,
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
    images,
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
            <Button disabled={images?.length === 0} variant={ButtonVariant.OUTLINED} onClick={onShowImages}>
              {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
            </Button>

            <p className={styles.imagesCount}>
              <span className={styles.imagesCountSpan}>{`${images?.length || 0}/${maxNumber}`}</span>
              {t(TranslationKey.files)}
            </p>

            <Button
              disabled={images?.length === 0}
              styleType={ButtonStyle.DANGER}
              variant={ButtonVariant.OUTLINED}
              onClick={() => setImages([])}
            >
              {t(TranslationKey['Remove all'])}
            </Button>
          </div>
        ) : null}

        {showImages ? (
          <div className={styles.imagesWrapper} style={{ maxHeight }}>
            {images?.map((image, index) => {
              return (
                <div key={index} className={styles.imageWrapper}>
                  <div className={styles.file} onClick={() => onShowGalleryModal(index)}>
                    <SlideByType
                      isPreviews
                      mediaFile={isUploadFileType(image) ? image : image?.fileLink}
                      mediaFileIndex={index}
                      ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.image} />}
                      VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} height={45} />}
                      FileComponent={({ fileExtension }) => (
                        <CustomFileIcon fileExtension={fileExtension} height="75%" />
                      )}
                    />
                  </div>

                  {withComment && isRequestMedia(image) ? (
                    <Field
                      oneLine
                      multiline
                      minRows={2}
                      maxRows={2}
                      placeholder={index + 1 + '.'}
                      inputProps={{ maxLength: 64 }}
                      containerClasses={styles.commentContainer}
                      inputClasses={styles.commentClasses}
                      classes={{ input: styles.comment }}
                      value={image?.commentByClient}
                      onChange={onChangeComment(index)}
                    />
                  ) : null}

                  <div className={styles.iconsWrapper}>
                    <button className={styles.iconButton}>
                      <AutorenewIcon className={styles.icon} fontSize="small" />

                      <input type="file" className={styles.uploadInput} onChange={onUploadFile(index)} />
                    </button>

                    <button className={styles.iconButton} onClick={() => onRemoveFile(index)}>
                      <HighlightOffIcon className={styles.icon} fontSize="small" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>

      {showGalleryModal ? (
        <SlideshowGalleryModal
          isEditable
          withoutMakeMainImage={!withComment}
          files={images}
          currentFileIndex={currentFileIndex}
          openModal={showGalleryModal}
          onOpenModal={onShowGalleryModal}
          onChangeImagesForLoad={setImages}
        />
      ) : null}
    </>
  )
})
