import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { PrivateLabelCard } from '@components/private-label-card'
import { Modal } from '@components/shared/modal'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './client-exchange-private-label-view.style'

import { ClientExchangePrivateLabelViewModel } from './client-exchange-private-label-view.model'

export const ClientExchangePrivateLabelViewRaw = props => {
  const [viewModel] = useState(() => new ClientExchangePrivateLabelViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const renderProductsVacant = () => {
    const { productsVacant, setProductToPay } = viewModel

    return productsVacant.map((item, index) => (
      <div key={`product_${item._id}_${index}`} className={classNames.cardWrapper}>
        <PrivateLabelCard item={item} index={index} setProductToPay={setProductToPay} />
      </div>
    ))
  }

  return (
    <React.Fragment>
      <div>
        <div className={classNames.mb5}>
          <div className={classNames.cardsWrapper}>
            {viewModel.productsVacant.length > 0 ? (
              renderProductsVacant()
            ) : (
              <Typography className={classNames.noRows}>{t(TranslationKey['No suggestions'])}</Typography>
            )}
          </div>
        </div>
      </div>

      <Modal
        openModal={viewModel.showConfirmPayModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmPayModal')}
      >
        <SelectShopsModal
          title={t(TranslationKey['You buy a product card, are you sure?'])}
          message={`${t(TranslationKey['You will be charged'])} (${
            viewModel.productToPay && toFixedWithDollarSign(viewModel.productToPay.priceForClient, 2)
          })`}
          shops={viewModel.shopsData}
          product={viewModel.productToPay}
          onClickSuccessBtn={viewModel.onClickBuyProductBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmPayModal')}
        />
      </Modal>

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={t(TranslationKey['Product paid'])}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessModal')
        }}
      />
    </React.Fragment>
  )
}

export const ClientExchangePrivateLabelView = withStyles(observer(ClientExchangePrivateLabelViewRaw), styles)
