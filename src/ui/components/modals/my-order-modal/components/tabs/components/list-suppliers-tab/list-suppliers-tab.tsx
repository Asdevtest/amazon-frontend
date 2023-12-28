import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { EyeIcon } from '@components/shared/svg-icons'
import { suppliersOrderColumn } from '@components/table/table-columns/shared/suppliers-order-column'

import { t } from '@utils/translations'

import { IPlatformSettings } from '@typings/patform-settings'
import { ISupplier } from '@typings/product'

import { useStyles } from './list-suppliers-tab.style'

interface ListSuppliersTabProps {
  order: any
  platformSettings: IPlatformSettings
}

export const ListSuppliersTab: FC<ListSuppliersTabProps> = memo(props => {
  const { order, platformSettings } = props

  const { classes: styles } = useStyles()

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })
  const [selectionModel, setSelectionModel] = useState<string[]>([])
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])

  useEffect(() => {
    const product = order?.product

    if (product?.suppliers?.length > 0) {
      const currentSupplierId = product.currentSupplier?._id

      if (currentSupplierId) {
        setSelectionModel(prevState => [...prevState, currentSupplierId])
      }

      const foundCurrentSupplier = product.suppliers.find((supplier: ISupplier) => supplier._id === currentSupplierId)
      const filteringSuppliers = product.suppliers.filter((supplier: ISupplier) => supplier._id !== currentSupplierId)
      const resultSuppliers = foundCurrentSupplier ? [foundCurrentSupplier, ...filteringSuppliers] : product.suppliers

      setSuppliers(resultSuppliers.map((supplier: ISupplier) => ({ ...supplier, id: supplier._id })))
    }
  }, [order])

  const showVisibilityButton = selectionModel.length > 0

  return (
    <div className={styles.wrapper}>
      <CustomDataGrid
        disableColumnMenu
        rows={suppliers}
        rowCount={suppliers.length}
        getRowHeight={() => 'auto'}
        columns={suppliersOrderColumn(platformSettings)}
        paginationModel={paginationModel}
        rowSelectionModel={selectionModel}
        sx={{
          '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
        }}
        slotProps={{
          toolbar: {
            children: (
              <div className={styles.toolbar}>
                <p className={styles.tableTitle}>{t(TranslationKey['List of suppliers'])}</p>

                <div className={styles.actionsButtons}>
                  {showVisibilityButton && (
                    <button className={styles.visibilityButton}>
                      <EyeIcon className={styles.visibilityIcon} />
                    </button>
                  )}
                </div>
              </div>
            ),
          },
        }}
        onPaginationModelChange={setPaginationModel}
        onRowSelectionModelChange={setSelectionModel}
      />
    </div>
  )
})
