import { FC, memo } from 'react'

import { useStyles } from './file-info.style'

interface FileInfoProps {
  name: string
  type: string
  fileSize: string
}

export const FileInfo: FC<FileInfoProps> = memo(({ name, type, fileSize }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.fileInfo}>
      <p className={styles.fileName}>{`${name}.${type}`}</p>
      <p className={styles.fileSize}>{fileSize}</p>
    </div>
  )
})
