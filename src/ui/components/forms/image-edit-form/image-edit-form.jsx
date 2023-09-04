import { useState } from 'react'

import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './image-edit-form.style'

export const ImageEditForm = ({ item, onSave, setOpenModal }) => {
  const { classes: classNames } = useClassNames()

  const [rotation, setRotation] = useState(0)

  const handleRotateLeft = () => {
    setRotation(rotation - 90)
  }

  const handleRotateRight = () => {
    setRotation(rotation + 90)
  }

  const handleSave = () => {
    if (!item) {
      return
    }

    fetch(typeof item === 'string' ? getAmazonImageUrl(item, true) : item.data_url)
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)

        const canvas = document.createElement('canvas')
        const img = new Image()
        img.src = url

        img.onload = () => {
          canvas.width = Math.max(img.width, img.height)
          canvas.height = Math.max(img.width, img.height)

          const ctx = canvas.getContext('2d')
          ctx.translate(canvas.width / 2, canvas.height / 2)
          ctx.rotate((rotation * Math.PI) / 180)
          ctx.drawImage(img, -img.width / 2, -img.height / 2)

          canvas.toBlob(async blob => {
            const url = URL.createObjectURL(blob)

            // console.log('blob', blob)

            const readyFile = {
              data_url: url,
              file: new File([blob], 'rotated-image', {
                type: blob.type,
              }),
            }

            onSave(readyFile)
            setRotation(0)
            setOpenModal()
          })
        }
      })
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.imageWrapper}>
        <img
          style={{ transform: `rotate(${rotation}deg)` }}
          className={classNames.image}
          src={
            typeof item === 'string'
              ? getAmazonImageUrl(item, true)
              : item?.file.type.includes('image')
              ? item?.data_url
              : '/assets/icons/file.png'
          }
        />
      </div>
      <div className={classNames.btnsWrapper}>
        <div className={classNames.btnsSubWrapper}>
          <Button onClick={handleRotateLeft}>
            <RotateLeftOutlinedIcon />
          </Button>
          <Button onClick={handleRotateRight}>
            <RotateRightOutlinedIcon />
          </Button>
        </div>

        <div className={classNames.btnsSubWrapper}>
          <Button disabled={!rotation} onClick={handleSave}>
            {t(TranslationKey.Save)}
          </Button>
          <Button variant="text" className={classNames.cancelBtn} onClick={setOpenModal}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
}
