/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useRef } from 'react'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Avatar from '@mui/material/Avatar'
import Checkbox from '@mui/material/Checkbox'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'

import { checkIsImageLink } from '@utils/checks'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './slot.style'

interface SlotInterface {
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

export const Slot: FC<SlotInterface> = memo(props => {
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

  const menuAnchor = useRef(null)

  const handleClose = () => {
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

        <p className={styles.imageObjTitle}>{getShortenStringIfLongerThanCount(item.comment, 20)}</p>
      </div>
      <div
        className={cx(
          styles.imageWrapper,
          { [styles.isHaveImage]: !!item.image },
          { [styles.mainImageWrapper]: index === 0 },
        )}
      >
        {index === 0 && <img src="/assets/icons/star-main.svg" className={styles.mainStarIcon} />}

        <div className={styles.imageListItem}>
          <Tooltip
            arrow
            title={getFileNameFromUrl(typeof item.image === 'string' ? item.image : item.image?.file.name)?.fullName}
            placement="right-end"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 300 }}
          >
            <Avatar
              className={styles.image}
              classes={{ img: styles.image }}
              src={
                typeof item.image === 'string'
                  ? checkIsImageLink(item.image)
                    ? item.image
                    : '/assets/icons/file.png'
                  : item.image?.file.type.includes('image')
                  ? item.image?.data_url
                  : '/assets/icons/file.png'
              }
              alt={''}
              variant="square"
              onClick={() => {
                setCurImageIndex(index)

                if (checkIsImageLink(item.image?.file?.name || item.image)) {
                  setShowImageModal(!showImageModal)
                } else {
                  window.open(item.image?.data_url || item.image, '__blank')
                }
              }}
            />
          </Tooltip>
        </div>
      </div>

      <div ref={menuAnchor}>
        {!item.isEditCommentOpen && !noShowActions && (
          <Button className={styles.commentBtn} onClick={() => onClickCommentBtn(item._id)}>
            {t(TranslationKey.Comment)}
            <img
              src={item.commentByClient ? '/assets/icons/white-pencil.svg' : '/assets/icons/white-plus.svg'}
              className={styles.commentIcon}
            />
          </Button>
        )}

        {item.isEditCommentOpen && !noShowActions && (
          <ClickAwayListener
            mouseEvent="onMouseDown"
            onClickAway={() => {
              handleClose()
              onClickCommentBtn(item._id)
            }}
          >
            <div className={cx(styles.commentBtnWrapper)}>
              <div className={cx(styles.commentHideBtn)} onClick={() => onClickCommentBtn(item._id)}>
                <p>{t(TranslationKey.Comment)}</p>

                <ArrowDropUpIcon />
              </div>

              {Boolean(menuAnchor) && (
                <Menu
                  open
                  anchorEl={menuAnchor.current}
                  autoFocus={false}
                  classes={{ list: styles.list }}
                  onClose={handleClose}
                >
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
          </ClickAwayListener>
        )}
      </div>
    </div>
  )
})
