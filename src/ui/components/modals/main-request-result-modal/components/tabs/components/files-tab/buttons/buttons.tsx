import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { DownloadArchiveIcon, DownloadRoundIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './buttons.style'

interface ButtonsProps {
  checked: boolean
  disabledFilesButton: boolean
  disabledArchiveButton: boolean
  onDownloadAllFiles: () => void
  onCheckAllFiles: () => void
  onDownloadArchive: () => void
}

export const Buttons: FC<ButtonsProps> = memo(props => {
  const {
    checked,
    disabledFilesButton,
    disabledArchiveButton,
    onDownloadAllFiles,
    onCheckAllFiles,
    onDownloadArchive,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexlContainer}>
        <Checkbox checked={checked} className={styles.checkbox} onChange={onCheckAllFiles} />
        <p className={styles.text}>{t(TranslationKey['Select all'])}</p>
      </div>

      <div className={styles.flexlContainer}>
        <Button
          disabled={disabledFilesButton}
          className={styles.button}
          styleType={ButtonType.CASUAL}
          onClick={onDownloadAllFiles}
        >
          <DownloadRoundIcon className={styles.icon} />
        </Button>

        <Button
          disabled={disabledArchiveButton}
          className={styles.button}
          styleType={ButtonType.CASUAL}
          onClick={onDownloadArchive}
        >
          <DownloadArchiveIcon className={styles.icon} />
        </Button>
      </div>
    </div>
  )
})
