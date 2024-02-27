/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MinusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
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
      <Button
        styleType={ButtonStyle.DANGER}
        className={styles.removeButton}
        onClick={() => onClickDeleteButton(product)}
      >
        <MinusIcon className={styles.removeIcon} />
      </Button>
    </div>
  )
})
