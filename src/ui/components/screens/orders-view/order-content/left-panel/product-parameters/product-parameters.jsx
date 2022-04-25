import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import React, {useState} from 'react'

import {Typography, Link} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed, checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './product-parameters.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderParameters

const sizesType = {
  INCHES: 'INCHES',
  CM: 'CM',
}

const inchesCoefficient = 2.54

export const ProductParameters = ({order, collapsed}) => {
  const classNames = useClassNames()

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
    <div>
      <OrderParameter label={textConsts.minPrice} value={toFixed(order.product.minpurchase, 2)} />
      <OrderParameter label={textConsts.qty} value={order.amount} />
      <OrderParameter label={textConsts.minBuyPrice} value={toFixed(order.product.currentSupplier.price, 2)} />

      <Field
        oneLine
        label={textConsts.supplier}
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <div>
            {order.product.currentSupplier.link === 'access denied' ? (
              <Typography className={classNames.scrollingText}>{order.product.currentSupplier.link}</Typography>
            ) : (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.product.currentSupplier.link)}>
                <Typography className={classNames.scrollingText}>{order.product.currentSupplier.link}</Typography>
              </Link>
            )}
          </div>
        }
      />

      <OrderParameter label={textConsts.maxDeliveryPrice} value={toFixed(order.product.currentSupplier.delivery)} />

      <Field
        oneLine
        label={textConsts.sizes}
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <div className={classNames.sizesWrapper}>
            <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
              <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                {'In'}
              </ToggleButton>
              <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                {'Cm'}
              </ToggleButton>
            </ToggleButtonGroup>

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

      <OrderParameter label={textConsts.weight} value={toFixed(order.product.weight, 2)} />

      <Field
        oneLine
        label={'Баркод'}
        containerClasses={classNames.parameterTableCellWrapper}
        labelClasses={classNames.fieldLabel}
        inputComponent={
          <div>
            {order.product.barCode ? (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.product.barCode)}>
                <Typography className={classNames.scrollingText}>{order.product.barCode}</Typography>
              </Link>
            ) : (
              <Typography className={classNames.scrollingText}>{'N/A'}</Typography>
            )}
          </div>
        }
      />

      {collapsed && <OrderParameter label={textConsts.extraParam} value={textConsts.extraParamValue} />}
    </div>
  )
}
