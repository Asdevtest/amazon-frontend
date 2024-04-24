import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { DownloadRoundIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './request-documents-tab.style'

import { IState } from '../../../gallery-request-modal/gallery-request-modal.type'
import { getSupplierTitleByObjectkey } from '../../../gallery-request-modal/helpers/get-supplier-title-by-object-key'
import { hasNonEmptyStringArray } from '../../../gallery-request-modal/helpers/has-non-empty-string-array'

interface RequestDocumentsTabProps {
  data: IState | undefined
  getCheckboxState: (file: string) => boolean
  getDisabledCheckbox: (file: string) => boolean
  onToggleFile: (file: string) => void
}

export const RequestDocumentsTab: FC<RequestDocumentsTabProps> = memo(props => {
  const { data, getCheckboxState, getDisabledCheckbox, onToggleFile } = props

  const { classes: styles, cx } = useStyles()

  const onDownloadFile = (file: UploadFileType) =>
    isString(file) ? downloadFileByLink(file) : downloadFile(file?.file)

  return (
    <div className={styles.wrapper}>
      {hasNonEmptyStringArray(data) && data ? (
        Object.keys(data)?.map(key => {
          const showSection = data[key]?.length > 0

          return showSection ? (
            <div key={key}>
              <p className={styles.title}>{`${getSupplierTitleByObjectkey(key)}:`}</p>

              <div className={styles.files}>
                {data[key]?.map((file, index) => {
                  const fileExtension = file?.split('.')?.slice(-1)?.[0]
                  const fileName = file?.split('.')?.slice(-2)?.join('.')

                  return (
                    <div key={index} className={styles.fileWrapper}>
                      <div className={styles.file}>
                        <CustomFileIcon fileExtension={fileExtension} />

                        <p className={styles.fileName}>{fileName}</p>
                      </div>

                      <div className={styles.icons}>
                        <Checkbox
                          checked={getCheckboxState(file)}
                          disabled={getDisabledCheckbox(file)}
                          className={styles.checkbox}
                          onChange={() => onToggleFile(file)}
                        />

                        <button className={styles.buttonIcon} onClick={() => onDownloadFile(file)}>
                          <DownloadRoundIcon className={cx(styles.icon, styles.downloadIcon)} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null
        })
      ) : (
        <p className={styles.noDocuments}>{t(TranslationKey['No documents'])}</p>
      )}
    </div>
  )
})
