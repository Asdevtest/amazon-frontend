/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, MouseEvent, memo, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { Input } from '@components/shared/input'
import { SlideByType } from '@components/shared/slide-by-type'
import { PencilIcon, PlusIcon } from '@components/shared/svg-icons'
import { VideoPreloader } from '@components/shared/video-preloader'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { isString } from '@typings/guards'

import { useStyles } from './slot.style'

interface SlotProps {
  item: any
  imagesForDownload: any
  index: number
  setCurImageIndex: (index: number) => void
  onChangeImageFileds: (item: string, id: string) => void
  onClickCommentBtn: (item: string) => void
  onClickAddDownload: (item: any) => void
  setShowImageModal: (value: boolean) => void
  showImageModal?: boolean
  noShowActions?: boolean
}

export const Slot: FC<SlotProps> = memo(props => {
  const {
    item,
    noShowActions,
    showImageModal,
    index,
    imagesForDownload,
    setCurImageIndex,
    setShowImageModal,
    onChangeImageFileds,
    onClickCommentBtn,
    onClickAddDownload,
  } = props
  const { classes: styles, cx } = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    onClickCommentBtn(item._id)
  }
  const handleClose = () => {
    setAnchorEl(null)
    onClickCommentBtn(item._id)
  }

  const mediaFile = isString(item.fileLink) ? getAmazonImageUrl(item.fileLink) : item.fileLink?.data_url

  return (
    <div className={styles.imageObjWrapper}>
      <div className={styles.imageObjSubWrapper}>
        <Checkbox
          color="primary"
          checked={imagesForDownload.some((el: any) => el._id === item._id)}
          onClick={() => onClickAddDownload(item)}
        />

        <p className={styles.imageObjIndex}>{index + 1}</p>

        <p className={styles.imageObjTitle}>{getShortenStringIfLongerThanCount(item.commentByPerformer, 20)}</p>
      </div>

      <div
        className={cx(
          styles.imageWrapper,
          { [styles.isHaveImage]: !!item.fileLink },
          { [styles.mainImageWrapper]: index === 0 },
        )}
      >
        {index === 0 && <img src="/assets/icons/star-main.svg" className={styles.mainStarIcon} />}

        <div className={styles.imageListItem}>
          <SlideByType
            mediaFile={mediaFile}
            mediaFileIndex={index}
            ImageComponent={({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className={styles.image}
                onClick={() => {
                  setCurImageIndex(index)
                  setShowImageModal(!showImageModal)
                }}
              />
            )}
            VideoComponent={({ videoSource }) => (
              <VideoPreloader
                videoSource={videoSource}
                onClick={() => {
                  setCurImageIndex(index)
                  setShowImageModal(!showImageModal)
                }}
              />
            )}
            FileComponent={({ documentLink, fileExtension }) => (
              <a href={documentLink} target="_blank" rel="noreferrer noopener" className={styles.document}>
                <CustomFileIcon fileExtension={fileExtension} height="100%" />
                <span className={styles.linkText}>{documentLink}</span>
              </a>
            )}
          />
        </div>
      </div>

      {!noShowActions && (
        <div>
          <Button className={styles.commentBtn} onClick={handleClick}>
            {t(TranslationKey.Comment)}

            {item.commentByClient ? (
              <PencilIcon className={styles.commentIcon} />
            ) : (
              <PlusIcon className={styles.commentIcon} />
            )}
          </Button>

          {open && (
            <Menu open anchorEl={anchorEl} autoFocus={false} classes={{ list: styles.list }} onClose={handleClose}>
              <Input
                autoFocus
                multiline
                type="text"
                inputProps={{ maxLength: 500 }}
                minRows={5}
                maxRows={10}
                variant="filled"
                className={styles.imageObjInput}
                classes={{ input: styles.subImageObjInput }}
                value={item.commentByClient}
                onChange={onChangeImageFileds('commentByClient', item._id)}
              />
            </Menu>
          )}
        </div>
      )}
    </div>
  )
})
