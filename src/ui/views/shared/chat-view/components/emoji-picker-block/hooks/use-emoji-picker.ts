import { useCallback, useEffect, useRef, useState } from 'react'

export const useEmojiPicker = () => {
  const emojiPickerRef = useRef<HTMLDivElement | null>(null)

  const [isShowEmojis, setIsShowEmojis] = useState<boolean>(false)

  const onClickEmojiMenu = useCallback((value: boolean) => {
    setIsShowEmojis(value)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current?.contains(event?.target as Node)) {
        setIsShowEmojis(false)
      }
    }

    document?.addEventListener('click', handleClickOutside)

    return () => {
      document?.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return {
    emojiPickerRef,
    isShowEmojis,
    onClickEmojiMenu,
  }
}
