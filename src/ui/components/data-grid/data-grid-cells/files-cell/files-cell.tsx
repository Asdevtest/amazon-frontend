import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { GalleryModal } from '@components/modals/gallery-modal'
import { Button } from '@components/shared/button'
import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './files-cell.style'

interface FilesCellProps {
  files: UploadFileType[]
}

export const FilesCell: FC<FilesCellProps> = memo(({ files = [] }) => {
  const { classes: styles } = useStyles()

  const [showGalleryModal, setShowGalleryModal] = useState(false)

  const handleToggleGalleryModal = () => setShowGalleryModal(prevState => !prevState)

  return (
    <>
      <div className={styles.wrapper}>
        {files.length > 0 ? (
          <Button
            styleType={ButtonStyle.PRIMARY}
            variant={ButtonVariant.OUTLINED}
            className={styles.button}
            onClick={handleToggleGalleryModal}
          >
            <EyeIcon />
          </Button>
        ) : (
          t(TranslationKey['No data'])
        )}
      </div>

      {showGalleryModal ? (
        <GalleryModal files={files} openModal={showGalleryModal} onOpenModal={handleToggleGalleryModal} />
      ) : null}
    </>
  )
})
