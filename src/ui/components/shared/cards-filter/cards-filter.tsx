import { Drawer, Form, Space } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo, useState } from 'react'
import { TbFilter, TbFilterCheck } from 'react-icons/tb'

import { TranslationKey } from '@constants/translations/translation-key'

import { CategoriesModel } from '@components/contents/admin-settings-content/admin-tabs/categories/categories.model'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTreeSelect } from '@components/shared/custom-tree-select'

import { t } from '@utils/translations'

import { useStyles } from './cards-filter.style'

import { createFilterCondition, getFilterOptions, maxValueRules, minValueRules } from './cards-filter.config'
import { CardsFilterProps, FilterValues } from './cards-filter.type'

export const CardsFilter: FC<CardsFilterProps> = observer(props => {
  const { showFilter, filtersCount, onSubmit, onReset, loading, onlyExchangeCategories } = props

  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new CategoriesModel(onlyExchangeCategories), [])
  const [form] = Form.useForm()
  const [openFilter, setOpenFilter] = useState(false)
  const showDrawer = () => {
    setOpenFilter(true)
  }
  const onClose = () => {
    setOpenFilter(false)
  }
  const handleFinish = (values: FilterValues) => {
    const filterOptionsArray = [
      createFilterCondition('cardName', '$contains', values.cardName?.trim()),
      createFilterCondition('priceInUsd', '$gte', Number(values.priceInUsdMin)),
      createFilterCondition('priceInUsd', '$lte', Number(values.priceInUsdMax)),
      createFilterCondition('category', '$eq', values.category?.join(',')),
      createFilterCondition('minlot', '$gte', Number(values.minlotMin)),
      createFilterCondition('minlot', '$lte', Number(values.minlotMax)),
    ]
    const filterOptions = getFilterOptions(filterOptionsArray)

    onSubmit(filterOptions)
    onClose()
  }

  const handleReset = () => {
    form.resetFields()
    onReset()
    onClose()
  }

  return showFilter ? (
    <>
      <CustomButton
        color={filtersCount > 0 ? 'primary' : undefined}
        variant="outlined"
        size="large"
        icon={filtersCount > 0 ? <TbFilterCheck size={18} /> : <TbFilter size={18} />}
        iconPosition="end"
        className={cx(styles.filterButton, { [styles.filterButtonActive]: filtersCount > 0 })}
        onClick={showDrawer}
      >
        {filtersCount > 0 ? <p className="filtersCount">{`(${filtersCount})`}</p> : null}
        <span>{t(TranslationKey.Filters)}</span>
      </CustomButton>

      <Drawer title={t(TranslationKey.Filters)} placement="left" open={openFilter} onClose={onClose}>
        <Form name="categories-form" size="large" form={form} rootClassName={styles.form} onFinish={handleFinish}>
          <Form.Item<FilterValues> name="cardName">
            <CustomInput fullWidth label="Product name" />
          </Form.Item>

          <Space.Compact rootClassName={styles.space}>
            <Form.Item<FilterValues> name="priceInUsdMin" rules={minValueRules()}>
              <CustomInput fullWidth addonBefore={t(TranslationKey.min)} label="Price" />
            </Form.Item>
            <Form.Item<FilterValues> name="priceInUsdMax" rules={maxValueRules('priceInUsdMin')}>
              <CustomInput fullWidth addonBefore={t(TranslationKey.max)} />
            </Form.Item>
          </Space.Compact>

          <Form.Item<FilterValues> name="category">
            <CustomTreeSelect
              allowClear
              showSearch
              multiple
              treeDefaultExpandAll
              loading={viewModel.loading}
              label="Categories"
              placeholder="Select category"
              popupClassName={styles.treeSelectPopup}
              className={styles.treeSelect}
              wrapperClassName={styles.treeSelectWrapper}
              treeData={viewModel.categoriesNodes}
              onDropdownVisibleChange={isOpen => viewModel.onDropdownVisibleChange(isOpen, onlyExchangeCategories)}
            />
          </Form.Item>

          <Space.Compact rootClassName={styles.space}>
            <Form.Item<FilterValues> name="minlotMin" rules={minValueRules()}>
              <CustomInput fullWidth label="MOQ" addonBefore={t(TranslationKey.min)} />
            </Form.Item>
            <Form.Item<FilterValues> name="minlotMax" rules={maxValueRules('minlotMin')}>
              <CustomInput fullWidth addonBefore={t(TranslationKey.max)} />
            </Form.Item>
          </Space.Compact>

          <Form.Item shouldUpdate>
            <div className={styles.buttons}>
              <CustomButton loading={loading} onClick={handleReset}>
                {t(TranslationKey.Reset)}
              </CustomButton>
              <CustomButton loading={loading} type="primary" htmlType="submit">
                {t(TranslationKey.Apply)}
              </CustomButton>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  ) : null
})
