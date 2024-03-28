import { FC, memo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import AddIcon from '@material-ui/icons/Add'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './upload-files-input.style'

import { CustomFileIcon } from '../custom-file-icon'
import { SlideByType } from '../slide-by-type'
import { VideoPreloader } from '../video-preloader'

import { regExpUriChecking } from './upload-files-input.constants'

export const UploadFilesInput: FC<any> = memo(props => {
  const {
    images,
    setImages,
    maxNumber,
    addFilesButtonTitle = '',
    acceptType = [''],
    withoutLinks = false,
    withoutTitle = false,
    oneLine = false,
    title = '',
    disabled = false,
    dragAndDropBtnHeight = undefined,
    withComment = false,
    maxHeight = undefined,
    сontainerStyles,
    imageListWrapperStyles = undefined,
    minimized = false,
    isNotShowActionsBtns = false,
    fullWidth = false,
    withoutDragAndDropTitle = false,
  } = props

  const { classes: styles, cx } = useStyles()

  const [linkInput, setLinkInput] = useState('')

  const [linkInputError, setLinkInputError] = useState(false)

  const onChangeLinkInput = value => {
    setLinkInputError(false)
    setLinkInput(value)
  }

  const onClickLoadBtn = () => {
    const linkIsValid = regExpUriChecking.test(linkInput)

    if (linkIsValid) {
      if (withComment) {
        setImages([...images, { fileLink: linkInput, commentByClient: '', commentByPerformer: '', _id: uuid() }])
      } else {
        setImages([...images, linkInput])
      }
      setLinkInput('')
    } else {
      setLinkInputError(true)
    }
  }

  const onChange = (imageList, addUpdateIndex) => {
    console.log('imageList, addUpdateIndex', imageList, addUpdateIndex)
    if (withComment) {
      setImages(
        imageList.map((el, i) => ({
          fileLink: el,
          commentByClient: images[i]?.commentByClient || '',
          commentByPerformer: images[i]?.commentByPerformer || '',
          _id: images[i]?._id || uuid(),
        })),
      )
    } else {
      setImages(imageList)
    }
  }

  const onPasteFiles = async evt => {
    if (evt.clipboardData.files.length === 0) {
      return
    } else {
      const filesArr = Array.from(evt.clipboardData.files)

      const filesAlowLength = maxNumber - images?.length

      evt.preventDefault()

      const readyFilesArr = filesArr.map(el => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el.name?.replace(/ /g, ''), {
          type: el.type,
          lastModified: el.lastModified,
        }),
      }))

      if (withComment) {
        setImages([
          ...images,
          ...readyFilesArr
            .slice(0, filesAlowLength)
            .map(el => ({ fileLink: el, commentByClient: '', commentByPerformer: '', _id: uuid() })),
        ])
      } else {
        setImages([...images, ...readyFilesArr.slice(0, filesAlowLength)])
      }
    }
  }

  const onChangeComment = index => e => {
    setImages(() => images.map((el, i) => (i === index ? { ...el, commentByClient: e.target.value } : el)))
  }

  const onClickImageRemove = index => {
    const removeImageId = images[index]._id

    setImages(() => images.filter(el => el._id !== removeImageId))
  }

  const [showImages, setShowImages] = useState(true)

  return (
    <div className={cx(styles.mainWrapper, { [styles.oneLineMainWrapper]: oneLine, [styles.fullWidth]: fullWidth })}>
      {errors?.maxNumber ? <p className={styles.errorText}>{t(TranslationKey['You cannot load more!'])}</p> : null}

      <div className={cx({ [styles.controlsWrapper]: minimized && !withoutLinks })}>
        {!withoutLinks && (
          <Field
            tooltipInfoContent={t(TranslationKey['Ability to attach photos/documents/links'])}
            label={withoutTitle ? '' : title ? title : t(TranslationKey['Attach file'])}
            labelClasses={styles.label}
            error={linkInputError && t(TranslationKey['Invalid link!'])}
            containerClasses={cx(
              styles.loadInputContainer,
              { [styles.loadInputContainerMinimized]: minimized && !withoutLinks },
              сontainerStyles,
            )}
            inputComponent={
              <div className={styles.amazonLinkWrapper}>
                <Input
                  disabled={disabled}
                  placeholder={t(TranslationKey.Link)}
                  classes={{
                    root: styles.loadImageInput,
                  }}
                  value={linkInput}
                  onChange={e => onChangeLinkInput(e.target.value)}
                  onPaste={onPasteFiles}
                />

                <Button
                  tooltipInfoContent={t(TranslationKey['Adds a document/file from the entered link'])}
                  disabled={linkInput === '' || images?.length >= maxNumber}
                  onClick={() => onClickLoadBtn()}
                >
                  {t(TranslationKey.Load)}
                </Button>
              </div>
            }
          />
        )}

        {!minimized && !withoutLinks && !withoutDragAndDropTitle && (
          <p className={styles.attachFiles}>{t(TranslationKey['Attach files'])}</p>
        )}

        <button
          disabled={disabled}
          className={cx(styles.dragAndDropBtn, {
            [styles.dragingOnDropBtn]: isDragging,
            [styles.minimizedDragAndDropBtn]: minimized,
          })}
          style={dragAndDropBtnHeight && { height: dragAndDropBtnHeight }}
          onClick={onImageUpload}
          {...dragProps}
        >
          {minimized && (
            <>
              {addFilesButtonTitle || t(TranslationKey['Add photo'])}
              <AddIcon />
            </>
          )}
          {!minimized && t(TranslationKey['Click or Drop here'])}
          <input className={styles.pasteInput} defaultValue="" onPaste={onPasteFiles} />
        </button>
      </div>

      {!isNotShowActionsBtns && (
        <div className={styles.actionBtnsWrapper}>
          <Button
            disabled={images?.length === 0}
            variant={ButtonVariant.OUTLINED}
            onClick={() => setShowImages(!showImages)}
          >
            {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
          </Button>
          <p className={styles.imagesCount}>
            <span className={styles.imagesCountSpan}>{`${images?.length || 0}/${maxNumber || 0}`}</span>
            {t(TranslationKey.files)}
          </p>
          <Button
            disabled={images?.length === 0}
            styleType={ButtonStyle.DANGER}
            variant={ButtonVariant.OUTLINED}
            onClick={onImageRemoveAll}
          >
            {t(TranslationKey['Remove all'])}
          </Button>
        </div>
      )}

      {showImages && (
        <div
          className={cx(styles.imageListWrapper, imageListWrapperStyles, {
            [styles.fullWidth]: fullWidth,
          })}
          style={maxHeight && { maxHeight }}
        >
          {imageList.map((image, index) => {
            return (
              <div key={index} className={styles.imageLinkListItem}>
                <div className={styles.file}>
                  <SlideByType
                    isPreviews
                    mediaFile={image}
                    mediaFileIndex={index}
                    ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.image} />}
                    VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} height={45} />}
                    FileComponent={({ fileExtension }) => <CustomFileIcon fileExtension={fileExtension} height="75%" />}
                  />
                </div>

                {withComment && (
                  <Field
                    oneLine
                    multiline
                    minRows={2}
                    maxRows={2}
                    placeholder={index + 1 + '.'}
                    inputProps={{ maxLength: 64 }}
                    containerClasses={styles.commentInputContainer}
                    inputClasses={styles.commentInputClasses}
                    classes={{ input: styles.commentInput }}
                    value={images[index]?.commentByClient}
                    onChange={onChangeComment(index)}
                  />
                )}

                <div className={styles.actionIconsWrapper}>
                  <AutorenewIcon className={styles.actionIcon} fontSize="small" onClick={() => onImageUpdate(index)} />

                  <HighlightOffIcon
                    className={styles.actionIcon}
                    fontSize="small"
                    onClick={() => (withComment ? onClickImageRemove(index) : onImageRemove(index))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})
