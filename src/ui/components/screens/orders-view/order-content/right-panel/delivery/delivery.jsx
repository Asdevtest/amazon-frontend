/* eslint-disable no-unused-vars */
import React from 'react'

import {Typography, FormControlLabel, RadioGroup, Radio} from '@material-ui/core'
import clsx from 'clsx'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Input} from '@components/input'
import {LabelField} from '@components/label-field/label-field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './delivery.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderDelivery

export const Delivery = ({order, deliveryType, setDeliveryType, deliveryOptions}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Typography className={classNames.containerTitle}>{textConsts.mainTitle}</Typography>
      <div className={classNames.contentWrapper}>
        <div className={classNames.addressWrapper}>
          <Typography className={classNames.label}>{textConsts.deliveryAddress}</Typography>
          <Input disabled className={classNames.input} placeholder={textConsts.country} />
          <Input disabled className={classNames.input} placeholder={textConsts.city} />
          <Input disabled className={classNames.input} placeholder={textConsts.street} />
          <Input disabled className={classNames.input} placeholder={textConsts.house} />
        </div>

        <LabelField
          containerClasses={classNames.field}
          label={'Склад'}
          value={order.warehouse && warehouses[order.warehouse]}
        />

        <LabelField
          containerClasses={classNames.field}
          label={'Метод доставки'}
          value={order.deliveryMethod && getDeliveryOptionByCode(order.deliveryMethod).label}
        />
      </div>
    </div>
  )
}
