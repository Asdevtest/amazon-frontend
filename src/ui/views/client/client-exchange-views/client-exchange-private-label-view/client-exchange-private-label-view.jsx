import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { PrivateLabelCard } from '@components/cards/private-label-card'
import { SelectShopsForm } from '@components/forms/select-shops-form'
import { Modal } from '@components/shared/modal'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './client-exchange-private-label-view.style'

import { ClientExchangePrivateLabelViewModel } from './client-exchange-private-label-view.model'

export const ClientExchangePrivateLabelViewRaw = props => {
  const viewModel = useMemo(() => new ClientExchangePrivateLabelViewModel(), [])
  const { classes: styles } = props

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
        <SelectShopsForm
          title={t(TranslationKey['You buy a product card, are you sure?'])}
          message={`${t(TranslationKey['You will be charged'])} (${
            viewModel.productToPay && toFixedWithDollarSign(viewModel.productToPay.priceForClient, 2)
          })`}
          onSubmit={viewModel.onClickBuyProductBtn}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmPayModal')}
        />
      </Modal>
    </>
  )
}

export const ClientExchangePrivateLabelView = withStyles(observer(ClientExchangePrivateLabelViewRaw), styles)
