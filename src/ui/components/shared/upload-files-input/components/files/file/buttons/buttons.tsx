import { FC, memo } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { useStyles } from './buttons.style'

import { FilesProps } from '../../files'

interface ButtonsProps extends Pick<FilesProps, 'onUploadFile' | 'onRemoveFile'> {
  fileIndex: number
}

export const Buttons: FC<ButtonsProps> = memo(({ fileIndex, onUploadFile, onRemoveFile }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttons}>
      <button className={styles.iconButton}>
        <AutorenewIcon className={styles.icon} fontSize="small" />

        <input type="file" className={styles.uploadInput} onChange={onUploadFile(fileIndex)} />
      </button>

      <button className={styles.iconButton} onClick={() => onRemoveFile(fileIndex)}>
        <HighlightOffIcon className={styles.icon} fontSize="small" />
      </button>
    </div>
  )
})
