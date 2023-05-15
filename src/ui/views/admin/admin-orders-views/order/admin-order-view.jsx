import React, {Component} from 'react'

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

@observer
export class AdminOrderViewRaw extends Component {
  viewModel = new AdminOrderViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  componentWillUnmount() {
    SettingsModel.changeLastCrumbAdditionalText('')
  }

  render() {
    const {classes: classNames} = this.props
    const {
      orderBoxes,
      order,
      history,
      showAddOrEditSupplierModal,
      yuanToDollarRate,
      volumeWeightCoefficient,
      selectedSupplier,
      storekeepers,
      onTriggerAddOrEditSupplierModal,
      onChangeSelectedSupplier,
    } = this.viewModel

    const goBack = () => {
      history.goBack()
    }

    return (
      <React.Fragment>
        <MainContent>
          <div className={classNames.backButtonWrapper}>
            <Button className={classNames.backButton} onClick={goBack}>
              {t(TranslationKey.Back)}
            </Button>
          </div>
          {order ? (
            <OrderContent
              selectedSupplier={selectedSupplier}
              order={order}
              boxes={orderBoxes}
              history={history}
              onChangeSelectedSupplier={onChangeSelectedSupplier}
              onTriggerAddOrEditSupplierModal={onTriggerAddOrEditSupplierModal}
            />
          ) : null}
        </MainContent>

        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onTriggerAddOrEditSupplierModal}>
          <AddOrEditSupplierModalContent
            onlyRead
            product={order?.product}
            storekeepersData={storekeepers}
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            supplier={selectedSupplier}
            onTriggerShowModal={onTriggerAddOrEditSupplierModal}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const AdminOrderView = withStyles(AdminOrderViewRaw, styles)
