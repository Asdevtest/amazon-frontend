import {Typography, Link, Chip} from '@mui/material'

import React, {useState} from 'react'

import clsx from 'clsx'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {CopyValue} from '@components/copy-value'
import {Field} from '@components/field'
import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {toFixed, checkAndMakeAbsoluteUrl, trimBarcode} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './product-parameters.style'

export const ProductParameters = ({
  order,
  collapsed,
  formFields,
  onChangeField,
  isCanChange,
  onClickBarcode,
  onDeleteBarcode,
}) => {
  const {classes: classNames} = useClassNames()

  const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

  const handleChange = (event, newAlignment) => {
    setSizeSetting(newAlignment)
  }

  const OrderParameter = ({label, value}) => (
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
        inputProps={{maxLength: 8}}
        label={t(TranslationKey['Quantity (pcs.)'])}
        inputClasses={classNames.amountInput}
        classes={{input: classNames.amountInput}}
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
        value={toFixed(order.orderSupplier.batchDeliveryCostInDollar / order.orderSupplier.amount, 2)}
      />
      <Field
        oneLine
        label={t(TranslationKey.Dimensions)}
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <div className={classNames.sizesWrapper}>
            <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
              <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                {'In'}
              </ToggleBtn>
              <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                {'Cm'}
              </ToggleBtn>
            </ToggleBtnGroup>

            <Typography className={classNames.text}>{`
            ${
              order.product.width && order.product.height && order.product.length
                ? toFixed(order.product.width / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2) +
                  ' x ' +
                  toFixed(order.product.height / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2) +
                  ' x ' +
                  toFixed(order.product.length / (sizeSetting === sizesType.INCHES ? inchesCoefficient : 1), 2)
                : 'Нет данных'
            }`}</Typography>
          </div>
        }
      />
      <OrderParameter label={t(TranslationKey['Weight, kg'])} value={toFixed(order.product.weight, 2)} />
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
                className={clsx({[classNames.barcodeChipExists]: formFields.product.barCode})}
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
