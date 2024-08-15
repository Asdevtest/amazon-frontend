import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { GalleryModal } from '@components/modals/gallery-modal'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { FilesIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './files-cell.style'

interface FilesCellProps {
  files: UploadFileType[]
}

export const FilesCell: FC<FilesCellProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  const [showGalleryModal, setShowGalleryModal] = useState(false)

  const handleToggleGalleryModal = () => setShowGalleryModal(prevState => !prevState)

  return (
    <>
      <div className={styles.wrapper}>
        {files?.length > 0 ? (
          <CustomButton
            ghost
            type="primary"
            icon={<FilesIcon />}
            className={styles.icon}
            onClick={handleToggleGalleryModal}
          >
            {files.length}
          </CustomButton>
        ) : (
          t(TranslationKey['No data'])
        )}
      </div>

      <Modal openModal={showGalleryModal} setOpenModal={handleToggleGalleryModal}>
        <GalleryModal files={files || []} />
      </Modal>
    </>
  )
})
