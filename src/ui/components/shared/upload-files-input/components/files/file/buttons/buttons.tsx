import { FC, memo } from 'react'
import { MdAutorenew, MdHighlightOff } from 'react-icons/md'

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
        <MdAutorenew size={18} className={styles.icon} />

        <input type="file" className={styles.uploadInput} onChange={onUploadFile(fileIndex)} />
      </button>

      <button className={styles.iconButton} onClick={() => onRemoveFile(fileIndex)}>
        <MdHighlightOff size={18} className={styles.icon} />
      </button>
    </div>
  )
})
