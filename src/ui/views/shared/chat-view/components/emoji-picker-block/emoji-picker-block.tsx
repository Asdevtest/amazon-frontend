import EmojiPicker, { Theme } from 'emoji-picker-react'
import { FC, memo } from 'react'
import { GrEmoji } from 'react-icons/gr'

import { SettingsModel } from '@models/settings-model'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './emoji-picker-block.style'

import { useEmojiPicker } from './hooks/use-emoji-picker'

interface EmojiPickerBlockProps {
  onClickEmoji: (emoji: string) => void
}

export const EmojiPickerBlock: FC<EmojiPickerBlockProps> = memo(({ onClickEmoji }) => {
  const { classes: styles } = useStyles()

  const { emojiPickerRef, isShowEmojis, onClickEmojiMenu } = useEmojiPicker()

  return (
    <div ref={emojiPickerRef} className={styles.emojiPickerWrapper}>
      <CustomButton type="text" icon={<GrEmoji size={20} />} onClick={() => onClickEmojiMenu(!isShowEmojis)} />

      {isShowEmojis ? (
        <EmojiPicker
          skinTonesDisabled
          theme={SettingsModel.uiTheme as unknown as Theme}
          style={{ position: 'absolute', top: '0', right: '0', transform: 'translate(0, -100%)' }}
          onEmojiClick={emojiData => onClickEmoji(emojiData.emoji)}
        />
      ) : null}
    </div>
  )
})
