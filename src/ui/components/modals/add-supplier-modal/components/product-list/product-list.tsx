import { Empty, Spin } from 'antd'
import { FC, UIEvent, memo } from 'react'
import { FaPlus, FaStar } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { SupplierProductShortCard } from '@components/shared/supplier'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './product-list.style'

interface ProductListProps {
  isLoading: boolean
  disabled: boolean
  products: ISupplierCard[]
  onOpenAddProductModal: () => void
  loadMoreProducts?: () => void
}

export const ProductList: FC<ProductListProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { products, isLoading, disabled, onOpenAddProductModal, loadMoreProducts } = props

  return (
    <div className={styles.productsWrapper}>
      <Text type="secondary" copyable={false} text={t(TranslationKey.Cards)} rows={1} />

      <div
        className={styles.productsList}
        onScroll={(event: UIEvent<HTMLDivElement>) => {
          if (loadMoreProducts) {
            const isScrolledToRight =
              event.currentTarget.scrollLeft + event.currentTarget.clientWidth === event.currentTarget.scrollWidth

            if (isScrolledToRight) {
              loadMoreProducts()
            }
          }
        }}
      >
        <CustomButton
          size="large"
          type="dashed"
          disabled={disabled}
          icon={<FaPlus />}
          className={styles.addButton}
          onClick={onOpenAddProductModal}
        />

        {isLoading ? <Spin spinning={isLoading} size="large" className={styles.loading} /> : null}

        {products?.length ? (
          products?.map(supplierCard => (
            <SupplierProductShortCard
              key={supplierCard._id}
              Icon={
                supplierCard.isPrime ? (
                  <CustomButton
                    size="small"
                    type="default"
                    icon={<FaStar className={styles.startIcon} />}
                    className={styles.startIconButton}
                  />
                ) : undefined
              }
              supplierCard={supplierCard}
            />
          ))
        ) : (
          <Empty className={styles.loading} />
        )}
      </div>
    </div>
  )
})
