/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useReactToPrint } from 'react-to-print'

import PrintIcon from '@mui/icons-material/Print'
import { Box, Button, IconButton } from '@mui/material'

import { imageTypes } from '@constants/configs/image-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useDataGridCellStyles } from './download-and-print-files-cell.style'

interface DownloadAndPrintFilesCellProps {
  files: any
}

export const DownloadAndPrintFilesCell: FC<DownloadAndPrintFilesCellProps> = React.memo(({ files }) => {
  const { classes: styles } = useDataGridCellStyles()

  const imageRef = useRef(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<undefined | any>(undefined)

  const handlePrint = useReactToPrint({
    content: () => imageRef.current,
    documentTitle: 'AwesomeFileName',
    removeAfterPrint: true,
  })

  const handleImagePreview = (el: any) => {
    if (!imageTypes.includes(el.fileType)) {
      window.open(el.fileUrl, '_blank')
      return
    }
    setSelectedImage(el)
    setIsOpenModal(true)
  }

  const printFile = (el: any) => {
    if (!imageTypes.includes(el.fileType)) {
      window.open(el.fileUrl, '_blank')
      return
    }
    flushSync(() => setSelectedImage(el))
    handlePrint()
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap="10px" py="14px">
        {files.map((el: any, index: number) => (
          <div key={index}>
            <p className={styles.dapTitle}>{el.title}</p>
            {el?.fileUrl && (
              <Box display="flex" gap="8px" alignItems="center">
                <Button
                  variant="contained"
                  className={styles.dapBtn}
                  onClick={e => {
                    e.stopPropagation()
                    handleImagePreview(el)
                  }}
                >
                  <span>{el?.fileName}</span>
                </Button>

                <IconButton
                  sx={{ color: '#0164F4' }}
                  onClick={e => {
                    e.stopPropagation()
                    printFile(el)
                  }}
                >
                  <PrintIcon
                    classes={{
                      root: styles.printIcon,
                    }}
                  />
                </IconButton>
              </Box>
            )}
            {!el.fileUrl && <p className={styles.notAddedText}>{t(TranslationKey['Not added'])}</p>}
          </div>
        ))}
      </Box>

      <Box display="none">
        <img ref={imageRef} src={getAmazonImageUrl(selectedImage?.fileUrl)} alt="Printed Image" />
      </Box>

      <ImageModal
        isOpenModal={isOpenModal}
        handleOpenModal={() => setIsOpenModal(prevState => !prevState)}
        imageList={[selectedImage?.fileUrl]}
        currentImageIndex={0}
        handleCurrentImageIndex={() => null}
      />
    </>
  )
})
