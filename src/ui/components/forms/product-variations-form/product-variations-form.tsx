import { Empty } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { InterconnectedProduct } from '@components/shared/interconnected-product'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './product-variations-form.style'

import { BindProductForm } from '../bind-product-form'

import { ProductVariationsFormModel } from './product-vatiations-form.model'

interface ProductVariationsFormProps {
  product: IProduct
  withChangeVariation?: boolean
  onSubmit?: () => void
}

export const ProductVariationsForm: FC<ProductVariationsFormProps> = observer(props => {
  const { product, withChangeVariation, onSubmit } = props

  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new ProductVariationsFormModel(product?.parentProductId || product?._id), [])

  return (
    <>
      <div className={styles.root}>
        {withChangeVariation ? (
          <div className={styles.header}>
            <p className={styles.label}>{t(TranslationKey['Interconnected products'])}</p>

            <CustomButton size="small" icon={<FiPlus size={16} />} onClick={viewModel.onToggleBindProductModal} />
          </div>
        ) : null}

        <div className={cx(styles.content, { [styles.empty]: viewModel.isEmpty })}>
          {viewModel.isEmpty ? (
            <Empty />
          ) : (
            <>
              {viewModel.parentProduct ? (
                <InterconnectedProduct
                  isParent
                  variationProduct={viewModel.parentProduct}
                  onRemove={viewModel.onUnbindProduct}
                />
              ) : null}

              {viewModel.variationProduct?.childProducts?.map(item => (
                <InterconnectedProduct
                  key={product?._id}
                  variationProduct={item}
                  onRemove={viewModel.onUnbindProduct}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <Modal openModal={viewModel.showBindProductModal} setOpenModal={viewModel.onToggleBindProductModal}>
        <BindProductForm product={product} onSubmit={onSubmit} onClose={viewModel.onToggleBindProductModal} />
      </Modal>
    </>
  )
})
