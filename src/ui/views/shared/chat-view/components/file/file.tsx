import { FC, memo, useEffect, useMemo, useState } from 'react'

import { CustomFileIcon } from '@components/shared/custom-file-icon'

import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { downloadFileByLink, getFileWeight } from '@utils/upload-files'

import { useStyles } from './file.style'

import { FileInfo } from '../file-info'

interface FileProps {
  src: string
  size: string
  withoutInfo?: boolean
}

export const File: FC<FileProps> = memo(({ src, size, withoutInfo }) => {
  const { classes: styles } = useStyles()

  const [fileSize, setFileSize] = useState('0 byte')

  const recreatedFile = getFileNameFromUrl(src)
  const fileType = useMemo(() => recreatedFile?.type as string, [])

  const getFileInfo = async () => {
    const res = await getFileWeight(src)
    setFileSize(res)
  }

  useEffect(() => {
    getFileInfo()
  }, [])

  return (
    <div className={styles.fileWrapper} onClick={() => downloadFileByLink(src, recreatedFile?.name)}>
      <CustomFileIcon fileExtension={fileType} height={size} />

      {withoutInfo ? null : <FileInfo name={recreatedFile?.name as string} type={fileType} fileSize={fileSize} />}
    </div>
  )
})
