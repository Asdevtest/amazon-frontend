import { Form, FormInstance } from 'antd'
import { FC, memo, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomSelect } from '@components/shared/custom-select'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './price-variations.style'

import { ICreateSupplierPrice, ICreateSupplierProductModal, SupplierCurrency } from '../../add-supplier-card-modal.type'
import { getConvertedPriceVariations } from '../../helpers/get-converted-price-variations'

interface IPriceVariationsProps {
  form: FormInstance<ICreateSupplierProductModal>
  onAddPriceVariations: (priceVariation: ICreateSupplierPrice) => void
}

export const PriceVariations: FC<IPriceVariationsProps> = memo(({ form, onAddPriceVariations }) => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const [priceVariation, setPriceVariation] = useState<ICreateSupplierPrice>({
    quantity: 0,
    price: 0,
  })

  const isDoubledPriceVariation = useMemo(() => {
    const priceVariations = form.getFieldValue('priceVariations') as ICreateSupplierPrice[]

    return priceVariations?.some(
      variation => variation.quantity === priceVariation?.quantity && variation.price === priceVariation?.price,
    )
  }, [priceVariation])

  const onChangeAmount = (value: number) => {
    setPriceVariation({ ...priceVariation, quantity: value })
  }

  const onChangePrice = (value: number) => {
    setPriceVariation({ ...priceVariation, price: value })
  }

  const onAddPriceVariation = () => {
    onAddPriceVariations(priceVariation)
    setPriceVariation({ quantity: 0, price: 0 })
  }

  return (
    <div className={sharedStyles.sectionWrapper}>
      <Form.Item<ICreateSupplierProductModal>
        name="priceVariations"
        className={sharedStyles.field}
        getValueFromEvent={(...args) => getConvertedPriceVariations(args?.[0])}
      >
        <CustomSelect
          allowClear
          showSearch={false}
          mode="tags"
          wrapperClassName={sharedStyles.input}
          label="Price variations"
          options={[]}
          popupMatchSelectWidth={350}
          dropdownRender={() => (
            <div className={styles.addPriceVariations}>
              <CustomInputNumber
                size="middle"
                label="Quantity"
                placeholder="Quantity"
                wrapperClassName={sharedStyles.input}
                value={priceVariation.quantity}
                onChange={value => onChangeAmount(value as number)}
              />

              <CustomInputNumber
                size="middle"
                label="Cost"
                placeholder="Cost"
                precision={2}
                wrapperClassName={sharedStyles.input}
                addonAfter={SupplierCurrency.CNY}
                value={priceVariation.price}
                onChange={value => onChangePrice(value as number)}
              />

              <CustomButton
                size="middle"
                shape="circle"
                icon={<FaPlus size={16} />}
                disabled={!priceVariation.quantity || !priceVariation.price || isDoubledPriceVariation}
                onClick={onAddPriceVariation}
              />
            </div>
          )}
        />
      </Form.Item>
    </div>
  )
})
