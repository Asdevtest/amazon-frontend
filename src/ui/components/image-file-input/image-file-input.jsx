import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import React, {useState} from 'react'

import {Grid, Typography, Tooltip} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import ImageUploading from 'react-images-uploading'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './image-file-input.style'

const textConsts = getLocalizedTexts(texts, 'ru').imageFileInput

export const ImageFileInput = observer(({images, setImages, maxNumber}) => {
  const classNames = useClassNames()

  const onChange = (imageList /* , addUpdateIndex тут можно индекс получить*/) => {
    setImages(imageList)
  }

  const renderImageInfo = (img, imgName) => (
    <div className={classNames.tooltipWrapper}>
      <img alt={imgName} src={img} className={classNames.tooltipImg} />
      <Typography className={classNames.tooltipText}>{imgName}</Typography>
    </div>
  )

  const [showImages, setShowImages] = useState(true)

  return (
    <div>
      <ImageUploading multiple value={images} maxNumber={maxNumber} dataURLKey="data_url" onChange={onChange}>
        {({imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps}) => (
          <div className={classNames.mainWrapper}>
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
                {` images`}{' '}
              </Typography>
              <button disabled={images.length === 0} className={classNames.removeAllBtn} onClick={onImageRemoveAll}>
                {textConsts.removeAllBtn}
              </button>
            </div>

            {showImages && (
              <Grid container className={classNames.imageListWrapper} justify="start" spacing={2} md={12}>
                {imageList.map((image, index) => (
                  <Grid key={index} item>
                    <div className={classNames.imageListItem}>
                      <Tooltip
                        title={renderImageInfo(image.data_url, image.file.name)}
                        classes={{popper: classNames.imgTooltip}}
                      >
                        <img className={classNames.image} src={image.data_url} alt={image.file.name} />
                      </Tooltip>

                      <Typography className={classNames.fileName}>{image.file.name} </Typography>

                      <div className={classNames.actionIconsWrapper}>
                        <AutorenewIcon className={classNames.actionIcon} onClick={() => onImageUpdate(index)} />
                        <HighlightOffIcon className={classNames.actionIcon} onClick={() => onImageRemove(index)} />
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  )
})
