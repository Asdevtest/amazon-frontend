import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { PrivateLabelCard } from '@components/cards/private-label-card'
import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { Modal } from '@components/shared/modal'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './client-exchange-private-label-view.style'

import { ClientExchangePrivateLabelViewModel } from './client-exchange-private-label-view.model'

export const ClientExchangePrivateLabelViewRaw = props => {
  const viewModel = useMemo(() => new ClientExchangePrivateLabelViewModel({ history: props.history }), [])
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
      <div className={styles.mb5}>
        <div className={styles.cardsWrapper}>
          {viewModel.productsVacant.length > 0 ? (
            renderProductsVacant()
          ) : (
            <p className={styles.noRows}>{t(TranslationKey['No suggestions'])}</p>
          )}
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
    </>
  )
}

export const ClientExchangePrivateLabelView = withStyles(observer(ClientExchangePrivateLabelViewRaw), styles)
