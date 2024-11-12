import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BindInventoryGoodsToStockForm } from '@components/forms/bind-inventory-goods-to-stock-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './integrations.style'

import { IntegrationsModel } from './integrations.model'

export const Integrations = observer(({ productId, modal, userRole }) => {
  const { classes: styles, cx } = useStyles()
  const model = useRef(new IntegrationsModel({ productId }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    selectedRowIds,
    product,
    getCurrentData,
    showBindInventoryGoodsToStockModal,
    requestStatus,
    columnsModel,
    paginationModel,
    columnVisibilityModel,
    onPaginationModelChange,
    onColumnVisibilityModelChange,
    onTriggerOpenModal,
    sellerBoardDailyData,
    getStockGoodsByFilters,
    onSubmitBindStockGoods,
    onClickBindInventoryGoodsToStockBtn,
    onSelectionModel,
    onUnlinkSkuSProduct,
  } = model.current

  const isAdmin = checkIsAdmin(userRole)
  const isDisabledUnlinkButton = isAdmin || !selectedRowIds.length

  return (
    <div className={cx(styles.mainWrapper, { [styles.modalWrapper]: modal })}>
      <div className={styles.addProductBtnsWrapper}>
        <CustomButton disabled={isAdmin} onClick={onClickBindInventoryGoodsToStockBtn}>
          {t(TranslationKey['Bind an product from Amazon'])}
        </CustomButton>

        <CustomButton disabled={isDisabledUnlinkButton} onClick={onUnlinkSkuSProduct}>
          {t(TranslationKey['Unlink an product from Amazon'])}
        </CustomButton>
      </div>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        columnVisibilityModel={columnVisibilityModel}
        paginationModel={paginationModel}
        rows={getCurrentData()}
        getRowHeight={() => 'auto'}
        sortingMode="client"
        paginationMode="client"
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          toolbar: {
            columsBtnSettings: {
              columnsModel,
              columnVisibilityModel,
              onColumnVisibilityModelChange,
            },
          },
        }}
        columns={columnsModel}
        loading={requestStatus === loadingStatus.IS_LOADING}
        rowSelectionModel={selectedRowIds}
        onPaginationModelChange={onPaginationModelChange}
        onRowSelectionModelChange={onSelectionModel}
      />

      <Modal
        openModal={showBindInventoryGoodsToStockModal}
        setOpenModal={() => onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
      >
        <BindInventoryGoodsToStockForm
          asin={product?.asin}
          productId={product?._id}
          onCloseModal={() => onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
        />
      </Modal>
    </div>
  )
})
