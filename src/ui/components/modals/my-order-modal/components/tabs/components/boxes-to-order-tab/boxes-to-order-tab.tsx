import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { GalleryModal } from '@components/modals/gallery-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { boxesToOrderColumn } from '@components/table/table-columns/shared/boxes-to-order-column'

import { t } from '@utils/translations'

import { IOrderBox } from '@typings/order-box'
import { IPlatformSettings } from '@typings/patform-settings'
import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './boxes-to-order-tab.style'

interface IBoxState extends IOrderBox {
  id: string
  asin: string
  amazonTitle: string
  boxProductPreview: string | IUploadFile
  skuByClient: string
}

interface BoxesToOrderTabProps {
  order: any
  orderBoxes: IOrderBox[]
  platformSettings: IPlatformSettings
}

export const BoxesToOrderTab: FC<BoxesToOrderTabProps> = memo(props => {
  const { order, orderBoxes, platformSettings } = props

  const { classes: styles } = useStyles()

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })
  const [boxes, setBoxes] = useState<IBoxState[]>([])
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState<Array<string | IUploadFile>>([])

  const handleOpenGalleryModal = (files?: Array<string | IUploadFile>) => {
    if (files && files.length > 0) {
      setGalleryFiles(files)
    } else {
      setGalleryFiles([])
    }

    setShowGalleryModal(!showGalleryModal)
  }

  useEffect(() => {
    if (orderBoxes.length > 0) {
      const transformedBoxesForColumnModel = orderBoxes.map(box => ({
        ...box,
        id: box._id,
        asin: order.product?.asin || '',
        boxProductPreview: order.product?.images?.[0] || '',
        amazonTitle: order.product?.amazonTitle || '',
        skuByClient: order.product?.skuByClient || '',
      }))

      setBoxes(transformedBoxesForColumnModel)
    }
  }, [orderBoxes])

  return (
    <>
      <div className={styles.wrapper}>
        <CustomDataGrid
          disableColumnMenu
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          rows={boxes}
          rowCount={boxes.length}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          columns={boxesToOrderColumn({
            platformSettings,
            onOpenGalleryModal: handleOpenGalleryModal,
          })}
          paginationModel={paginationModel}
          sx={{
            '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
          }}
          slotProps={{
            toolbar: {
              children: (
                <div className={styles.toolbar}>
                  <p className={styles.tableTitle}>{t(TranslationKey['Boxes to order'])}</p>
                </div>
              ),
            },
          }}
          onPaginationModelChange={setPaginationModel}
        />
      </div>

      {showGalleryModal && (
        <GalleryModal
          files={galleryFiles}
          isOpenModal={showGalleryModal}
          onOpenModal={() => setShowGalleryModal(!showGalleryModal)}
        />
      )}
    </>
  )
})
