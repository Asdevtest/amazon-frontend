import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

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
        <Button
          styleType={ButtonStyle.PRIMARY}
          variant={ButtonVariant.OUTLINED}
          className={styles.button}
          onClick={onClickCell}
        >
          <EyeIcon />
        </Button>
      ) : (
        t(TranslationKey['No data'])
      )}
    </div>
  )
})
