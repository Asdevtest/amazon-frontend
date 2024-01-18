import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './files-cell.style'

interface FilesCellProps {
  filesLength: number
  onClickCell: () => void
}

export const FilesCell: FC<FilesCellProps> = memo(({ filesLength, onClickCell }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {filesLength > 0 ? (
        <button className={styles.visibilityButton} onClick={onClickCell}>
          <EyeIcon className={styles.visibilityIcon} />
        </button>
      ) : (
        t(TranslationKey['No data'])
      )}
    </div>
  )
})
