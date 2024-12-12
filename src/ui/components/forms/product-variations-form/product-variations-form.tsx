import { FC, memo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { InterconnectedProduct } from '@components/shared/interconnected-product'

import { t } from '@utils/translations'

import { IVariationProduct } from '@typings/models/products/product-variation'

import { useStyles } from './product-variations-form.style'

interface ProductVariationsFormProps {
  variationProduct: IVariationProduct
  onRemove?: (id: string) => void
  onAdd?: () => void
}

export const ProductVariationsForm: FC<ProductVariationsFormProps> = memo(props => {
  const { variationProduct, onRemove, onAdd } = props

  const { classes: styles } = useStyles()
  const [showBindProductModal, setShowBindProductModal] = useState(false)

  const parentProduct = variationProduct?.parentProduct || variationProduct

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.title}>{t(TranslationKey['Interconnected products'])}</p>

          {onAdd ? (
            <CustomButton
              size="small"
              icon={<FiPlus size={16} />}
              onClick={() => setShowBindProductModal(!showBindProductModal)}
            />
          ) : null}
        </div>

        <div className={styles.content}>
          <InterconnectedProduct isParent variationProduct={parentProduct} onRemove={onRemove} />

          {variationProduct?.childProducts?.map(product => (
            <InterconnectedProduct key={product?._id} variationProduct={product} onRemove={onRemove} />
          ))}
        </div>
      </div>

      {/* <Modal openModal={showBindProductModal} setOpenModal={() => setShowBindProductModal(!showBindProductModal)}>
        <BindProductForm
          sourceProduct={variationProduct}
          onClickGetProductsToBind={onClickGetProductsToBind}
          onClickNextButton={onClickNextButton}
          onClose={() => setShowBindProductModal(!showBindProductModal)}
        />
      </Modal> */}
    </>
  )
})
