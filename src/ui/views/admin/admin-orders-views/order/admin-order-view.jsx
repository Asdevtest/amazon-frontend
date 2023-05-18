import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {OrderContent} from '@components/contents/order-content'
import {MainContent} from '@components/layout/main-content'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content'
import {Button} from '@components/shared/buttons/button'
import {Modal} from '@components/shared/modal'

import {t} from '@utils/translations'

import {AdminOrderViewModel} from './admin-order-view.model'
import {styles} from './admin-order-view.style'

export const AdminOrderViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new AdminOrderViewModel({
        history: props.history,
      }),
  )
  const {classes: classNames} = props

  useEffect(() => {
    viewModel.loadData()

    return () => {
      SettingsModel.changeLastCrumbAdditionalText('')
    }
  }, [])

  const goBack = () => {
    viewModel.history.goBack()
  }

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.backButtonWrapper}>
          <Button className={classNames.backButton} onClick={goBack}>
            {t(TranslationKey.Back)}
          </Button>
        </div>
        {viewModel.order ? (
          <OrderContent
            selectedSupplier={viewModel.selectedSupplier}
            order={viewModel.order}
            boxes={viewModel.orderBoxes}
            history={viewModel.history}
            onChangeSelectedSupplier={viewModel.onChangeSelectedSupplier}
            onTriggerAddOrEditSupplierModal={viewModel.onTriggerAddOrEditSupplierModal}
          />
        ) : null}
      </MainContent>

      <Modal openModal={viewModel.showAddOrEditSupplierModal} setOpenModal={viewModel.onTriggerAddOrEditSupplierModal}>
        <AddOrEditSupplierModalContent
          onlyRead
          product={viewModel.order?.product}
          storekeepersData={viewModel.storekeepers}
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          title={t(TranslationKey['Adding and editing a supplier'])}
          supplier={viewModel.selectedSupplier}
          onTriggerShowModal={viewModel.onTriggerAddOrEditSupplierModal}
        />
      </Modal>
    </React.Fragment>
  )
}

export const AdminOrderView = withStyles(observer(AdminOrderViewRaw), styles)
