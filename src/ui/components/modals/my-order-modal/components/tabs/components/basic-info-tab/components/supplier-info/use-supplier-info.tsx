import { ChangeEvent, useMemo, useState } from 'react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Pencil } from '@components/shared/svg-icons'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './supplier-info.style'

import { IFieldConfig } from '../../basic-info-tab.type'

import { SupplierInfoProps } from './supplier-info.type'

export const useSupplierInfo = ({
  isOrderEditable,
  isPendingOrdering,
  formFields,
  setFormFields,
}: SupplierInfoProps) => {
  const { classes: styles, cx } = useStyles()

  const [showSetBarCodeModal, setShowSetBarCodeModal] = useState(false)
  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const handleToggleSetBarCodeModal = () => setShowSetBarCodeModal(!showSetBarCodeModal)

  const onChangeField = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = event.target.value

    if (!checkIsPositiveNummberAndNoMoreNCharactersAfterDot(currentInputValue, 0)) {
      return
    }

    setFormFields(prevFormFields => ({ ...prevFormFields, [field]: parseInt(currentInputValue) }))
  }

  const onChangeBarCode = (field: string) => (files: string[]) => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [field]: files }))
  }

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const weightSizesType = getWeightSizesType(sizeSetting)
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
          value={formFields?.amount}
          disabled={!isOrderEditable}
          className={styles.inputAmount}
          onChange={onChangeField('amount')}
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
          className={cx(styles.fieldText, { [styles.link]: formFields?.orderSupplier?.link !== 'access denied' })}
          onClick={e => {
            if (formFields?.orderSupplier?.link === 'access denied') {
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
              <Pencil className={styles.pencilIcon} />
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
          <CustomSwitcher
            switchMode="small"
            condition={sizeSetting}
            switcherSettings={[
              { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
              { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
            ]}
            changeConditionHandler={condition => setSizeSetting(condition as string)} // (as string) - CustomSwitcher types bug
          />
        </div>
      ),
    },
    {
      title: t(TranslationKey.Dimensions),
      text:
        formFields?.product?.width && formFields?.product?.height && formFields?.product?.length
          ? `${
              toFixed(formFields?.product?.width / lengthConversion, 2) +
              ' x ' +
              toFixed(formFields?.product?.height / lengthConversion, 2) +
              ' x ' +
              toFixed(formFields?.product?.length / lengthConversion, 2)
            }`
          : t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.Weight),
      text: formFields?.product?.weight
        ? `${toFixed(formFields?.product?.weight / weightConversion, 2)} ${weightSizesType}`
        : t(TranslationKey['No data']),
      element: undefined,
    },
  ]

  return {
    supplierInfoFieldsConfig,
    showSetBarCodeModal,
    onToggleSetBarCodeModal: handleToggleSetBarCodeModal,
    onChangeBarCode,
  }
}
