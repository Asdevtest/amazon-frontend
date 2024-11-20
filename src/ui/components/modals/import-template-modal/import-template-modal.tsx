import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'
import { MdDownload } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useStyles } from './import-template-modal.style'

import { ImportTemplateModalModel } from './import-template-modal.model'

interface ImportTemplateModalProps {
  supplierId: string
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  updateHandler?: () => void
  modalTitle?: keyof typeof TranslationKey
}

export const ImportTemplateModal: FC<ImportTemplateModalProps> = observer(props => {
  const { classes: styles } = useStyles()
  const { supplierId, modalTitle = 'Import products', openModal, setOpenModal, updateHandler } = props

  const viewModel = useMemo(() => new ImportTemplateModalModel(), [])

  const onCloseModal = () => {
    setOpenModal(false)
  }

  const onClickImport = async () => {
    await viewModel.uploadFiles(supplierId)
    updateHandler?.()
    onCloseModal()
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <p className={styles.title}>{t(TranslationKey[modalTitle])}</p>

        <CustomButton
          size="large"
          icon={<MdDownload size={22} />}
          loading={viewModel.isLoading}
          onClick={viewModel.getTemplate}
        >
          {t(TranslationKey['Download template'])}
        </CustomButton>

        <UploadFilesInput
          withoutLinks
          maxNumber={1}
          dragAndDropButtonHeight={50}
          wrapperClassName={styles.uploadFilesInputWrapper}
          images={viewModel?.files}
          setImages={viewModel?.setFiles}
        />

        <div className={styles.buttonsWrapper}>
          <CustomButton
            size="large"
            disabled={!viewModel.files.length}
            loading={viewModel.isLoading}
            onClick={onClickImport}
          >
            {t(TranslationKey.Import)}
          </CustomButton>

          <CustomButton size="large" onClick={onCloseModal}>
            {t(TranslationKey.Close)}
          </CustomButton>
        </div>
      </div>
    </Modal>
  )
})
