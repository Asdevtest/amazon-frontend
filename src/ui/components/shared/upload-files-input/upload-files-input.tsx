import { FC, memo } from 'react'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'

import { useStyles } from './upload-files-input.style'

import { Buttons, Files, Link, Upload } from './components'
import { UploadFilesInputProps } from './upload-files-input.type'
import { useUploadFilesInput } from './use-upload-files-input'

export const UploadFilesInput: FC<UploadFilesInputProps> = memo(props => {
  const {
    title,
    disabled,
    setImages,
    maxHeight,
    minimized,
    maxNumber,
    acceptTypes,
    withComment,
    withoutLinks,
    withoutTitles,
    withoutActionsButtons,
    dragAndDropButtonHeight,
  } = props

  const { classes: styles, cx } = useStyles()

  const {
    currentFileIndex,
    disabledLoadButton,
    files,
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
    onRemoveAllFiles,
    onPasteFile,
  } = useUploadFilesInput(props)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={cx(styles.wrapper, { [styles.minimazed]: minimized })}>
          {!withoutLinks ? (
            <Link
              linkInput={linkInput}
              linkInputError={linkInputError}
              disabledLoadButton={disabledLoadButton}
              title={title}
              disabled={disabled}
              minimized={minimized}
              withoutTitles={withoutTitles}
              onLoadFile={onLoadFile}
              onChangeLink={onChangeLink}
              onPasteFile={onPasteFile}
            />
          ) : null}

          <Upload
            disabled={disabled}
            minimized={minimized}
            acceptTypes={acceptTypes}
            withoutTitles={withoutTitles}
            dragAndDropButtonHeight={dragAndDropButtonHeight}
            onUploadFiles={onUploadFiles}
          />
        </div>

        {!withoutActionsButtons ? (
          <Buttons
            quantity={files.length}
            disabled={files.length === 0}
            showImages={showImages}
            maxNumber={maxNumber}
            onShowImages={onShowImages}
            onRemoveAllFiles={onRemoveAllFiles}
          />
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
          withoutMakeMainImage={withComment}
          files={files}
          currentFileIndex={currentFileIndex}
          openModal={showGalleryModal}
          onOpenModal={onShowGalleryModal}
          onChangeImagesForLoad={setImages}
        />
      ) : null}
    </>
  )
})
