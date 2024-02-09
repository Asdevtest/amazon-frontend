import { useEffect, useState } from 'react'

import { checkIsDocumentLink, checkIsImageLink, checkIsVideoLink } from '@utils/checks'

import { UploadFileType } from '@typings/upload-file'

import { IData, SwitcherConditions } from './gallery-request-modal.type'

export const useGalleryRequestModal = (data: IData) => {
  const [tabValue, setTabValue] = useState<SwitcherConditions>(SwitcherConditions.MEDIA_FILES)
  const [mediaFilesStates, setMediaFilesStates] = useState<IData | undefined>(undefined)
  const [documentsStates, setDocumentsStates] = useState<IData | undefined>(undefined)
  const [allFilesToAdd, setAllFilesToAdd] = useState<UploadFileType[]>([])

  useEffect(() => {
    const initialMediaFilesStates: IData = {}
    const initialDocumentsStates: IData = {}

    Object.keys(data).forEach(person => {
      initialMediaFilesStates[person] = data[person]?.filter(
        slide => checkIsImageLink(slide) || checkIsVideoLink(slide),
      )
      initialDocumentsStates[person] = data[person]?.filter(slide => checkIsDocumentLink(slide))
    })

    setMediaFilesStates(initialMediaFilesStates)
    setDocumentsStates(initialDocumentsStates)
  }, [data])

  return {
    tabValue,
    setTabValue,

    mediaFilesStates,
    documentsStates,

    allFilesToAdd,
    setAllFilesToAdd,
  }
}
