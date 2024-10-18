import { FC, memo } from 'react'

import { useStyles } from './files.style'

import { File } from '../file'

interface FilesProps {
  size: string
  files: string[]
}

export const Files: FC<FilesProps> = memo(({ size, files }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.filesWrapper}>
      {files.map(src => (
        <File key={src} size={size} src={src} />
      ))}
    </div>
  )
})
