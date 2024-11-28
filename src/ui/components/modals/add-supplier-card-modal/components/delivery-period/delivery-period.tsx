import { Form, Space } from 'antd'
import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInputNumber } from '@components/shared/custom-input-number'

import { t } from '@utils/translations'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './delivery-period.style'

import { ICreateSupplierProductModal } from '../../add-supplier-card-modal.type'
import { getMaxProductionTermRules } from '../../rules/get-max-production-term-rules'
import { getMinProductionRermRules } from '../../rules/get-min-production-term-rules'

export const DeliveryPeriod = memo(() => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.deliveryPeriodWrapper}>
      <Space.Compact rootClassName={styles.deliveryPeriodInputsWrapper}>
        <Form.Item<ICreateSupplierProductModal>
          name="minProductionTerm"
          className={sharedStyles.field}
          rules={getMinProductionRermRules()}
        >
          <CustomInputNumber
            size="large"
            label="Production term"
            wrapperClassName={sharedStyles.input}
            addonBefore={t(TranslationKey.min)}
          />
        </Form.Item>

        <Form.Item<ICreateSupplierProductModal>
          name="maxProductionTerm"
          className={sharedStyles.field}
          rules={getMaxProductionTermRules()}
        >
          <CustomInputNumber size="large" wrapperClassName={sharedStyles.input} addonBefore={t(TranslationKey.max)} />
        </Form.Item>
      </Space.Compact>

      <Form.Item<ICreateSupplierProductModal> name="amount" className={sharedStyles.field} rules={getRequiredRules()}>
        <CustomInputNumber
          required
          size="large"
          precision={0}
          label="Purchase quantity for the current price"
          wrapperClassName={sharedStyles.input}
        />
      </Form.Item>

      <Form.Item<ICreateSupplierProductModal> name="minlot" className={sharedStyles.field} rules={getRequiredRules()}>
        <CustomInputNumber
          required
          size="large"
          label="Minimum batch"
          precision={0}
          wrapperClassName={sharedStyles.input}
        />
      </Form.Item>
    </div>
  )
})
