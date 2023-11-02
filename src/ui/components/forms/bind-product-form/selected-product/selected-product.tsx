/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MinusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { IProductVariation } from '@typings/product'

import { useClassNames } from './selected-product.styles'

interface SelectedProductProps {
  product: IProductVariation
  onClickDeleteButton: (product: IProductVariation) => void
}

export const SelectedProduct: FC<SelectedProductProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { product, onClickDeleteButton } = props

  return (
    <div className={classNames.root}>
      <p className={classNames.text}>
        {t(TranslationKey.ASIN) + ': '}
        <span className={classNames.asin}>{product.asin || t(TranslationKey.Missing)}</span>
      </p>
      <Button danger className={classNames.removeButton} onClick={() => onClickDeleteButton(product)}>
        <MinusIcon className={classNames.removeIcon} />
      </Button>
    </div>
  )
})
