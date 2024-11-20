import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { DownloadArchiveIcon, DownloadRoundIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

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
        <CustomCheckbox
          checked={checked}
          disabled={disabledSelectAllCheckbox}
          className={styles.checkbox}
          onChange={onCheckAllFiles}
        />
        <p className={styles.text}>{t(TranslationKey['Select all'])}</p>
      </div>

      <div className={styles.buttons}>
        <CustomButton
          icon={<DownloadRoundIcon className={styles.icon} />}
          disabled={disabledFilesButton}
          onClick={onDownloadAllFiles}
        />

        <CustomButton
          icon={<DownloadArchiveIcon className={styles.icon} />}
          disabled={disabledArchiveButton}
          onClick={onDownloadArchive}
        />

        {showUpdateSeoFilesInProductButton ? (
          <CustomButton
            disabled={disabledUpdateSeoFilesInProductButton}
            {...(errorUpdateSeoFilesInProduct ? { danger: true } : {})}
            type="primary"
            onClick={onUpdateSeoIFilesInProduct}
          >
            {seoButtonText}
          </CustomButton>
        ) : null}
      </div>
    </div>
  )
})
