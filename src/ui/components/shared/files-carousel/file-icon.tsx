import { FC } from 'react'

import { DefaultFileTypeIcon, DocFileTypeIcon, PdfFileTypeIcon, XlsxFileTypeIcon } from '@components/shared/svg-icons'

import { useClassNames } from './files-carousel.style'

interface Props {
  fileExtension: string
}

export const FileIcon: FC<Props> = ({ fileExtension }) => {
  const { classes: classNames } = useClassNames()

  switch (fileExtension) {
    case 'doc':
    case 'docx':
      return <DocFileTypeIcon className={classNames.fileTypeIcon} />
    case 'pdf':
      return <PdfFileTypeIcon className={classNames.fileTypeIcon} />
    case 'xlsx':
    case 'xls':
      return <XlsxFileTypeIcon className={classNames.fileTypeIcon} />
    default:
      return <DefaultFileTypeIcon className={classNames.fileTypeIcon} />
  }
}
