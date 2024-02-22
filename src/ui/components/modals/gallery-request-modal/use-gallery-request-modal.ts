import { useEffect, useState } from 'react'

import { MAX_DEFAULT_MEDIA_FILES } from '@constants/text'

import { checkIsDocumentLink, checkIsMediaFileLink } from '@utils/checks'

import { SwitcherConditions } from '../gallery-modal/gallery-modal.type'

import { IData, IMediaFileWithCommentFromRequest, IState } from './gallery-request-modal.type'

export const useGalleryRequestModal = (
  data: IData,
  mediaFiles: IMediaFileWithCommentFromRequest[],
  maxNumber?: number,
) => {
  const [tabValue, setTabValue] = useState<SwitcherConditions>(SwitcherConditions.MEDIA_FILES)
  const [mediaFilesStates, setMediaFilesStates] = useState<IState | undefined>(undefined)
  const [documentsStates, setDocumentsStates] = useState<IState | undefined>(undefined)
  const [allFilesToAdd, setAllFilesToAdd] = useState<IMediaFileWithCommentFromRequest[]>([])

  useEffect(() => {
    const initialMediaFilesStates: IState = {}
    const initialDocumentsStates: IState = {}

    const filterAndAssign = (files: string[], personKey: string) => {
      initialMediaFilesStates[personKey] = files?.filter(file => checkIsMediaFileLink(file)) || []
      initialDocumentsStates[personKey] = files?.filter(file => checkIsDocumentLink(file)) || []
    }

    Object.keys(data).forEach((person: string) => {
      // features of object key typing
      if (person === 'productImages' || person === 'currentSupplierImage' || person === 'latestSeoFiles') {
        filterAndAssign(data[person], person)
      }

      if (person === 'supplierImage') {
        data[person]?.forEach((supplier, index) => {
          filterAndAssign(supplier?.images, `supplierImage${index + 1}`)
        })
      }
    })

    setMediaFilesStates(initialMediaFilesStates)
    setDocumentsStates(initialDocumentsStates)
  }, [data])

  useEffect(() => {
    if (mediaFiles.length > 0) {
      setAllFilesToAdd(mediaFiles)
    }
  }, [mediaFiles])

  const handleResetAllFilesToAdd = () => setAllFilesToAdd([])
  const handleToggleFile = (mediaFile: string) => {
    const findMediaFile = allFilesToAdd.find(fileToAdd => fileToAdd.file === mediaFile)

    if (findMediaFile) {
      setAllFilesToAdd(prevFiles => prevFiles.filter(fileToAdd => fileToAdd.file !== mediaFile))
    } else {
      setAllFilesToAdd(prevFiles => [
        ...prevFiles,
        { file: mediaFile, comment: '', commentByClient: '', _id: String(Date.now()) },
      ])
    }
  }

  const getCheckboxState = (mediaFile: string) => allFilesToAdd.some(fileToAdd => fileToAdd.file === mediaFile)
  const getDisabledCheckbox = (mediaFile: string) => {
    const isFileAdded = allFilesToAdd.some(fileToAdd => fileToAdd.file === mediaFile)
    const isMaxReached = allFilesToAdd.length >= (maxNumber || MAX_DEFAULT_MEDIA_FILES)

    return isFileAdded ? false : isMaxReached
  }

  const filesCounter = `${allFilesToAdd.length} / ${maxNumber || MAX_DEFAULT_MEDIA_FILES}`

  return {
    tabValue,
    setTabValue,

    mediaFilesStates,
    documentsStates,
    allFilesToAdd,
    filesCounter,

    onToggleFile: handleToggleFile,
    onResetAllFilesToAdd: handleResetAllFilesToAdd,
    getCheckboxState,
    getDisabledCheckbox,
  }
}
