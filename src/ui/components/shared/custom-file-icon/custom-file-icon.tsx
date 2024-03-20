import { FC, memo } from 'react'

import { EmptyFileIcon } from '@components/shared/svg-icons'

import { FileExtensions } from '@typings/enums/file-extensions'

import { useStyles } from './custom-file-icon.style'

interface CustomFileIconProps {
  fileExtension: string
  middleSize?: boolean
  onClick?: () => void
}

export const CustomFileIcon: FC<CustomFileIconProps> = memo(props => {
  const { fileExtension, middleSize, onClick } = props
  const { classes: styles, theme, cx } = useStyles()

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

  return (
    <button
      className={cx(styles.wrapper, { [styles.hover]: !!onClick, [styles.middleSizeWrapper]: middleSize })}
      onClick={onClick ? onClick : undefined}
    >
      <EmptyFileIcon className={cx(styles.icon, { [styles.middleSizeIcon]: middleSize })} />

      <p
        style={{ background: getExtensionColor(fileExtension) }}
        className={cx(styles.fileExtension, { [styles.middleSizeFileExtension]: middleSize })}
      >
        {fileExtension}
      </p>
    </button>
  )
})
