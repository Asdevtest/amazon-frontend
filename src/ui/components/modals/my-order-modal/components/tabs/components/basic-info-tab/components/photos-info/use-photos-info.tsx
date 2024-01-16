import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './photos-info.style'

import { IFieldConfig } from '../../basic-info-tab.type'

import { PhotosInfoProps } from './photos-info.type'

export const usePhotosInfo = ({ formFields }: PhotosInfoProps) => {
  const { classes: styles } = useStyles()

  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState<Array<string | IUploadFile>>([])

  const handleToggleGalleryModal = () => setShowGalleryModal(!showGalleryModal)

  const handleOpenGalleryModal = (files?: Array<string | IUploadFile>) => {
    if (files && files.length > 0) {
      setGalleryFiles(files)
    } else {
      setGalleryFiles([])
    }

    setShowGalleryModal(!showGalleryModal)
  }

  const photosConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey['Order photos']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: formFields?.images,
    },
    {
      title: t(TranslationKey['Photos of current supplier']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: formFields?.orderSupplier?.images,
    },
    {
      title: t(TranslationKey['Supplier payment']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: formFields?.paymentDetails,
    },
  ]

  return {
    photosConfig,
    galleryFiles,
    showGalleryModal,
    onToggleGalleryModal: handleToggleGalleryModal,
    onOpenGalleryModal: handleOpenGalleryModal,
  }
}
