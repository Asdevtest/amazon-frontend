import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Tooltip from '@mui/material/Tooltip'

import React, {useState} from 'react'

import {Grid, Typography, Avatar, Link} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import ImageUploading from 'react-images-uploading-alex76457-version'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Input} from '@components/input'

import {checkAndMakeAbsoluteUrl} from '@utils/text'
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
    acceptType = ['jpg', 'gif', 'png', 'jpeg', 'pdf'],
    withoutLinks = false,
    withoutTitle = false,
    oneLine = false,
    title = false,
  }) => {
    const classNames = useClassNames()

    const [linkInput, setLinkInput] = useState('')

    const [linkInputError, setLinkInputError] = useState(false)

    const onChangeLinkInput = value => {
      setLinkInputError(false)
      setLinkInput(value)
    }

    const onClickLoadBtn = () => {
      const linkIsValid = regExpUriChecking.test(linkInput)

      if (linkIsValid) {
        setImages([...images, linkInput])
        setLinkInput('')
      } else {
        setLinkInputError(true)
      }
    }

    const onChange = (imageList /* , addUpdateIndex тут можно индекс получить*/) => {
      setImages(imageList)
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

    const [showImages, setShowImages] = useState(true)

    return (
      SettingsModel.languageTag && (
        <div>
          {!withoutLinks && (
            <Field
              tooltipInfoContent={t(TranslationKey['Ability to attach photos/documents/links'])}
              label={withoutTitle ? '' : title ? title : t(TranslationKey['Attach file'])}
              error={linkInputError && t(TranslationKey['Invalid link!'])}
              inputComponent={
                <div className={classNames.amazonLinkWrapper}>
                  <Input
                    placeholder={t(TranslationKey.Link)}
                    className={classNames.loadImageInput}
                    value={linkInput}
                    onChange={e => onChangeLinkInput(e.target.value)}
                  />

                  <Button
                    disableElevation
                    tooltipInfoContent={t(TranslationKey['Adds a document/file from the entered link'])}
                    disabled={linkInput === ''}
                    className={classNames.loadBtn}
                    variant="contained"
                    color="primary"
                    onClick={() => onClickLoadBtn()}
                  >
                    {t(TranslationKey.Download)}
                  </Button>
                </div>
              }
            />
          )}

          <ImageUploading
            multiple
            acceptType={acceptType ? acceptType : ['jpg', 'gif', 'png', 'pdf', 'jpeg']}
            value={images}
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
              <div className={clsx(classNames.mainWrapper, {[classNames.oneLineMainWrapper]: oneLine})}>
                {errors?.maxNumber && (
                  <Typography className={classNames.errorText}>{t(TranslationKey['You cannot load more!'])}</Typography>
                )}

                <div className={classNames.mainSubWrapper}>
                  <button
                    className={clsx(classNames.dragAndDropBtn, {[classNames.dragingOnDropBtn]: isDragging})}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {t(TranslationKey['Click or Drop here'])}
                  </button>

                  <div className={classNames.actionBtnsWrapper}>
                    <button
                      disabled={images.length === 0}
                      className={classNames.showImagesBtn}
                      onClick={() => setShowImages(!showImages)}
                    >
                      {showImages ? t(TranslationKey.Hide) : t(TranslationKey.View)}
                    </button>
                    <Typography className={classNames.imagesCount}>
                      {<span className={classNames.imagesCountSpan}>{`${images.length}/${maxNumber}`}</span>}
                      {` files`}{' '}
                    </Typography>
                    <button
                      disabled={images.length === 0}
                      className={classNames.removeAllBtn}
                      onClick={onImageRemoveAll}
                    >
                      {t(TranslationKey['Remove all'])}
                    </button>
                  </div>
                </div>

                {showImages && (
                  <Grid container className={classNames.imageListWrapper} justify="start" spacing={2} md={12}>
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
                              title={renderImageInfo(image.data_url, image.file.name)}
                              classes={{popper: classNames.imgTooltip}}
                            >
                              <img
                                className={classNames.image}
                                src={image.file.type.includes('image') ? image.data_url : '/assets/icons/file.png'}
                                alt={image.file.name}
                              />
                            </Tooltip>

                            <Typography className={classNames.fileName}>{image.file.name} </Typography>

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
                )}
              </div>
            )}
          </ImageUploading>
        </div>
      )
    )
  },
)
