import {cx} from '@emotion/css'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {Grid, Typography, Avatar, InputAdornment} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import React, {useState} from 'react'

import {observer} from 'mobx-react'
import ImageUploading from 'react-images-uploading-alex76457-version'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Input} from '@components/input'

// import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './upload-files-input.style'

const regExpUriChecking =
  /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i

const maxSizeInBytes = 15728640

export const UploadFilesInput = observer(
  ({
    images,
    setImages,
    maxNumber,
    acceptType = [''],
    // acceptType = ['jpg', 'gif', 'png', 'jpeg', 'pdf'],
    withoutLinks = false,
    withoutTitle = false,
    oneLine = false,
    title = false,
    disabled = false,
    dragAndDropBtnHeight = undefined,
    withComment = false,
    maxHeight = undefined,
    oneLineMaxHeight = false,
  }) => {
    const {classes: classNames} = useClassNames()

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
          setImages([...images, {file: linkInput, comment: '', _id: `${Date.now()}`}])
        } else {
          setImages([...images, linkInput])
        }

        // setImages([...images, linkInput])
        setLinkInput('')
      } else {
        setLinkInputError(true)
      }
    }

    const onChange = (imageList /* , addUpdateIndex  тут можно индекс получить*/) => {
      // console.log('addUpdateIndex', addUpdateIndex)

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
      // setImages(imageList)
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
              .map((el, i) => ({file: el, comment: '', _id: `${Date.now()}${i}`})),
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
      setImages(() => images.map((el, i) => (i === index ? {...el, comment: e.target.value} : el)))
    }

    const onClickImageRemove = index => {
      const removeImageId = images[index]._id

      setImages(() => images.filter(el => el._id !== removeImageId))
    }

    const [showImages, setShowImages] = useState(true)

    return (
      SettingsModel.languageTag && (
        <div>
          {!withoutLinks ? (
            <Field
              tooltipInfoContent={t(TranslationKey['Ability to attach photos/documents/links'])}
              label={withoutTitle ? '' : title ? title : t(TranslationKey['Attach file'])}
              error={linkInputError && t(TranslationKey['Invalid link!'])}
              inputComponent={
                <div className={classNames.amazonLinkWrapper}>
                  <Input
                    disabled={disabled}
                    placeholder={t(TranslationKey.Link)}
                    // className={classNames.loadImageInput}
                    classes={{root: classNames.loadImageInput, input: classNames.inputColor}}
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
                    color="primary"
                    onClick={() => onClickLoadBtn()}
                  >
                    {t(TranslationKey.Add)}
                  </Button>
                </div>
              }
            />
          ) : (
            <Typography className={classNames.attachFiles}>{t(TranslationKey['Attach files to the ad'])}</Typography>
          )}

          <ImageUploading
            multiple
            acceptType={acceptType}
            value={withComment ? images.map(el => el.file) : images}
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
              <div className={cx(classNames.mainWrapper, {[classNames.oneLineMainWrapper]: oneLine})}>
                {errors?.maxNumber && (
                  <Typography className={classNames.errorText}>{t(TranslationKey['You cannot load more!'])}</Typography>
                )}

                <div className={classNames.mainSubWrapper}>
                  <button
                    disabled={disabled}
                    className={cx(classNames.dragAndDropBtn, {[classNames.dragingOnDropBtn]: isDragging})}
                    style={dragAndDropBtnHeight && {height: dragAndDropBtnHeight}}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {t(TranslationKey['Click or Drop here'])}
                    <input className={classNames.pasteInput} defaultValue={''} onPaste={onPasteFiles} />
                  </button>

                  <div className={classNames.actionBtnsWrapper}>
                    <button
                      disabled={images?.length === 0}
                      className={classNames.showImagesBtn}
                      onClick={() => setShowImages(!showImages)}
                    >
                      {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
                    </button>
                    <Typography className={classNames.imagesCount}>
                      {<span className={classNames.imagesCountSpan}>{`${images?.length || 0}/${maxNumber}`}</span>}
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
                </div>

                {/* {showImages && (
                  <Grid container className={classNames.imageListWrapper} justifyContent="flex-start" spacing={2}>
                    {imageList.map((image, index) =>
                      typeof image === 'string' ? (
                        <Grid key={index} item>
                          <div className={classNames.imageLinkListItem}>
                            <Tooltip title={renderImageInfo(image, image)} classes={{popper: classNames.imgTooltip}}>
                              <Avatar className={classNames.image} src={image} alt={image} variant="square" />
                            </Tooltip>

                            <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(image)}>
                              <Typography className={classNames.linkName}>{image}</Typography>
                            </Link>

                            <div className={classNames.actionIconsWrapper}>
                              <HighlightOffIcon
                                className={classNames.actionIcon}
                                onClick={() => onImageRemove(index)}
                              />
                            </div>
                          </div>
                        </Grid>
                      ) : (
                        <Grid key={index} item>
                          <div className={classNames.imageListItem}>
                            <Tooltip
                              title={renderImageInfo(image?.data_url, image?.file.name)}
                              classes={{popper: classNames.imgTooltip}}
                            >
                              <Avatar
                                className={classNames.image}
                                src={image?.file.type.includes('image') ? image?.data_url : '/assets/icons/file.png'}
                                alt={image?.file.name}
                                variant="square"
                              />
                            </Tooltip>

                            <Typography className={classNames.fileName}>{image?.file.name} </Typography>

                            <div className={classNames.actionIconsWrapper}>
                              <AutorenewIcon className={classNames.actionIcon} onClick={() => onImageUpdate(index)} />
                              <HighlightOffIcon
                                className={classNames.actionIcon}
                                onClick={() => onImageRemove(index)}
                              />
                            </div>
                          </div>
                        </Grid>
                      ),
                    )}
                  </Grid>
                )} */}

                {showImages && (
                  <Grid
                    container
                    className={cx(classNames.imageListWrapper, {[classNames.oneLineMaxHeight]: oneLineMaxHeight})}
                    style={maxHeight && {maxHeight}}
                    justifyContent="flex-start"
                    spacing={2}
                  >
                    {imageList.map((image, index) =>
                      typeof image === 'string' ? (
                        <Grid key={index} item>
                          <div className={classNames.imageLinkListItem}>
                            <Tooltip title={renderImageInfo(image, image)} classes={{popper: classNames.imgTooltip}}>
                              <Avatar className={classNames.image} src={image} alt={image} variant="square" />
                            </Tooltip>

                            {/* <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(image)}>
                              <Typography className={classNames.linkName}>{image}</Typography>
                            </Link> */}

                            {withComment && (
                              <Input
                                multiline
                                inputProps={{maxLength: 64}}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Typography className={classNames.inputIndex}>{index + 1 + '.'}</Typography>
                                  </InputAdornment>
                                }
                                placeholder={'Title'}
                                maxRows={3}
                                variant="filled"
                                className={classNames.imageObjInput}
                                classes={{input: classNames.subImageObjInput}}
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
                              classes={{popper: classNames.imgTooltip}}
                            >
                              <Avatar
                                className={classNames.image}
                                src={image?.file.type.includes('image') ? image?.data_url : '/assets/icons/file.png'}
                                alt={image?.file.name}
                                variant="square"
                              />
                            </Tooltip>

                            {/* <Typography className={classNames.fileName}>{image?.file.name} </Typography> */}

                            {withComment && (
                              <Input
                                multiline
                                inputProps={{maxLength: 64}}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Typography className={classNames.inputIndex}>{index + 1 + '.'}</Typography>
                                  </InputAdornment>
                                }
                                placeholder={'Title'}
                                maxRows={3}
                                variant="filled"
                                className={classNames.imageObjInput}
                                classes={{input: classNames.subImageObjInput}}
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
  },
)
