import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { MAX_DEFAULT_MEDIA_FILES } from '@constants/text'

import { checkIsDocumentLink, checkIsMediaFileLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IProductMedia } from '@typings/models/clients/product-media'
import { IRequestMedia } from '@typings/models/requests/request-media'

import { SwitcherConditions } from '../gallery-modal/gallery-modal.type'

import { IState } from './gallery-request-modal.type'

export const useGalleryRequestModal = (data: IProductMedia, mediaFiles: IRequestMedia[], maxNumber?: number) => {
  const [tabValue, setTabValue] = useState<SwitcherConditions>(SwitcherConditions.MEDIA_FILES)
  const [mediaFilesStates, setMediaFilesStates] = useState<IState | undefined>(undefined)
  const [documentsStates, setDocumentsStates] = useState<IState | undefined>(undefined)
  const [allFilesToAdd, setAllFilesToAdd] = useState<IRequestMedia[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)

  useEffect(() => {
    const initialMediaFilesStates: IState = {}
    const initialDocumentsStates: IState = {}

    const filterAndAssign = (files: string[], personKey: string) => {
      initialMediaFilesStates[personKey] = files?.filter(file => checkIsMediaFileLink(getAmazonImageUrl(file))) || []
      initialDocumentsStates[personKey] = files?.filter(file => checkIsDocumentLink(file)) || []
    }

    Object.keys(data).forEach((person: string) => {
      // features of object key typing
      if (person === 'productImages' || person === 'currentSupplierCardImage' || person === 'latestSeoFiles') {
        filterAndAssign(data[person], person)
      }

      if (person === 'supplierCardsImages') {
        data[person]?.forEach((supplier, index) => {
          filterAndAssign(supplier?.images, `supplierCardsImages${index + 1}`)
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
    const findMediaFile = allFilesToAdd.find(fileToAdd => fileToAdd.fileLink === mediaFile)

    let updatedFiles

    if (findMediaFile) {
      updatedFiles = allFilesToAdd.filter(fileToAdd => fileToAdd.fileLink !== mediaFile)
    } else {
      updatedFiles = [
        ...allFilesToAdd,
        { fileLink: mediaFile, commentByPerformer: '', commentByClient: '', _id: uuid() },
      ]
    }

    setAllFilesToAdd(updatedFiles)

    const totalFiles = [
      ...(mediaFilesStates ? Object.values(mediaFilesStates).flat() : []),
      ...(documentsStates ? Object.values(documentsStates).flat() : []),
    ]

    setIsAllSelected(updatedFiles.length === totalFiles.length)
  }

  const handleSelectAllFiles = () => {
    const selectedFiles = [
      ...(mediaFilesStates ? Object.values(mediaFilesStates).flat() : []),
      ...(documentsStates ? Object.values(documentsStates).flat() : []),
    ]

    if (isAllSelected) {
      setAllFilesToAdd([])
    } else {
      setAllFilesToAdd(
        selectedFiles.map(file => ({
          fileLink: file,
          commentByPerformer: '',
          commentByClient: '',
          _id: uuid(),
        })),
      )
    }
    setIsAllSelected(prevState => !prevState)
  }

  const getCheckboxState = (mediaFile: string) => allFilesToAdd.some(fileToAdd => fileToAdd.fileLink === mediaFile)

  const getDisabledCheckbox = (mediaFile: string) => {
    const isFileAdded = allFilesToAdd.some(fileToAdd => fileToAdd.fileLink === mediaFile)
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
    onSelectAllFiles: handleSelectAllFiles,
    isAllSelected,
  }
}
