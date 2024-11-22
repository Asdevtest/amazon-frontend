/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, RadioChangeEvent } from 'antd'
import { Rule } from 'antd/es/form'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { Dimensions } from '@typings/enums/dimensions'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './box-info.style'

import { ICreateSupplierProductModal } from '../../add-supplier-product-modal.type'
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

  getRules: () => Rule[]
  onChangeUnitsOption: (option: RadioChangeEvent) => void
}

export const BoxInfo: FC<IBoxDimentionsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()
  const {
    volumeWeight,
    sizeSetting,
    dimentionsHeaderTitle,

    heightName,
    widthName,
    lengthName,
    weighGrossName,
    amountName,
    dimentionName,

    getRules,
    onChangeUnitsOption,
  } = props

  return (
    <div className={styles.boxInfoWrapper}>
      <Form.Item<ICreateSupplierProductModal> name={dimentionName} className={cx(sharedStyles.field)}>
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
        <Form.Item<ICreateSupplierProductModal>
          name={heightName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRules()}
        >
          <CustomInputNumber size="large" label="Height" precision={2} wrapperClassName={sharedStyles.input} />
        </Form.Item>

        <Form.Item<ICreateSupplierProductModal>
          name={widthName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRules()}
        >
          <CustomInputNumber size="large" label="Width" precision={2} wrapperClassName={sharedStyles.input} />
        </Form.Item>

        <Form.Item<ICreateSupplierProductModal>
          name={lengthName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRules()}
        >
          <CustomInputNumber size="large" label="Length" precision={2} wrapperClassName={sharedStyles.input} />
        </Form.Item>

        <Form.Item<ICreateSupplierProductModal>
          name={weighGrossName}
          className={cx(sharedStyles.field, styles.deliveryField)}
          rules={getRules()}
        >
          <CustomInputNumber size="large" label="Weight" precision={2} wrapperClassName={sharedStyles.input} />
        </Form.Item>

        <CustomInputNumber
          disabled
          value={volumeWeight}
          size="large"
          label="Volume weight"
          precision={2}
          wrapperClassName={sharedStyles.input}
        />

        {amountName ? (
          <Form.Item<ICreateSupplierProductModal>
            name={amountName}
            className={cx(sharedStyles.field, styles.deliveryField)}
          >
            <CustomInputNumber
              size="large"
              label="Number of units in box"
              precision={2}
              wrapperClassName={sharedStyles.input}
            />
          </Form.Item>
        ) : null}
      </div>
    </div>
  )
})
