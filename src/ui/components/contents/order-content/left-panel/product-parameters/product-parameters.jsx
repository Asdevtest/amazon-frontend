import { useState } from 'react'

import { Link, Typography } from '@mui/material'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'

import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './product-parameters.style'

export const ProductParameters = ({
  order,
  collapsed,
  formFields,
  onChangeField,
  isCanChange,
  onClickBarcode,
  onDeleteBarcode,
}) => {
  const { classes: styles } = useStyles()

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const weightSizesType = getWeightSizesType(sizeSetting)
  // const maxDelivery = calcMaxDeliveryForProduct(order?.product)

  const OrderParameter = ({ label, value }) => (
    <Field
      oneLine
      label={label}
      containerClasses={styles.parameterTableCellWrapper}
      labelClasses={styles.fieldLabel}
      inputComponent={<Typography className={styles.text}>{value}</Typography>}
    />
  )

  return (
    <div className={styles.container}>
      <Field
        oneLine
        disabled={!isCanChange}
        inputProps={{ maxLength: 8 }}
        label={t(TranslationKey['Quantity (pcs.)'])}
        inputClasses={styles.amountInput}
        classes={{ input: styles.amountInput }}
        containerClasses={styles.parameterTableCellWrapper}
        labelClasses={styles.fieldLabel}
        value={formFields.amount}
        onChange={onChangeField('amount')}
      />
      <OrderParameter
        label={t(TranslationKey['Purchase price'])}
        value={toFixed(order?.totalPrice / order?.amount, 2)}
      />

      <Field
        oneLine
        label={t(TranslationKey.Supplier)}
        containerClasses={styles.parameterTableCellWrapper}
        labelClasses={styles.fieldLabel}
        inputComponent={
          <div>
            {order.orderSupplier?.link === ACCESS_DENIED ? (
              <Typography className={styles.scrollingText}>{order.orderSupplier?.link}</Typography>
            ) : (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.orderSupplier?.link)}>
                <Typography className={styles.scrollingText}>{order.orderSupplier?.link}</Typography>
              </Link>
            )}
          </div>
        }
      />
      <OrderParameter label={t(TranslationKey['Production time'])} value={order.orderSupplier?.productionTerm} />

      <Field
        oneLine
        label={t(TranslationKey.Dimensions)}
        containerClasses={styles.parameterTableCellWrapper}
        labelClasses={styles.fieldLabel}
        inputComponent={
          <div className={styles.sizesWrapper}>
            <CustomSwitcher
              condition={sizeSetting}
              switcherSettings={[
                { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
              ]}
              changeConditionHandler={condition => setSizeSetting(condition)}
            />

            <Typography className={styles.text}>{`
            ${
              order.product.width && order.product.height && order.product.length
                ? toFixed(order.product.width / lengthConversion, 2) +
                  ' x ' +
                  toFixed(order.product.height / lengthConversion, 2) +
                  ' x ' +
                  toFixed(order.product.length / lengthConversion, 2)
                : t(TranslationKey['No data'])
            }`}</Typography>
          </div>
        }
      />
      <OrderParameter
        label={t(TranslationKey.Weight)}
        value={`${toFixed(order.product.weight / weightConversion, 2)} ${weightSizesType}`}
      />
      <Field
        oneLine
        label={t(TranslationKey.BarCode)}
        containerClasses={styles.parameterTableCellWrapper}
        labelClasses={styles.fieldLabel}
        inputComponent={
          <>
            {isCanChange ? (
              <ChangeChipCell
                isChipOutTable
                text={!formFields.product.barCode && !formFields.tmpBarCode.length && t(TranslationKey['Set Barcode'])}
                value={
                  formFields.tmpBarCode?.[0]?.file?.name || formFields.tmpBarCode?.[0] || formFields.product.barCode
                }
                onClickChip={() => onClickBarcode()}
                onDeleteChip={() => onDeleteBarcode()}
              />
            ) : (
              <LabelWithCopy
                lableLinkTitleSize="medium"
                labelValue={order.product.barCode}
                lableLinkTitle={t(TranslationKey.View)}
              />
            )}
          </>
        }
      />

      <Field
        oneLine
        label={t(TranslationKey['Transparency codes'])}
        containerClasses={styles.parameterTableCellWrapper}
        labelClasses={styles.fieldLabel}
        inputComponent={
          <>
            <LabelWithCopy
              lableLinkTitleSize="medium"
              labelValue={order.transparencyFile}
              lableLinkTitle={t(TranslationKey.View)}
            />
          </>
        }
      />

      {collapsed && (
        <OrderParameter label={t(TranslationKey['Additional parameter'])} value={t(TranslationKey.Value)} />
      )}
    </div>
  )
}
