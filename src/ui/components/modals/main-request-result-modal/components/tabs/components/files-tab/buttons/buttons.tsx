import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { DownloadArchiveIcon, DownloadRoundIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './buttons.style'

interface ButtonsProps {
  checked: boolean
  disabledSelectAllCheckbox: boolean
  disabledFilesButton: boolean
  disabledArchiveButton: boolean
  onDownloadAllFiles: () => void
  onCheckAllFiles: () => void
  onDownloadArchive: () => void
}

export const Buttons: FC<ButtonsProps> = memo(props => {
  const {
    checked,
    disabledSelectAllCheckbox,
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
        <Checkbox
          checked={checked}
          disabled={disabledSelectAllCheckbox}
          className={styles.checkbox}
          onChange={onCheckAllFiles}
        />
        <p className={styles.text}>{t(TranslationKey['Select all'])}</p>
      </div>

      <div className={styles.buttons}>
        <Button
          disabled={disabledFilesButton}
          className={styles.button}
          styleType={ButtonStyle.PRIMARY}
          variant={ButtonVariant.OUTLINED}
          onClick={onDownloadAllFiles}
        >
          <DownloadRoundIcon className={styles.icon} />
        </Button>

        <Button
          disabled={disabledArchiveButton}
          className={styles.button}
          styleType={ButtonStyle.PRIMARY}
          variant={ButtonVariant.OUTLINED}
          onClick={onDownloadArchive}
        >
          <DownloadArchiveIcon className={styles.icon} />
        </Button>
      </div>
    </div>
  )
})
