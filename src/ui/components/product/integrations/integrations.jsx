import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { BindInventoryGoodsToStockForm } from '@components/forms/bind-inventory-goods-to-stock-form'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './integrations.style'

import { IntegrationsModel } from './integrations.model'

export const Integrations = observer(({ productId, modal }) => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const model = useRef(new IntegrationsModel({ history, productId }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    successInfoModalText,
    selectedRowIds,
    product,
    getCurrentData,
    showBindInventoryGoodsToStockModal,
    showSuccessModal,
    showInfoModal,
    requestStatus,
    columnsModel,
    paginationModel,
    onChangePaginationModelChange,

    onTriggerOpenModal,
    sellerBoardDailyData,
    getStockGoodsByFilters,
    onSubmitBindStockGoods,
    onClickBindInventoryGoodsToStockBtn,
    onSelectionModel,
    onUnlinkSkuSProduct,
  } = model.current

  return (
    <div className={cx(classNames.mainWrapper, { [classNames.modalWrapper]: modal })}>
      {SettingsModel.languageTag && (
        <div className={classNames.addProductBtnsWrapper}>
          <Button onClick={onClickBindInventoryGoodsToStockBtn}>
            {t(TranslationKey['Bind an product from Amazon'])}
          </Button>

          <Button disabled={!selectedRowIds.length} onClick={onUnlinkSkuSProduct}>
            {t(TranslationKey['Unlink an product from Amazon'])}
          </Button>
        </div>
      )}

      <MemoDataGrid
        useResizeContainer
        checkboxSelection
        localeText={getLocalizationByLanguageTag()}
        columnVisibilityModel={model.current.columnVisibilityModel}
        paginationModel={paginationModel}
        pageSizeOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={100}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          toolbar: {
            columsBtnSettings: {
              columnsModel,
              columnVisibilityModel: model.current.columnVisibilityModel,
              onColumnVisibilityModelChange: model.current.onColumnVisibilityModelChange,
            },
          },
        }}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
        rowSelectionModel={selectedRowIds}
        onPaginationModelChange={onChangePaginationModelChange}
        onRowSelectionModelChange={onSelectionModel}
      />

      <Modal
        openModal={showBindInventoryGoodsToStockModal}
        setOpenModal={() => onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
      >
        <BindInventoryGoodsToStockForm
          product={product}
          stockData={sellerBoardDailyData}
          updateStockData={getStockGoodsByFilters}
          onSubmit={onSubmitBindStockGoods}
        />
      </Modal>

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={successInfoModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
        }}
      />

      <WarningInfoModal
        openModal={showInfoModal}
        setOpenModal={() => onTriggerOpenModal('showInfoModal')}
        title={t(TranslationKey["You can't bind"])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          onTriggerOpenModal('showInfoModal')
        }}
      />
    </div>
  )
})
