import { cx } from '@emotion/css'
import React, { useRef, useState } from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Popover, Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { useChatMessageControlsOverlayStyles } from '@components/chat/chat/chat-messages-list/chat-message-controls-overlay/chat-message-controls-overlay.styles'
import { CheckInCircleIcon, ReplyIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

interface ChatMessageControlsOverlayProps {
  onClickReply: () => void
}

export const ChatMessageControlsOverlay = (props: ChatMessageControlsOverlayProps) => {
  const { classes: styles } = useChatMessageControlsOverlayStyles()
  const controlsWrapperRef = useRef<HTMLDivElement>(null)
  const [isShowAdditionalControls, setIsShowAdditionalControls] = useState(false)

  return (
    <div className={cx(styles.controlsOverlay, 'controlsOverlay', { [styles.showOverlay]: isShowAdditionalControls })}>
      <div ref={controlsWrapperRef} className={styles.controls}>
        <Tooltip
          disableInteractive
          title={t(TranslationKey.Reply)}
          placement="left"
          classes={{ tooltip: styles.tooltip }}
        >
          <button onClick={props.onClickReply}>
            <ReplyIcon />
          </button>
        </Tooltip>
      </div>

      <Popover
        open={isShowAdditionalControls}
        anchorEl={controlsWrapperRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: styles.additionalControlsWrapper }}
        onClose={() => setIsShowAdditionalControls(false)}
      >
        <div className={styles.additionalControls}>
          <button className={styles.additionalControlsBtn}>
            <ReplyIcon className={styles.replyIconReversed} /> Resend
          </button>
          <button className={styles.additionalControlsBtn}>
            <CheckInCircleIcon /> {t(TranslationKey.Select)}
          </button>
          <button className={cx(styles.additionalControlsBtn, styles.removeButton)}>
            <DeleteOutlineIcon /> {t(TranslationKey.Delete)}
          </button>
        </div>
      </Popover>
    </div>
  )
}
