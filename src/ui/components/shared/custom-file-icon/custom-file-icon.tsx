import { FC, memo, useEffect, useRef, useState } from 'react'

import { EmptyFileIcon } from '@components/shared/svg-icons'

import { checkAndMakeAbsoluteUrl } from '@utils/text'

import { FileExtensions } from '@typings/enums/file-extensions'

import { useStyles } from './custom-file-icon.style'

import { DEFAULT_BUTTON_HEIGHT, FONT_SIZE_SCALE } from './custom-file-icon.constants'

interface CustomFileIconProps {
  fileExtension: string
  link?: string
  height?: string
  onClick?: () => void
}

export const CustomFileIcon: FC<CustomFileIconProps> = memo(props => {
  const { fileExtension, link, height = DEFAULT_BUTTON_HEIGHT, onClick } = props

  const { classes: styles, theme, cx } = useStyles()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [extensionSize, setExtensionSize] = useState(0)

  const getExtensionColor = (extension: string) => {
    switch (extension) {
      case FileExtensions.XLS:
      case FileExtensions.XLSX:
        return theme.palette.fileIcons.xls
      case FileExtensions.DOC:
      case FileExtensions.DOCX:
        return theme.palette.fileIcons.doc
      case FileExtensions.PDF:
        return theme.palette.fileIcons.pdf
      case FileExtensions.TXT:
        return theme.palette.fileIcons.txt
      case FileExtensions.ZIP:
        return theme.palette.fileIcons.zip
      default:
        return theme.palette.fileIcons.file
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === buttonRef.current) {
          setExtensionSize(entry.contentRect.height / FONT_SIZE_SCALE)
        }
      }
    })

    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current)
    }

    return () => {
      if (buttonRef.current) {
        resizeObserver.unobserve(buttonRef.current)
      }
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      className={cx(styles.wrapper, {
        [styles.hover]: !!link,
      })}
      style={{ height, width: height }}
      onClick={onClick ? onClick : undefined}
    >
      <EmptyFileIcon className={styles.icon} />

      <p
        style={{ fontSize: extensionSize, background: getExtensionColor(fileExtension) }}
        className={styles.fileExtension}
      >
        {fileExtension}
      </p>

      {link ? (
        <a href={checkAndMakeAbsoluteUrl(link)} target="_blank" rel="noreferrer noopener" className={styles.link}>
          {checkAndMakeAbsoluteUrl(link)}
        </a>
      ) : null}
    </button>
  )
})
