import { observer } from 'mobx-react'
import { useState } from 'react'

import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './image-edit-form.style'

export const ImageEditForm = observer(({ item, onSave, setOpenModal }) => {
  const { classes: styles } = useStyles()
  const currentItem = typeof item === 'string' ? getAmazonImageUrl(item, true) : item?.data_url

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

    fetch(currentItem)
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

          canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob)
            const extension = blob.type.split('/')[1]

            const readyFile = {
              data_url: url,
              file: new File([blob], extension, {
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
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img
          src={currentItem}
          alt="rotate-image"
          style={{ transform: `rotate(${rotation}deg)` }}
          className={styles.image}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <div className={styles.btnsSubWrapper}>
          <Button onClick={handleRotateLeft}>
            <RotateLeftOutlinedIcon />
          </Button>
          <Button onClick={handleRotateRight}>
            <RotateRightOutlinedIcon />
          </Button>
        </div>

        <div className={styles.btnsSubWrapper}>
          <Button disabled={!rotation} onClick={handleSave}>
            {t(TranslationKey.Save)}
          </Button>
          <Button variant={ButtonVariant.OUTLINED} className={styles.cancelBtn} onClick={setOpenModal}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
})
