import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop.js'

import { useStyles } from './shop-form.style'

import { getRequiredLinkRules, getRequiredRules } from './shop-form.config'
import { ShopFormModel } from './shop-form.model'
import { FieldType } from './shop-form.types'

export interface ShopFormProps {
  onClose: () => void
  shop?: IShop
  onUpdateData?: () => void
}

export const ShopForm: FC<ShopFormProps> = observer(props => {
  const { onClose, shop, onUpdateData } = props

  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ShopFormModel())
  const [form] = Form.useForm()

  const isEditMode = !!shop

  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue({
        name: shop?.name || '',
        sellerBoardWarehouseReportUrlDaily: shop?.sellerBoardWarehouseReportUrlDaily || '',
        sellerBoardWarehouseReportUrlMonthly: shop?.sellerBoardWarehouseReportUrlMonthly || '',
        reportAccountUrl: shop?.reportAccountUrl || '',
      })
    }
  }, [])

  const onFinish = async (values: FieldType) => {
    isEditMode ? await viewModel.onEditShop(shop?._id, values) : await viewModel.onCreateShop(values)
    form.resetFields()
    onClose?.()
    onUpdateData?.()
  }

  const title = (isEditMode ? 'Edit' : 'Add') + ' shop'

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey[title as TranslationKey])}</p>

      <Form name="parsing profile" autoComplete="off" form={form} onFinish={onFinish}>
        <div className={styles.container}>
          <Form.Item<FieldType> name="name" className={styles.field} rules={getRequiredRules()}>
            <CustomInput required allowClear size="large" label="Name" placeholder="Store name" />
          </Form.Item>

          <Form.Item<FieldType>
            name="sellerBoardWarehouseReportUrlDaily"
            className={styles.field}
            rules={getRequiredLinkRules()}
          >
            <CustomInput required allowClear size="large" label="Warehouse report" placeholder="Link" />
          </Form.Item>

          <Form.Item<FieldType>
            name="sellerBoardWarehouseReportUrlMonthly"
            className={styles.field}
            rules={getRequiredLinkRules()}
          >
            <CustomInput required allowClear size="large" label="Dashboard by goods/days" placeholder="Link" />
          </Form.Item>

          <Form.Item<FieldType> name="reportAccountUrl" className={styles.field}>
            <CustomInput allowClear size="large" label="Account report" placeholder="Link" />
          </Form.Item>
        </div>

        <div className={styles.buttons}>
          <Form.Item shouldUpdate className={styles.field}>
            <CustomButton loading={viewModel.loading} size="large" type="primary" htmlType="submit">
              {t(TranslationKey.Save)}
            </CustomButton>
          </Form.Item>

          <CustomButton size="large" onClick={onClose}>
            {t(TranslationKey.Close)}
          </CustomButton>
        </div>
      </Form>
    </div>
  )
})
