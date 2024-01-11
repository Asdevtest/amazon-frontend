import { FC, memo, useState } from 'react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Card } from '@components/modals/my-order-modal/components/card'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { LabelWithCopy } from '@components/shared/label-with-copy'

import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './supplier-info.style'

import { IFieldConfig } from '../../basic-info-tab.type'

interface SupplierInfoProps {
  order: IOrderWithAdditionalFields
}

export const SupplierInfo: FC<SupplierInfoProps> = memo(({ order }) => {
  const { classes: styles, cx } = useStyles()

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const weightSizesType = getWeightSizesType(sizeSetting)

  const supplierInfoFieldsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey['Purchase price']),
      text:
        order?.totalPrice && order?.amount
          ? `$ ${toFixed(order?.totalPrice / order?.amount, 2)}`
          : t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.Supplier),
      text: undefined,
      element: (
        <a
          target="_blank"
          rel="noreferrer"
          href={checkAndMakeAbsoluteUrl(order?.orderSupplier?.link)}
          className={cx(styles.fieldText, { [styles.link]: order?.orderSupplier?.link !== 'access denied' })}
          onClick={e => {
            if (order?.orderSupplier?.link === 'access denied') {
              e.preventDefault()
            }
          }}
        >
          {order?.orderSupplier?.name}
        </a>
      ),
    },
    {
      title: t(TranslationKey['Production time']),
      text: String(order?.orderSupplier?.productionTerm) || t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.BarCode),
      text: undefined,
      element: <LabelWithCopy labelValue={order?.product.barCode} lableLinkTitle={t(TranslationKey.View)} />,
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
        order?.product.width && order?.product.height && order?.product.length
          ? `${
              toFixed(order?.product.width / lengthConversion, 2) +
              ' x ' +
              toFixed(order?.product.height / lengthConversion, 2) +
              ' x ' +
              toFixed(order?.product.length / lengthConversion, 2)
            }`
          : t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.Weight),
      text: order?.product.weight
        ? `${toFixed(order?.product.weight / weightConversion, 2)} ${weightSizesType}`
        : t(TranslationKey['No data']),
      element: undefined,
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoBlock}>
        <p className={styles.title}>{t(TranslationKey['Supplier information'])}</p>

        <Card wrapperClassName={styles.card}>
          {supplierInfoFieldsConfig.map((item, index) => (
            <div key={index} className={styles.field}>
              <p className={styles.fieldText}>{item.title}</p>
              {item.element}
              {item.text && <p className={styles.fieldText}>{item.text}</p>}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
})
