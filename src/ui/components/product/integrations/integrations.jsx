import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {BindInventoryGoodsToStockForm} from '@components/forms/bind-inventory-goods-to-stock-form'
import {Modal} from '@components/modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

import {IntegrationsModel} from './integrations.model'
import {useClassNames} from './integrations.style'

const textConsts = getLocalizedTexts(texts, 'en').integrations

export const Integrations = observer(({productId}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new IntegrationsModel({history, productId}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
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

      <DataGrid
        pagination
        useResizeContainer
        classes={{
          row: classNames.row,
        }}
        rowsPerPageOptions={[15, 25, 50, 100]}
        rows={getCurrentData()}
        rowHeight={100}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columnsModel}
        loading={requestStatus === loadingStatuses.isLoading}
      />

      <Modal
        openModal={showBindInventoryGoodsToStockModal}
        setOpenModal={() => onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
      >
        <BindInventoryGoodsToStockForm
          selectedRowId={productId}
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
        title={textConsts.infoModalTitle}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          onTriggerOpenModal('showInfoModal')
        }}
      />
    </div>
  )
})
