import { Drawer, Form, Space } from 'antd'
import { FC, memo, useMemo, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { FilterOptionsType } from '@models/infinite-scroll-model/infinite-scroll.model'

import { CategoriesModel } from '@components/contents/admin-settings-content/admin-tabs/categories/categories.model'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTreeSelect } from '@components/shared/custom-tree-select'

import { t } from '@utils/translations'

import { useStyles } from './cards-filter.style'

export interface FilterValues {
  priceMin: string
  priceMax: string
  categories: string[]
  moqMin: string
  moqMax: string
}

interface CardsFilterProps {
  showFilter: boolean
  filtersCount: number
  onSubmit: (values: FilterOptionsType) => void
  onReset: () => void
}

export const CardsFilter: FC<CardsFilterProps> = memo(props => {
  const { showFilter, filtersCount, onSubmit, onReset } = props

  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new CategoriesModel(), [])
  const [form] = Form.useForm()
  const [openFilter, setOpenFilter] = useState(false)
  const showDrawer = () => {
    setOpenFilter(true)
  }
  const onClose = () => {
    setOpenFilter(false)
  }
  const handleFinish = (values: FilterValues) => {
    const createFilterCondition = (key: string, operator: string, value: string | number) =>
      value ? { [key]: { [operator]: value } } : {}
    const filterOptions = {
      ...createFilterCondition('priceInUsd', '$gte', Number(values.priceMin)),
      ...createFilterCondition('priceInUsd', '$lte', Number(values.priceMax)),
      ...createFilterCondition('category', '$eq', values.categories?.join(',')),
      ...createFilterCondition('minlot', '$gte', Number(values.moqMin)),
      ...createFilterCondition('minlot', '$lte', Number(values.moqMax)),
    }
    onSubmit(filterOptions)
    onClose()
  }

  const handleReset = () => {
    onReset()
    form.resetFields()
  }

  return showFilter ? (
    <>
      <CustomButton
        color={filtersCount > 0 ? 'primary' : undefined}
        variant="outlined"
        size="large"
        icon={<FaArrowRight />}
        iconPosition="end"
        className={cx(styles.filterButton, { [styles.filterButtonActive]: filtersCount > 0 })}
        onClick={showDrawer}
      >
        {filtersCount > 0 ? <p className="filtersCount">{`(${filtersCount})`}</p> : null}
        <span>{t(TranslationKey.Filters)}</span>
      </CustomButton>

      <Drawer title={t(TranslationKey.Filters)} placement="left" open={openFilter} onClose={onClose}>
        <Form name="categories-form" size="large" form={form} rootClassName={styles.form} onFinish={handleFinish}>
          <Space.Compact rootClassName={styles.space}>
            <Form.Item<FilterValues> name="priceMin">
              <CustomInput fullWidth addonBefore={t(TranslationKey.min)} label="Price" />
            </Form.Item>
            <Form.Item<FilterValues> name="priceMax">
              <CustomInput fullWidth addonBefore={t(TranslationKey.max)} />
            </Form.Item>
          </Space.Compact>

          <Form.Item<FilterValues> name="categories">
            <CustomTreeSelect
              allowClear
              showSearch
              multiple
              treeDefaultExpandAll
              label="Categories"
              placeholder="Select category"
              popupClassName={styles.treeSelectPopup}
              className={styles.treeSelect}
              wrapperClassName={styles.treeSelectWrapper}
              treeData={viewModel.categoriesNodes}
            />
          </Form.Item>

          <Space.Compact rootClassName={styles.space}>
            <Form.Item<FilterValues> name="moqMin">
              <CustomInput fullWidth label="MOQ" addonBefore={t(TranslationKey.min)} />
            </Form.Item>
            <Form.Item<FilterValues> name="moqMax">
              <CustomInput fullWidth addonBefore={t(TranslationKey.max)} />
            </Form.Item>
          </Space.Compact>

          <Form.Item shouldUpdate>
            <div className={styles.buttons}>
              <CustomButton onClick={handleReset}>{t(TranslationKey.Reset)}</CustomButton>
              <CustomButton type="primary" htmlType="submit">
                {t(TranslationKey.Apply)}
              </CustomButton>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  ) : null
})
