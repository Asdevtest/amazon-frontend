/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useReactToPrint } from 'react-to-print'

import PrintIcon from '@mui/icons-material/Print'
import { Box, IconButton } from '@mui/material'

import { imageValidTypes } from '@constants/media/image-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { Button } from '@components/shared/button'

import { checkIsHasHttp } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './download-and-print-files-cell.style'

interface DownloadAndPrintFilesCellProps {
  files: any
}

export const DownloadAndPrintFilesCell: FC<DownloadAndPrintFilesCellProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  const imageRef = useRef(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<undefined | any>(undefined)

  const handlePrint = useReactToPrint({
    content: () => imageRef.current,
    documentTitle: 'AwesomeFileName',
    removeAfterPrint: true,
  })

  const handleImagePreview = (el: any) => {
    if (!imageValidTypes.includes(el.fileType)) {
      const fileUrl = el.fileUrl

      window.open(checkIsHasHttp(fileUrl) ? fileUrl : getAmazonImageUrl(fileUrl, true), '_blank')
      return
    }
    setSelectedImage(el)
    setIsOpenModal(true)
  }

  const printFile = (el: any) => {
    if (!imageValidTypes.includes(el.fileType)) {
      const fileUrl = el.fileUrl

      window.open(checkIsHasHttp(fileUrl) ? fileUrl : getAmazonImageUrl(fileUrl, true), '_blank')
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
                <Button isTableButton className={styles.dapBtn} onClick={() => handleImagePreview(el)}>
                  <p>{el?.fileName}</p>
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

      {isOpenModal ? (
        <SlideshowGalleryModal
          openModal={isOpenModal}
          files={[selectedImage?.fileUrl]}
          onOpenModal={() => setIsOpenModal(!isOpenModal)}
        />
      ) : null}
    </>
  )
})
