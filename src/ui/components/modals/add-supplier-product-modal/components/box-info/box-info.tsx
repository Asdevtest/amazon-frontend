/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, RadioChangeEvent } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { Dimensions } from '@typings/enums/dimensions'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './box-info.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'
import { DimentionsHeader } from '../dimentions-header'

interface IBoxDimentionsProps {
  volumeWeight: number
  sizeSetting: Dimensions
  dimentionsHeaderTitle: keyof typeof TranslationKey

  heightName: any
  widthName: any
  lengthName: any
  weighGrossName: any
  amountName?: any
  dimentionName: any

  onChangeUnitsOption: (option: RadioChangeEvent) => void
}

export const BoxInfo: FC<IBoxDimentionsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()
  const {
    volumeWeight,
    sizeSetting,
    dimentionsHeaderTitle,
    onChangeUnitsOption,

    heightName,
    widthName,
    lengthName,
    weighGrossName,
    amountName,
    dimentionName,
  } = props

  return (
    <div className={styles.boxInfoWrapper}>
      <Form.Item<ICreateSupplierProduct> name={dimentionName} className={cx(sharedStyles.field)}>
        <DimentionsHeader
          data={{
            height: 0,
            width: 0,
            length: 0,
            weight: 0,
          }}
          sizeSetting={sizeSetting}
          dimentionsHeaderTitle={dimentionsHeaderTitle}
          onChangeUnitsOption={onChangeUnitsOption}
        />
      </Form.Item>

      <div className={styles.boxInfoInputsWrapper}>
        <Form.Item<ICreateSupplierProduct>
          name={heightName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Height"
            placeholder="Height"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name={widthName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Width"
            placeholder="Width"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name={lengthName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Length"
            placeholder="Length"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct>
          name={weighGrossName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRequiredRules()}
        >
          <CustomInputNumber
            required
            size="large"
            label="Weight"
            placeholder="Weight"
            precision={2}
            wrapperClassName={sharedStyles.input}
          />
        </Form.Item>

        <CustomInputNumber
          disabled
          value={volumeWeight}
          size="large"
          label="Volume weight"
          placeholder="Volume weight"
          precision={2}
          wrapperClassName={sharedStyles.input}
        />

        {amountName ? (
          <Form.Item<ICreateSupplierProduct> name={amountName} className={cx(sharedStyles.field, styles.deliveryField)}>
            <CustomInputNumber
              size="large"
              label="Number of units in box"
              placeholder="Number of units in box"
              precision={2}
              wrapperClassName={sharedStyles.input}
            />
          </Form.Item>
        ) : null}
      </div>
    </div>
  )
})
