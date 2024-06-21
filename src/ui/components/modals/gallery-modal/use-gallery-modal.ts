import { useEffect, useState } from 'react'

import { checkIsDocumentLink, checkIsMediaFileLink } from '@utils/checks'

import { UploadFileType } from '@typings/shared/upload-file'

import { SwitcherConditions } from './gallery-modal.type'

export const useGalleryModal = (files: UploadFileType[]) => {
  const [tabValue, setTabValue] = useState<SwitcherConditions>(SwitcherConditions.MEDIA_FILES)
  const [mediaFiles, setMediaFiles] = useState<UploadFileType[]>([])
  const [documents, setDocuments] = useState<UploadFileType[]>([])

  useEffect(() => {
    if (files.length > 0) {
      setDocuments(files.filter(slide => checkIsDocumentLink(slide)))
      setMediaFiles(files.filter(slide => checkIsMediaFileLink(slide)))
    }
  }, [files])

  return {
    tabValue,
    setTabValue,
    visibleSlides: tabValue ? documents : mediaFiles,
  }
}
