import { TranslationKey } from '@constants/translations/translation-key'
import { useClassNames } from './source-product.styles'
import { t } from '@utils/translations'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

export const SourceProduct = () => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <p>{t(TranslationKey.Comments)}</p>

      <div className={classNames.sourceProductWrapper}>
        <img src={'222222'} alt="121" />

        <div className={classNames.attributesProductWrapper}>
          <AsinOrSkuLink withCopyValue asin={'ASIN'} />
          <AsinOrSkuLink withCopyValue sku={'sku'} />
        </div>
      </div>
    </div>
  )
}
