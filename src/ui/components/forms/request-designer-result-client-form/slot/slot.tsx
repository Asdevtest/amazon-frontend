/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, MouseEvent, memo, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Input } from '@components/shared/input'
import { SlideByType } from '@components/shared/slide-by-type'
import { PencilIcon, PlusIcon } from '@components/shared/svg-icons'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

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
          <SlideByType mediaFile={item.fileLink} mediaFileIndex={index} />
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
