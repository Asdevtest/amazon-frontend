import { cx } from '@emotion/css'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { Avatar, Typography } from '@mui/material'

import { useEffect, useState } from 'react'

import { ImageZoomForm } from '@components/forms/image-zoom-form'
import { Button } from '@components/shared/buttons/button'
// import React, {useEffect, useState} from 'react'
import { Modal } from '@components/shared/modal'

import { checkIsImageLink } from '@utils/checks'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { useClassNames } from './big-object-images-modal.style'
import { CustomSlider } from '@components/shared/custom-slider'
import { TranslationKey } from '@constants/translations/translation-key'
import { t } from '@utils/translations'

export const BigObjectImagesModal = ({
  openModal,
  setOpenModal,
  imagesData,
  curImageId,
  renderBtns,
  setCurImageId,
  isRedImageComment,
}) => {
  const { classes: classNames } = useClassNames()

  const filteredImagesData = imagesData.filter(el => !!el.image && checkIsImageLink(el.image?.file?.name || el.image))

  const [zoomOpen, setZoomOpen] = useState(false)

  const [zoomImage, setZoomImage] = useState(null)

  // const curImageIndex = filteredImagesData.findIndex(el => el._id === curImageId) || 0

  const [curImageIndex, setCurImageIndex] = useState(filteredImagesData.findIndex(el => el._id === curImageId) || 0)

  useEffect(() => {
    const newIndex = filteredImagesData.findIndex(el => el._id === curImageId)

    setCurImageIndex(() => (newIndex >= 0 ? newIndex : 0))
  }, [curImageId])

  const onChangeCurImageIndex = index => {
    const objImage = filteredImagesData.find((el, i) => i === index)

    if (objImage) {
      setCurImageId(() => objImage._id)
    }
  }

  const onClickLeftSideImage = iamageId => {
    setCurImageId(() => iamageId)
    setCurImageIndex(() => filteredImagesData.findIndex(el => el._id === curImageId) || 0)
  }

  const onClickDownloadBtn = () => {
    const imageObj = { ...imagesData.find(el => el._id === curImageId) }

    typeof imageObj.image === 'string' ? downloadFileByLink(imageObj.image) : downloadFile(imageObj.image.file)
  }

  const onClickZoomBtn = () => {
    const imageObj = { ...imagesData.find(el => el._id === curImageId) }

    setZoomImage(typeof imageObj.image === 'string' ? imageObj.image : imageObj.image.data_url)

    setZoomOpen(true)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.imageModalWrapper}>
        <div className={classNames.leftImagesWrapper}>
          <div className={classNames.leftImagesSubWrapper}>
            {filteredImagesData.map(item => (
              <div
                key={item._id}
                className={cx(classNames.imageModalImageWrapperLeftSide, {
                  [classNames.imageModalImageWrapperLeftSideSelected]: item._id === curImageId,
                })}
                onClick={() => onClickLeftSideImage(item._id)}
              >
                <Avatar
                  className={classNames.imageModalImageLeftSide}
                  classes={{ img: classNames.imageModalImageLeftSide }}
                  src={
                    typeof item.image === 'string'
                      ? item.image
                      : item.image?.file.type.includes('image')
                      ? item.image?.data_url
                      : '/assets/icons/file.png'
                  }
                  alt={item.image?.file?.name || ''}
                  variant="square"
                />

                {/* {!!item.comment && ( */}
                <div>
                  <Typography className={cx(classNames.imageName, classNames.shortText)}>{item.comment}</Typography>

                  <Typography className={cx(classNames.imageLeftSideComment)}>
                    {getShortenStringIfLongerThanCount(item.imageComment, 20)}
                  </Typography>
                </div>
                {/* )} */}
              </div>
            ))}
          </div>
        </div>

        <div className={classNames.carouselWrapper}>
          <CustomSlider index={curImageIndex} arrowSize="60px" onChangeIndex={onChangeCurImageIndex}>
            {filteredImagesData.map(item => (
              <div key={item._id} className={classNames.imageModalImageWrapper}>
                {/* {item.comment && <Typography className={cx(classNames.imageName, classNames.titleName)}>{item.comment}</Typography>} */}
                {/* <Typography className={cx(classNames.imageName, classNames.titleName)}> */}
                {/*   {t(TranslationKey.Title)} */}
                {/* </Typography> */}

                <Avatar
                  className={classNames.imageModalImage}
                  classes={{ img: classNames.imageModalImage }}
                  src={
                    typeof item.image === 'string'
                      ? item.image
                      : item.image?.file.type.includes('image')
                      ? item.image?.data_url
                      : '/assets/icons/file.png'
                  }
                  alt={item.image?.file?.name || ''}
                  variant="square"
                />

                <Typography className={cx(classNames.imageComment, { [classNames.redText]: isRedImageComment })}>
                  {item.imageComment}
                </Typography>
              </div>
            ))}
          </CustomSlider>
        </div>

        <div className={cx(/* classNames.imageModalSubWrapper, */ classNames.imageModalSubWrapperRightSide)}>
          <Button className={cx(classNames.imagesModalBtn)} onClick={onClickDownloadBtn}>
            <DownloadOutlinedIcon />
          </Button>

          <Button className={cx(classNames.imagesModalBtn)} onClick={onClickZoomBtn}>
            <ZoomOutMapOutlinedIcon />
          </Button>

          {renderBtns && renderBtns()}
        </div>
      </div>

      <Modal
        openModal={zoomOpen}
        setOpenModal={() => setZoomOpen(!zoomOpen)}
        dialogContextClassName={classNames.zoomDialogContext}
      >
        <ImageZoomForm item={zoomImage} />
      </Modal>
    </Modal>
  )
}
