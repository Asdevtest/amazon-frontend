import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { PrivateLabelCard } from '@components/cards/private-label-card'
import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { Modal } from '@components/shared/modal'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './client-exchange-private-label-view.style'

import { ClientExchangePrivateLabelViewModel } from './client-exchange-private-label-view.model'

export const ClientExchangePrivateLabelViewRaw = props => {
  const [viewModel] = useState(() => new ClientExchangePrivateLabelViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const renderProductsVacant = () => {
    const { productsVacant, setProductToPay } = viewModel

    return productsVacant.map((item, index) => (
      <div key={`product_${item._id}_${index}`} className={styles.cardWrapper}>
        <PrivateLabelCard item={item} index={index} setProductToPay={setProductToPay} />
      </div>
    ))
  }

  return (
    <>
      <div>
        <div className={styles.mb5}>
          <div className={styles.cardsWrapper}>
            {viewModel.productsVacant.length > 0 ? (
              renderProductsVacant()
            ) : (
              <Typography className={styles.noRows}>{t(TranslationKey['No suggestions'])}</Typography>
            )}
          </div>
        </div>
      </div>

      <Modal
        openModal={viewModel.showConfirmPayModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmPayModal')}
      >
        <SelectShopsModal
          isNotDisabled
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

      {viewModel.showSuccessModal ? (
        <SuccessInfoModal
          // @ts-ignore
          openModal={viewModel.showSuccessModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
          title={t(TranslationKey['Product paid'])}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        />
      ) : null}
    </>
  )
}

export const ClientExchangePrivateLabelView = withStyles(observer(ClientExchangePrivateLabelViewRaw), styles)
