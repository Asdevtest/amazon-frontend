import { useState } from 'react'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './selection-supplier-modal.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT],
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const SelectionSupplierModal = ({
  product,
  title,
  onCloseModal,
  onClickFinalAddSupplierButton,
  onSubmitSeekSupplier,
}) => {
  const [comment, setComment] = useState(product?.clientComment || '')

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title || t(TranslationKey['Find a supplier'])}</p>

      {onSubmitSeekSupplier ? (
        <Field
          multiline
          disabled={product && !clientToEditStatuses.includes(product?.status)}
          label={t(TranslationKey['Update product comment:'])}
          minRows={6}
          maxRows={6}
          value={comment}
          placeholder={t(TranslationKey.Comment) + '...'}
          className={styles.comment}
          containerClasses={styles.commentContainer}
          onChange={e => setComment(e.target.value)}
        />
      ) : null}

      <div className={styles.buttonsContainer}>
        <p>{t(TranslationKey['Supplier for a product card'])}</p>

        <div className={styles.buttons}>
          {onSubmitSeekSupplier ? (
            <Button
              tooltipAttentionContent={t(TranslationKey['Paid service'])}
              disabled={product && !clientToEditStatuses.includes(product?.status)}
              onClick={() => onSubmitSeekSupplier(comment)}
            >
              {t(TranslationKey['Send request for supplier search'])}
            </Button>
          ) : null}

          {onClickFinalAddSupplierButton ? (
            <Button
              tooltipAttentionContent={t(TranslationKey['Free service'])}
              disabled={product && !clientToEditStatuses.includes(product?.status)}
              onClick={() => {
                onCloseModal()
                onClickFinalAddSupplierButton()
              }}
            >
              {t(TranslationKey['Add a new supplier'])}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
