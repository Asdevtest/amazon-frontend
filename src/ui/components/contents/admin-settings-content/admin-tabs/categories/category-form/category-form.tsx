import { Form } from 'antd'
import { FC, memo, useEffect } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTreeSelect } from '@components/shared/custom-tree-select'

import { t } from '@utils/translations'

import { useStyles } from './category-form.style'

import { generateFieldRules } from '../../countries/countries.config'
import { CategoryTreeNode, CategoryValues } from '../categories.config'

interface CategoryFormProps {
  categories: CategoryTreeNode[]
  onSubmit: (values: CategoryValues) => void
  category?: CategoryValues
}

export const CategoryForm: FC<CategoryFormProps> = memo(props => {
  const { categories, onSubmit, category } = props

  const { classes: styles } = useStyles()
  const [form] = Form.useForm()

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        id: category?.id || undefined,
        title: category?.title || undefined,
        parentId: category?.parentId || null,
      })
    }
  }, [])

  const handleFinish = (values: CategoryValues) => {
    onSubmit(values)
    form.resetFields()
  }

  const title = category ? 'Editing a category' : 'Adding a category'

  return (
    <Form name="categories-form" size="large" form={form} rootClassName={styles.form} onFinish={handleFinish}>
      <p className={styles.title}>{t(TranslationKey[title])}</p>
      <Form.Item hidden name="id">
        <CustomInput />
      </Form.Item>
      <Form.Item<CategoryValues>
        name="title"
        validateTrigger="onBlur"
        rules={generateFieldRules('Category name is required')}
      >
        <CustomInput allowClear required label="Category name" placeholder="Enter category name" />
      </Form.Item>

      <Form.Item<CategoryValues> name="parentId">
        <CustomTreeSelect
          allowClear
          showSearch
          label="Parent category"
          placeholder="Select parent category"
          popupClassName={styles.treeSelect}
          className={styles.treeSelect}
          treeData={categories}
        />
      </Form.Item>

      <Form.Item shouldUpdate>
        <div className={styles.buttons}>
          <CustomButton type="primary" htmlType="submit">
            {t(TranslationKey.Save)}
          </CustomButton>
        </div>
      </Form.Item>
    </Form>
  )
})