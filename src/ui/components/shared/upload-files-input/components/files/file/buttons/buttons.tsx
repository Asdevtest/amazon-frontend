import { FC, memo } from 'react'
import { BsArrowRepeat } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

import { CustomButton } from '@components/shared/custom-button'

import { useStyles } from './buttons.style'

import { FilesProps } from '../../files'

interface ButtonsProps extends Pick<FilesProps, 'onUploadFile' | 'onRemoveFile'> {
  fileIndex: number
}

export const Buttons: FC<ButtonsProps> = memo(props => {
  const { fileIndex, onUploadFile, onRemoveFile } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttons}>
      <CustomButton icon={<BsArrowRepeat size={12} />} size="small" className={styles.upload}>
        <input type="file" className={styles.uploadInput} onChange={onUploadFile(fileIndex)} />
      </CustomButton>

      <CustomButton
        icon={<IoClose size={12} />}
        size="small"
        className={styles.button}
        onClick={() => onRemoveFile(fileIndex)}
      />
    </div>
  )
})
