import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Tooltip from '@mui/material/Tooltip'

import React, {useState} from 'react'

import {Grid, Typography, Avatar, Link} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import ImageUploading from 'react-images-uploading'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './upload-files-input.style'

const textConsts = getLocalizedTexts(texts, 'ru').uploadFilesInput

const regExpUriChecking =
  /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i

const maxSizeInBytes = 15728640

export const UploadFilesInput = observer(({images, setImages, maxNumber, acceptType, withoutLinks}) => {
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
    <div>
      {!withoutLinks && (
        <Field
          label={textConsts.addPhoto}
          error={linkInputError && 'Ссылка невалидна!'}
          inputComponent={
            <div className={classNames.amazonLinkWrapper}>
              <Input
                placeholder={textConsts.link}
                className={classNames.loadImageInput}
                value={linkInput}
                onChange={e => onChangeLinkInput(e.target.value)}
              />

              <Button
                disableElevation
                disabled={linkInput === ''}
                className={classNames.loadBtn}
                variant="contained"
                color="primary"
                onClick={() => onClickLoadBtn()}
              >
                {textConsts.loadBtn}
              </Button>
            </div>
          }
        />
      )}

      <ImageUploading
        multiple
        acceptType={acceptType ? acceptType : ['jpg', 'gif', 'png', 'pdf']}
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
          <div className={classNames.mainWrapper}>
            {errors?.maxNumber && (
              <Typography className={classNames.errorText}>
                {maxNumber === 1 ? 'Нельзя загрузить больше 1 файла!' : textConsts.maxNumberError}
              </Typography>
            )}

            <button
              className={clsx(classNames.dragAndDropBtn, {[classNames.dragingOnDropBtn]: isDragging})}
              onClick={onImageUpload}
              {...dragProps}
            >
              {textConsts.dragAndDropBtn}
            </button>

            <div className={classNames.actionBtnsWrapper}>
              <button
                disabled={images.length === 0}
                className={classNames.showImagesBtn}
                onClick={() => setShowImages(!showImages)}
              >
                {showImages ? textConsts.hideImagesBtn : textConsts.showImagesBtn}
              </button>
              <Typography className={classNames.imagesCount}>
                {<span className={classNames.imagesCountSpan}>{`${images.length}/${maxNumber}`}</span>}
                {` files`}{' '}
              </Typography>
              <button disabled={images.length === 0} className={classNames.removeAllBtn} onClick={onImageRemoveAll}>
                {textConsts.removeAllBtn}
              </button>
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
                          <HighlightOffIcon className={classNames.actionIcon} onClick={() => onImageRemove(index)} />
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
                          <HighlightOffIcon className={classNames.actionIcon} onClick={() => onImageRemove(index)} />
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
})
