import React from 'react'

import {Typography, FormControlLabel, RadioGroup, Radio} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './delivery.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderDelivery

export const Delivery = ({deliveryType, setDeliveryType, deliveryTypes}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Typography className={classNames.containerTitle}>{textConsts.mainTitle}</Typography>
      <div className={classNames.contentWrapper}>
        <div className={classNames.addressWrapper}>
          <Typography className={classNames.label}>{textConsts.deliveryAddress}</Typography>
          <Input className={classNames.input} placeholder={textConsts.country} />
          <Input className={classNames.input} placeholder={textConsts.city} />
          <Input className={classNames.input} placeholder={textConsts.street} />
          <Input className={classNames.input} placeholder={textConsts.house} />
        </div>

        <div className={classNames.deliveryWrapper}>
          <Typography className={(classNames.label, classNames.deliveryTypo)}>{textConsts.deliveryMethod}</Typography>
          <RadioGroup
            aria-label="delivery-type"
            name="delivery-type"
            value={deliveryType}
            className={classNames.radioGroup}
            onChange={e => setDeliveryType(e.target.value)}
          >
            {deliveryTypes.map((item, index) => (
              <FormControlLabel
                key={index}
                className={clsx(classNames.text, classNames.radio)}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
