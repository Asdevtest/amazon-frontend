import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BindInventoryGoodsToStockForm} from '@components/forms/bind-inventory-goods-to-stock-form'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {IntegrationsModel} from './integrations.model'
import {useClassNames} from './integrations.style'

export const Integrations = observer(({productId}) => {
  const {classes: classNames} = useClassNames()
  const history = useHistory()
  const model = useRef(new IntegrationsModel({history, productId}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    product,
    getCurrentData,
    showBindInventoryGoodsToStockModal,
    showSuccessModal,
    showInfoModal,
    requestStatus,
    columnsModel,
    onTriggerOpenModal,
    sellerBoardDailyData,
    getStockGoodsByFilters,
    onSubmitBindStockGoods,
    onClickBindInventoryGoodsToStockBtn,
  } = model.current

  return (
    <div className={classNames.mainWrapper}>
      {SettingsModel.languageTag && (
        <div className={classNames.addProductBtnsWrapper}>
          <Button
            disableElevation
            className={classNames.buttonOffset}
            variant="contained"
            color="primary"
            onClick={onClickBindInventoryGoodsToStockBtn}
          >
            {t(TranslationKey['Bind an product from Amazon'])}
          </Button>
        </div>
      )}

      <MemoDataGrid
        pagination
        useResizeContainer
        // sx={{
        //   border: 0,
        //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
        //   backgroundColor: theme.palette.background.general,
        // }}
        localeText={getLocalizationByLanguageTag()}
        classes={{
          row: classNames.row,
        }}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={100}
        components={{
          Toolbar: DataGridCustomToolbar,
        }}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
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
        title={t(TranslationKey['The product is bound'])}
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
