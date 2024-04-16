import { ChangeEvent, useMemo, useState } from 'react'

import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { LabelWithCopy } from '@components/shared/label-with-copy'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { PencilIcon } from '@components/shared/svg-icons'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'

import { useDimensions } from '@hooks/use-dimensions'

import { useStyles } from './supplier-info.style'

import { IFieldConfig } from '../../basic-info.type'

import { SupplierInfoProps } from './supplier-info.type'

export const useSupplierInfo = ({
  isOrderEditable,
  isPendingOrdering,
  formFields,
  setFormFields,
}: SupplierInfoProps) => {
  const { classes: styles, cx } = useStyles()

  const [showSetBarCodeModal, setShowSetBarCodeModal] = useState(false)
  const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)
  const { length, width, height, weight, unitsSize } = useDimensions(formFields.product, sizeSetting)

  const handleToggleSetBarCodeModal = () => setShowSetBarCodeModal(!showSetBarCodeModal)
  const handleChangeField = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value

    if (!checkIsPositiveNummberAndNoMoreNCharactersAfterDot(currentInputValue, 0)) {
      return
    }

    setFormFields(prevFormFields => ({ ...prevFormFields, [field]: parseInt(currentInputValue) }))
  }
  const handleChangeBarCode = (field: string) => (files: string[]) => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [field]: files }))
  }

  const purchasePrice = useMemo(
    () =>
      formFields?.totalPrice && formFields?.amount
        ? `$ ${toFixed(formFields.totalPrice / formFields.amount, 2)}`
        : t(TranslationKey['No data']),
    [],
  )

  const supplierInfoFieldsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey['Quantity (pcs.)']),
      text: undefined,
      element: (
        <input
          name="amount"
          maxLength={8}
          value={formFields?.amount || 0}
          disabled={!isOrderEditable}
          className={styles.inputAmount}
          onChange={handleChangeField('amount')}
        />
      ),
    },
    {
      title: t(TranslationKey['Purchase price']),
      text: purchasePrice,
      element: undefined,
    },
    {
      title: t(TranslationKey.Supplier),
      text: undefined,
      element: (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={checkAndMakeAbsoluteUrl(formFields?.orderSupplier?.link)}
          className={cx(styles.fieldText, { [styles.link]: formFields?.orderSupplier?.link !== ACCESS_DENIED })}
          onClick={e => {
            if (formFields?.orderSupplier?.link === ACCESS_DENIED) {
              e.preventDefault()
            }
          }}
        >
          {formFields?.orderSupplier?.name}
        </a>
      ),
    },
    {
      title: t(TranslationKey['Production time']),
      text: formFields?.orderSupplier?.productionTerm
        ? String(formFields?.orderSupplier?.productionTerm)
        : t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.BarCode),
      text: undefined,
      element: (
        <div className={styles.barCodeValueContainer}>
          <LabelWithCopy labelValue={formFields?.product?.barCode} lableLinkTitle={t(TranslationKey.View)} />
          {isPendingOrdering ? (
            <button className={styles.pencinButton} onClick={handleToggleSetBarCodeModal}>
              <PencilIcon className={styles.pencilIcon} />
            </button>
          ) : null}
        </div>
      ),
    },
    {
      title: undefined,
      text: undefined,
      element: (
        <div className={styles.switcher}>
          <SizeSwitcher sizeSetting={sizeSetting} onChangeCondition={setSizeSetting} />
        </div>
      ),
    },
    {
      title: t(TranslationKey.Dimensions),
      text:
        formFields?.product?.width && formFields?.product?.height && formFields?.product?.length
          ? `${width} x ${height} x ${length}`
          : t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.Weight),
      text: formFields?.product?.weight ? `${weight} ${unitsSize}` : t(TranslationKey['No data']),
      element: undefined,
    },
  ]

  return {
    supplierInfoFieldsConfig,
    showSetBarCodeModal,
    onToggleSetBarCodeModal: handleToggleSetBarCodeModal,
    onChangeBarCode: handleChangeBarCode,
  }
}
