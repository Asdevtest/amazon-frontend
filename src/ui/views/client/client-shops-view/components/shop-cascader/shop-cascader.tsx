import { Cascader, Divider, Space } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { observer } from 'mobx-react'
import { FC, ReactElement, useCallback, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'
import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './shop-cascader.style'

import { ShopsCascaderModel } from './shop-cascader.model'

interface ShopCascaderProps extends IDefaultPropsExtensionAntdComponent {
  data: IShop[]
}

export const ShopCascader: FC<ShopCascaderProps> = observer(props => {
  const { required, isRow, isCell, label, labelClassName, wrapperClassName, data } = props

  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ShopsCascaderModel(data))

  const dropdownRender = useCallback(
    (menu: ReactElement) => (
      <>
        {menu}
        <Divider className={styles.divider} />

        <Cascader.Panel
          multiple
          options={viewModel.shopOptions}
          className={styles.cascaderPanel}
          value={viewModel.selectedShopsOptions}
          // @ts-ignore
          onChange={viewModel.onChangeShopsOptions}
        />

        <Divider className={styles.divider} />

        <Space className={styles.footer}>
          <CustomInputSearch
            allowClear
            placeholder="Search"
            wrapperClassName={styles.inputSearch}
            onChange={viewModel.onChangeInput}
          />
          <CustomButton disabled={viewModel.disabledExportButton} type="primary" onClick={viewModel.getShopsExport}>
            {t(TranslationKey.Export)}
          </CustomButton>
        </Space>
      </>
    ),
    [viewModel.inputValue, viewModel.selectedShopsOptions],
  )

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>*</span> : null}
        </p>
      ) : null}

      <Cascader
        multiple
        expandIcon=" " // null icon
        open={viewModel.open}
        options={viewModel.tableOptions}
        rootClassName={styles.cascader}
        expandTrigger="hover"
        optionRender={option => (
          <div className={styles.option}>
            <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
              {option.label}
            </Paragraph>
          </div>
        )}
        dropdownRender={dropdownRender}
        onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
        // @ts-ignore
        onChange={viewModel.onChangeTableOptions}
      >
        <CustomButton type="primary" size="large">
          {t(TranslationKey.Export)}
        </CustomButton>
      </Cascader>
    </div>
  )
})
