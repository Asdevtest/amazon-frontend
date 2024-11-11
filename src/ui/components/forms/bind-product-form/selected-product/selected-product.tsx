import { observer } from 'mobx-react'
import { FC } from 'react'
import { FaMinus } from 'react-icons/fa6'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './selected-product.style'

interface SelectedProductProps {
  product: IProduct
  onClickDeleteButton: (product: IProduct) => void
}

export const SelectedProduct: FC<SelectedProductProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { product, onClickDeleteButton } = props

  return (
    <div className={styles.root}>
      <p className={styles.text}>
        {t(TranslationKey.ASIN) + ': '}
        <span className={styles.asin}>{product.asin || t(TranslationKey.Missing)}</span>
      </p>
      <CustomButton danger icon={<FaMinus size={18} />} type="primary" onClick={() => onClickDeleteButton(product)} />
    </div>
  )
})
