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
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { checkIsAdmin } from '@utils/checks'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './integrations.style'

import { IntegrationsModel } from './integrations.model'

export const Integrations = observer(({ productId, modal, userRole }) => {
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

  const isAdmin = checkIsAdmin(userRole)
  const isDisabledButton = isAdmin || !selectedRowIds.length

  return (
    <div className={cx(classNames.mainWrapper, { [classNames.modalWrapper]: modal })}>
      {SettingsModel.languageTag && (
        <div className={classNames.addProductBtnsWrapper}>
          <Button disabled={isDisabledButton} onClick={onClickBindInventoryGoodsToStockBtn}>
            {t(TranslationKey['Bind an product from Amazon'])}
          </Button>

          <Button disabled={isDisabledButton} onClick={onUnlinkSkuSProduct}>
            {t(TranslationKey['Unlink an product from Amazon'])}
          </Button>
        </div>
      )}

      <CustomDataGrid
        useResizeContainer
        checkboxSelection
        disableRowSelectionOnClick
        localeText={getLocalizationByLanguageTag()}
        columnVisibilityModel={model.current.columnVisibilityModel}
        paginationModel={paginationModel}
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
        loading={requestStatus === loadingStatuses.IS_LOADING}
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
