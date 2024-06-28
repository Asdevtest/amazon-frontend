import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
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
  showUpdateSeoFilesInProductButton: boolean
  disabledUpdateSeoFilesInProductButton: boolean
  errorUpdateSeoFilesInProduct: boolean
  onDownloadAllFiles: () => void
  onCheckAllFiles: () => void
  onDownloadArchive: () => void
  onUpdateSeoIFilesInProduct: () => void
}

export const Buttons: FC<ButtonsProps> = memo(props => {
  const {
    checked,
    disabledSelectAllCheckbox,
    disabledFilesButton,
    disabledArchiveButton,
    showUpdateSeoFilesInProductButton,
    disabledUpdateSeoFilesInProductButton,
    errorUpdateSeoFilesInProduct,
    onDownloadAllFiles,
    onCheckAllFiles,
    onDownloadArchive,
    onUpdateSeoIFilesInProduct,
  } = props

  const { classes: styles } = useStyles()

  const seoButtonText = errorUpdateSeoFilesInProduct
    ? t(TranslationKey['Select only one SEO file'])
    : t(TranslationKey['Update SEO files in the product'])

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
        <Button iconButton disabled={disabledFilesButton} onClick={onDownloadAllFiles}>
          <DownloadRoundIcon className={styles.icon} />
        </Button>

        <Button iconButton disabled={disabledArchiveButton} onClick={onDownloadArchive}>
          <DownloadArchiveIcon className={styles.icon} />
        </Button>

        {showUpdateSeoFilesInProductButton ? (
          <Button
            disabled={disabledUpdateSeoFilesInProductButton}
            variant={ButtonVariant.OUTLINED}
            styleType={errorUpdateSeoFilesInProduct ? ButtonStyle.DANGER : ButtonStyle.PRIMARY}
            onClick={onUpdateSeoIFilesInProduct}
          >
            {seoButtonText}
          </Button>
        ) : null}
      </div>
    </div>
  )
})
