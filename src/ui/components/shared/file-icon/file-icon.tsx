import { cx } from '@emotion/css'
import { FC } from 'react'

import { DefaultFileTypeIcon, DocFileTypeIcon, PdfFileTypeIcon, XlsxFileTypeIcon } from '@components/shared/svg-icons'

import { useClassNames } from './file-icon.style'

interface Props {
  fileExtension: string
  className?: string
}

export const FileIcon: FC<Props> = ({ fileExtension, className }) => {
  const { classes: classNames } = useClassNames()

  switch (fileExtension) {
    case 'doc':
    case 'docx':
      return <DocFileTypeIcon className={cx(classNames.fileTypeIcon, className)} />
    case 'pdf':
      return <PdfFileTypeIcon className={cx(classNames.fileTypeIcon, className)} />
    case 'xlsx':
    case 'xls':
      return <XlsxFileTypeIcon className={cx(classNames.fileTypeIcon, className)} />
    default:
      return <DefaultFileTypeIcon className={cx(classNames.fileTypeIcon, className)} />
  }
}
