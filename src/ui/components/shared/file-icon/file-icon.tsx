import { FC, memo } from 'react'

import { DefaultFileTypeIcon, DocFileTypeIcon, PdfFileTypeIcon, XlsxFileTypeIcon } from '@components/shared/svg-icons'

import { useStyles } from './file-icon.style'

interface FileIconProps {
  fileExtension: string
  className?: string
}

export const FileIcon: FC<FileIconProps> = memo(({ fileExtension, className }) => {
  const { classes: styles, cx } = useStyles()

  console.log('first', fileExtension)

  switch (fileExtension) {
    case 'doc':
    case 'docx':
      return <DocFileTypeIcon className={cx(styles.fileTypeIcon, className)} />
    case 'pdf':
    case 'com':
      return <PdfFileTypeIcon className={cx(styles.fileTypeIcon, className)} />
    case 'xlsx':
    case 'xls':
      return <XlsxFileTypeIcon className={cx(styles.fileTypeIcon, className)} />
    default:
      return <DefaultFileTypeIcon className={cx(styles.fileTypeIcon, className)} />
  }
})
