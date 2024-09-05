import { Dropdown, Tooltip } from 'antd'
import { MdReply } from 'react-icons/md'
import { RiShareForwardFill } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { ReplyIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './chat-message-controls-overlay.style'

interface ChatMessageControlsOverlayProps {
  onClickReply: () => void
}

export const ChatMessageControlsOverlay = (props: ChatMessageControlsOverlayProps) => {
  const { classes: styles, cx } = useStyles()

  const items = [
    {
      key: 'reply',
      label: (
        <CustomButton icon={<MdReply />} onClick={props.onClickReply}>
          {t(TranslationKey.Reply)}
        </CustomButton>
      ),
    },
    {
      key: 'forward',
      label: (
        <CustomButton icon={<RiShareForwardFill />} onClick={props.onClickReply}>
          {t(TranslationKey.Reply)}
        </CustomButton>
      ),
    },
  ]

  return (
    <div className={cx(styles.controlsOverlay, 'controlsOverlay')}>
      <Dropdown menu={{ items }} trigger={['contextMenu']}>
        <div className={styles.controls}>
          <Tooltip title={t(TranslationKey.Reply)} placement="left">
            <button onClick={props.onClickReply}>
              <ReplyIcon />
            </button>
          </Tooltip>
        </div>
      </Dropdown>
    </div>
  )
}
