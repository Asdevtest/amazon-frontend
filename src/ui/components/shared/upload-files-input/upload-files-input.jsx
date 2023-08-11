import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading-alex76457-version'

import AddIcon from '@material-ui/icons/Add'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Avatar, Box, Button, Grid, InputAdornment, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

// import {checkAndMakeAbsoluteUrl} from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './upload-files-input.style'

const regExpUriChecking =
  /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i

const maxSizeInBytes = 15728640 * 3

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
    oneLineMaxHeight = false,
    сontainerStyles = '',
    filesLength = undefined,
    imageListWrapperStyles = undefined,
    minimized = false,
    isNotShowActionsBtns = false,
    requestWidth = false,
    fullWidth = false,
    withoutDragAndDropTitle = false,
  } = props

  const { classes: classNames } = useClassNames()

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
        setImages([...images, { file: linkInput, comment: '', _id: `${Date.now()}` }])
      } else {
        setImages([...images, linkInput])
      }
      setLinkInput('')
    } else {
      setLinkInputError(true)
    }
  }

  const onChange = (imageList /* , addUpdateIndex  тут можно индекс получить*/) => {
    if (withComment) {
      setImages(
        imageList.map((el, i) => ({
          file: el,
          comment: images[i]?.comment || '',
          _id: images[i]?._id || `${Date.now()}${i}`,
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
            .map((el, i) => ({ file: el, comment: '', _id: `${Date.now()}${i}` })),
        ])
      } else {
        setImages([...images, ...readyFilesArr.slice(0, filesAlowLength)])
      }
    }
  }

  const renderImageInfo = (img, imgName) => (
    <div className={classNames.tooltipWrapper}>
      <Avatar
        variant="square"
        alt={imgName}
        src={img ? img : '/assets/icons/file.png'}
        className={classNames.tooltipImg}
      />

      {typeof img === 'string' ? (
        <Typography className={classNames.linkTypo}>{imgName}</Typography>
      ) : (
        <Typography className={classNames.tooltipText}>{imgName}</Typography>
      )}
    </div>
  )

  const onChangeComment = index => e => {
    setImages(() => images.map((el, i) => (i === index ? { ...el, comment: e.target.value } : el)))
  }

  const onClickImageRemove = index => {
    const removeImageId = images[index]._id

    setImages(() => images.filter(el => el._id !== removeImageId))
  }

  const [showImages, setShowImages] = useState(true)

  return (
    SettingsModel.languageTag && (
      <div>
        <ImageUploading
          multiple
          acceptType={acceptType}
          value={withComment ? images?.map(el => el?.file) : images}
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
            <div className={cx(classNames.mainWrapper, { [classNames.oneLineMainWrapper]: oneLine })}>
              {errors?.maxNumber && (
                <Typography className={classNames.errorText}>{t(TranslationKey['You cannot load more!'])}</Typography>
              )}

              <Box className={classNames.mainSubWrapper} sx={{ maxWidth: fullWidth ? 'unset' : 'max-content' }}>
                <div className={cx({ [classNames.controlsWrapper]: minimized && !withoutLinks })}>
                  {!withoutLinks && (
                    <Field
                      tooltipInfoContent={t(TranslationKey['Ability to attach photos/documents/links'])}
                      label={withoutTitle ? '' : title ? title : t(TranslationKey['Attach file'])}
                      labelClasses={classNames.label}
                      error={linkInputError && t(TranslationKey['Invalid link!'])}
                      containerClasses={cx(сontainerStyles)}
                      inputComponent={
                        <div className={classNames.amazonLinkWrapper}>
                          <Input
                            disabled={disabled}
                            placeholder={t(TranslationKey.Link)}
                            classes={{
                              root: cx(classNames.loadImageInput, { [classNames.loadImageInputSmall]: requestWidth }),
                              input: classNames.inputColor,
                            }}
                            value={linkInput}
                            onChange={e => onChangeLinkInput(e.target.value)}
                            onPaste={onPasteFiles}
                          />

                          <Button
                            disableElevation
                            tooltipInfoContent={t(TranslationKey['Adds a document/file from the entered link'])}
                            disabled={linkInput === '' || images?.length >= maxNumber}
                            className={classNames.loadBtn}
                            variant="contained"
                            onClick={() => onClickLoadBtn()}
                          >
                            {t(TranslationKey.Load)}
                          </Button>
                        </div>
                      }
                    />
                  )}

                  {!minimized && !withoutLinks && !withoutDragAndDropTitle && (
                    <Typography className={classNames.attachFiles}>{t(TranslationKey['Attach files'])}</Typography>
                  )}

                  <button
                    disabled={disabled}
                    className={cx(classNames.dragAndDropBtn, {
                      [classNames.dragingOnDropBtn]: isDragging,
                      [classNames.minimizedDragAndDropBtn]: minimized,
                      [classNames.oneLineDADBtn]: minimized && !withoutLinks,
                    })}
                    style={dragAndDropBtnHeight && { height: dragAndDropBtnHeight }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {minimized && (
                      <>
                        {addFilesButtonTitle || t(TranslationKey['Add photo'])}
                        <AddIcon className={classNames.icon} />
                      </>
                    )}
                    {!minimized && t(TranslationKey['Click or Drop here'])}
                    <input className={classNames.pasteInput} defaultValue={''} onPaste={onPasteFiles} />
                  </button>
                </div>

                {!isNotShowActionsBtns && (
                  <div className={classNames.actionBtnsWrapper}>
                    <button
                      disabled={images?.length === 0}
                      className={classNames.showImagesBtn}
                      onClick={() => setShowImages(!showImages)}
                    >
                      {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
                    </button>
                    <Typography className={classNames.imagesCount}>
                      {
                        <span className={classNames.imagesCountSpan}>{`${images?.length ?? 0}/${
                          maxNumber - ((filesLength && filesLength) ?? 0)
                        }`}</span>
                      }
                      {` ${t(TranslationKey.files)}`}
                    </Typography>
                    <button
                      disabled={images?.length === 0}
                      className={classNames.removeAllBtn}
                      onClick={onImageRemoveAll}
                    >
                      {t(TranslationKey['Remove all'])}
                    </button>
                  </div>
                )}
              </Box>

              {showImages && (
                <Grid
                  container
                  className={cx(classNames.imageListWrapper, imageListWrapperStyles, {
                    [classNames.oneLineMaxHeight]: oneLineMaxHeight,
                  })}
                  style={maxHeight && { maxHeight }}
                  justifyContent="flex-start"
                  spacing={2}
                >
                  {imageList.map((image, index) =>
                    typeof image === 'string' ? (
                      <Grid key={index} item>
                        <div className={classNames.imageLinkListItem}>
                          <Tooltip title={renderImageInfo(image, image)} classes={{ popper: classNames.imgTooltip }}>
                            <Avatar className={classNames.image} src={image} alt={image} variant="square" />
                          </Tooltip>

                          {withComment && (
                            <Input
                              multiline
                              inputProps={{ maxLength: 64 }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <Typography className={classNames.inputIndex}>{index + 1 + '.'}</Typography>
                                </InputAdornment>
                              }
                              placeholder={'Title'}
                              maxRows={3}
                              variant="filled"
                              className={classNames.imageObjInput}
                              classes={{ input: classNames.subImageObjInput }}
                              value={images[index]?.comment}
                              onChange={onChangeComment(index)}
                            />
                          )}

                          <div className={classNames.actionIconsWrapper}>
                            <AutorenewIcon
                              className={classNames.actionIcon}
                              fontSize="small"
                              onClick={() => onImageUpdate(index)}
                            />

                            <HighlightOffIcon
                              className={classNames.actionIcon}
                              fontSize="small"
                              onClick={() => (withComment ? onClickImageRemove(index) : onImageRemove(index))}
                            />
                          </div>
                        </div>
                      </Grid>
                    ) : (
                      <Grid key={index} item>
                        <div className={classNames.imageLinkListItem /* imageListItem */}>
                          <Tooltip
                            title={renderImageInfo(image?.data_url, image?.file.name)}
                            classes={{ popper: classNames.imgTooltip }}
                          >
                            <Avatar
                              className={classNames.image}
                              src={image?.file.type.includes('image') ? image?.data_url : '/assets/icons/file.png'}
                              alt={image?.file.name}
                              variant="square"
                            />
                          </Tooltip>

                          {withComment && (
                            <Input
                              multiline
                              inputProps={{ maxLength: 64 }}
                              startAdornment={
                                <InputAdornment position="start">
                                  <Typography className={classNames.inputIndex}>{index + 1 + '.'}</Typography>
                                </InputAdornment>
                              }
                              placeholder={'Title'}
                              maxRows={3}
                              variant="filled"
                              className={classNames.imageObjInput}
                              classes={{ input: classNames.subImageObjInput }}
                              value={images[index]?.comment}
                              onChange={onChangeComment(index)}
                            />
                          )}

                          <div className={classNames.actionIconsWrapper}>
                            <AutorenewIcon
                              className={classNames.actionIcon}
                              fontSize="small"
                              onClick={() => onImageUpdate(index)}
                            />
                            <HighlightOffIcon
                              className={classNames.actionIcon}
                              // onClick={() => onImageRemove(index)}
                              fontSize="small"
                              onClick={() => (withComment ? onClickImageRemove(index) : onImageRemove(index))}
                            />
                          </div>
                        </div>
                      </Grid>
                    ),
                  )}
                </Grid>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
    )
  )
})
