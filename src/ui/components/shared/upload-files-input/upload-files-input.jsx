import { observer } from 'mobx-react'
import { useState } from 'react'
import ImageUploading from 'react-images-uploading-alex76457-version'
import { v4 as uuid } from 'uuid'

import AddIcon from '@material-ui/icons/Add'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { Avatar, InputAdornment, Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { isString } from '@typings/guards'

import { useStyles } from './upload-files-input.style'

import { VideoPlayer } from '../video-player'

import { maxSizeInBytes, regExpUriChecking } from './upload-files-input.constants'

export const UploadFilesInput = observer(props => {
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
    сontainerStyles = '',
    imageListWrapperStyles = undefined,
    minimized = false,
    isNotShowActionsBtns = false,
    requestWidth = false,
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

  const onChange = imageList => {
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

  const renderImageInfo = (img, imgName, isCurrentFileVideoType) => (
    <div className={styles.tooltipWrapper}>
      {isCurrentFileVideoType ? (
        <div className={cx(styles.preloaderContainer, styles.preloaderContainerTooltip)}>
          <VideoPlayer videoSource={img} height={200} />
          <div className={styles.preloader}>
            <PlayCircleFilledWhiteOutlinedIcon className={styles.preloaderIcon} />
          </div>
        </div>
      ) : (
        <Avatar
          variant="square"
          alt={imgName}
          src={img ? img : '/assets/icons/file.png'}
          className={styles.tooltipImg}
        />
      )}

      <p className={styles.tooltipText}>{imgName}</p>
    </div>
  )

  const onChangeComment = index => e => {
    setImages(() => images.map((el, i) => (i === index ? { ...el, commentByClient: e.target.value } : el)))
  }

  const onClickImageRemove = index => {
    const removeImageId = images[index]._id

    setImages(() => images.filter(el => el._id !== removeImageId))
  }

  const [showImages, setShowImages] = useState(true)

  const isVideoType = slide => {
    if (isString(slide)) {
      return checkIsVideoLink(slide)
    } else {
      return checkIsVideoLink(slide?.file?.name) || checkIsVideoLink(slide?.file?.type)
    }
  }

  return (
    SettingsModel.languageTag && (
      <ImageUploading
        multiple
        acceptType={acceptType}
        value={withComment ? images?.map(el => el?.fileLink) : images}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        maxFileSize={maxSizeInBytes}
        onChange={onChange}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <div className={cx(styles.mainWrapper, { [styles.oneLineMainWrapper]: oneLine })}>
            {errors?.maxNumber && <p className={styles.errorText}>{t(TranslationKey['You cannot load more!'])}</p>}

            <div className={cx(styles.mainSubWrapper, { [styles.fullWidth]: fullWidth })}>
              <div className={cx({ [styles.controlsWrapper]: minimized && !withoutLinks })}>
                {!withoutLinks && (
                  <Field
                    tooltipInfoContent={t(TranslationKey['Ability to attach photos/documents/links'])}
                    label={withoutTitle ? '' : title ? title : t(TranslationKey['Attach file'])}
                    labelClasses={styles.label}
                    error={linkInputError && t(TranslationKey['Invalid link!'])}
                    containerClasses={сontainerStyles}
                    inputComponent={
                      <div className={styles.amazonLinkWrapper}>
                        <Input
                          disabled={disabled}
                          placeholder={t(TranslationKey.Link)}
                          classes={{
                            root: cx(styles.loadImageInput, { [styles.loadImageInputSmall]: requestWidth }),
                            input: styles.inputColor,
                          }}
                          value={linkInput}
                          onChange={e => onChangeLinkInput(e.target.value)}
                          onPaste={onPasteFiles}
                        />

                        <Button
                          tooltipInfoContent={t(TranslationKey['Adds a document/file from the entered link'])}
                          disabled={linkInput === '' || images?.length >= maxNumber}
                          className={styles.loadBtn}
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
                    [styles.oneLineDADBtn]: minimized && !withoutLinks,
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
                    <span className={styles.imagesCountSpan}>{`${images?.length ?? 0}/${maxNumber || 0}`}</span>

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
            </div>

            {showImages && (
              <div
                className={cx(styles.imageListWrapper, imageListWrapperStyles, {
                  [styles.fullWidth]: fullWidth,
                })}
                style={maxHeight && { maxHeight }}
              >
                {imageList.map((image, index) => {
                  const currentImage = isString(image) ? getAmazonImageUrl(image, true) : image?.data_url
                  const currentName = isString(image) ? image : image?.file.name
                  const isCurrentFileVideoType = isVideoType(image)

                  return (
                    <div key={index} className={styles.imageLinkListItem}>
                      <Tooltip
                        title={renderImageInfo(currentImage, currentName, isCurrentFileVideoType)}
                        classes={{ popper: styles.imgTooltip }}
                      >
                        {isCurrentFileVideoType ? (
                          <div className={styles.preloaderContainer}>
                            <VideoPlayer videoSource={currentImage} height={55} />
                            <div className={styles.preloader}>
                              <PlayCircleFilledWhiteOutlinedIcon className={styles.preloaderIcon} />
                            </div>
                          </div>
                        ) : (
                          <Avatar className={styles.image} src={currentImage} alt={currentName} variant="square" />
                        )}
                      </Tooltip>

                      {withComment && (
                        <Input
                          multiline
                          inputProps={{ maxLength: 64 }}
                          startAdornment={
                            <InputAdornment position="start" className={styles.inputIndexWrapper}>
                              <p className={styles.inputIndex}>{index + 1 + '.'}</p>
                            </InputAdornment>
                          }
                          placeholder={'Title'}
                          maxRows={3}
                          variant="filled"
                          className={styles.imageObjInput}
                          classes={{ input: styles.subImageObjInput }}
                          value={images[index]?.commentByClient}
                          onChange={onChangeComment(index)}
                        />
                      )}

                      <div className={styles.actionIconsWrapper}>
                        <AutorenewIcon
                          className={styles.actionIcon}
                          fontSize="small"
                          onClick={() => onImageUpdate(index)}
                        />

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
        )}
      </ImageUploading>
    )
  )
})
