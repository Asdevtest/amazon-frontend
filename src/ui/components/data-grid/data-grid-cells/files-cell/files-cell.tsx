import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './files-cell.style'

interface FilesCellProps {
  files: Array<string | IUploadFile>
  onClickCell?: (files: Array<string | IUploadFile>) => void
}

export const FilesCell: FC<FilesCellProps> = memo(({ files, onClickCell }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {files?.length > 0 ? (
        <button className={styles.visibilityButton} onClick={() => (onClickCell ? onClickCell(files) : undefined)}>
          <EyeIcon className={styles.visibilityIcon} />
        </button>
      ) : (
        t(TranslationKey['No data'])
      )}
    </div>
  )
})
