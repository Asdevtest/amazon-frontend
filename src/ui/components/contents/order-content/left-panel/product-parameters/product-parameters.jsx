import clsx from 'clsx'
import React, { useState } from 'react'

import { Chip, Link, Typography } from '@mui/material'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'

import { calcMaxDeliveryForProduct } from '@utils/calculation'
import { checkAndMakeAbsoluteUrl, toFixed, trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './product-parameters.style'

export const ProductParameters = ({
  order,
  collapsed,
  formFields,
  onChangeField,
  isCanChange,
  onClickBarcode,
  onDeleteBarcode,
}) => {
  const { classes: classNames } = useClassNames()

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const weightSizesType = getWeightSizesType(sizeSetting)
  const maxDelivery = calcMaxDeliveryForProduct(order?.product)

  const OrderParameter = ({ label, value }) => (
    <Field
      oneLine
      label={label}
      containerClasses={classNames.parameterTableCellWrapper}
      labelClasses={classNames.fieldLabel}
      inputComponent={<Typography className={classNames.text}>{value}</Typography>}
    />
  )

  return (
    <div className={classNames.container}>
      <Field
        oneLine
        disabled={!isCanChange}
        inputProps={{ maxLength: 8 }}
        label={t(TranslationKey['Quantity (pcs.)'])}
        inputClasses={classNames.amountInput}
        classes={{ input: classNames.amountInput }}
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        value={formFields.amount}
        onChange={onChangeField('amount')}
      />
      {/* // было */}
      {/* <OrderParameter label={t(TranslationKey['Purchase price'])} value={toFixed(order.orderSupplier?.price, 2)} /> */}
      <OrderParameter
        label={t(TranslationKey['Purchase price'])}
        value={toFixed(order?.totalPrice / order?.amount, 2)}
      />

      <Field
        oneLine
        label={t(TranslationKey.Supplier)}
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <div>
            {order.orderSupplier?.link === 'access denied' ? (
              <Typography className={classNames.scrollingText}>{order.orderSupplier?.link}</Typography>
            ) : (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.orderSupplier?.link)}>
                <Typography className={classNames.scrollingText}>{order.orderSupplier?.link}</Typography>
              </Link>
            )}
          </div>
        }
      />
      <OrderParameter label={t(TranslationKey['Production time'])} value={order.orderSupplier?.productionTerm} />
      <OrderParameter
        label={t(TranslationKey['Maximum delivery price per unit'])}
        value={toFixed(maxDelivery, 2)}
        // value={toFixed(order.orderSupplier?.batchDeliveryCostInDollar / order.orderSupplier?.amount, 2)}
      />
      <Field
        oneLine
        label={t(TranslationKey.Dimensions)}
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <div className={classNames.sizesWrapper}>
            <CustomSwitcher
              condition={sizeSetting}
              nameFirstArg={unitsOfChangeOptions.EU}
              nameSecondArg={unitsOfChangeOptions.US}
              firstArgValue={unitsOfChangeOptions.EU}
              secondArgValue={unitsOfChangeOptions.US}
              changeConditionHandler={condition => setSizeSetting(condition)}
            />

            <Typography className={classNames.text}>{`
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
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <>
            {isCanChange ? (
              <Chip
                classes={{
                  root: classNames.barcodeChip,
                  clickable: classNames.barcodeChipHover,
                  deletable: classNames.barcodeChipHover,
                  deleteIcon: classNames.barcodeChipIcon,
                }}
                className={clsx({ [classNames.barcodeChipExists]: formFields.product.barCode })}
                size="small"
                label={
                  formFields.tmpBarCode.length
                    ? t(TranslationKey['File added'])
                    : formFields.product.barCode
                    ? trimBarcode(formFields.product.barCode)
                    : t(TranslationKey['Set Barcode'])
                }
                onClick={() => onClickBarcode()}
                onDelete={!formFields.product.barCode ? undefined : () => onDeleteBarcode()}
              />
            ) : (
              <div>
                {order.product.barCode ? (
                  <div className={classNames.barCodeWrapper}>
                    <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.product.barCode)}>
                      <Typography className={classNames.scrollingText}>{t(TranslationKey.View)}</Typography>
                    </Link>
                    <CopyValue text={order.product.barCode} />
                  </div>
                ) : (
                  <Typography className={classNames.standartText}>{t(TranslationKey['Not available'])}</Typography>
                )}
              </div>
            )}
          </>
        }
      />
      {collapsed && (
        <OrderParameter label={t(TranslationKey['Additional parameter'])} value={t(TranslationKey.Value)} />
      )}
    </div>
  )
}
