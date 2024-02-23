/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, MouseEvent, memo, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'
import { PencilIcon, PlusIcon } from '@components/shared/svg-icons'

import { checkIsMediaFileLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
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
          <Tooltip
            arrow
            title={getFileNameFromUrl(isString(item.fileLink) ? item.fileLink : item.fileLink?.file.name)?.fullName}
            placement="right-end"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 300 }}
          >
            <Avatar
              className={styles.image}
              classes={{ img: styles.image }}
              src={
                isString(item.fileLink)
                  ? checkIsMediaFileLink(item.fileLink)
                    ? getAmazonImageUrl(item.fileLink, false)
                    : '/assets/icons/file.png'
                  : item.fileLink?.file.type.includes('image')
                  ? item.fileLink?.data_url
                  : '/assets/icons/file.png'
              }
              alt={''}
              variant="square"
              onClick={() => {
                setCurImageIndex(index)

                if (checkIsMediaFileLink(item.fileLink?.file?.name || item.fileLink)) {
                  setShowImageModal(!showImageModal)
                } else {
                  window.open(item.fileLink?.data_url || getAmazonImageUrl(item.fileLink), '__blank')
                }
              }}
            />
          </Tooltip>
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
