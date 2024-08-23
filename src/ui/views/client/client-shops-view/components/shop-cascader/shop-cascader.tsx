import { Cascader, Divider } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { observer } from 'mobx-react'
import { FC, ReactElement, useCallback, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { TextCell } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'

import { useStyles } from './shop-cascader.style'

import { ShopsCascaderModel } from './shop-cascader.model'

interface ShopCascaderProps {
  shops: IShop[]
}

export const ShopCascader: FC<ShopCascaderProps> = observer(({ shops }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ShopsCascaderModel(shops))

  const dropdownRender = useCallback(
    (menu: ReactElement) => (
      <>
        <div className={styles.header}>
          <CustomInputSearch
            allowClear
            placeholder="Shop"
            wrapperClassName={styles.inputSearch}
            onChange={viewModel.onChangeInput}
          />
        </div>

        <TextCell
          type="secondary"
          isCell={false}
          copyable={false}
          rows={1}
          text={`${t(TranslationKey.Shops)}*`}
          className={styles.title}
        />
        <Cascader.Panel
          multiple
          options={viewModel.shopOptions}
          className={styles.cascaderPanel}
          value={viewModel.selectedShopsOptions}
          // @ts-ignore
          onChange={viewModel.onChangeShopsOptions}
        />

        <Divider className={styles.divider} />

        <TextCell
          type="secondary"
          isCell={false}
          copyable={false}
          rows={1}
          text={`${t(TranslationKey.Tables)}*`}
          className={styles.title}
        />

        {menu}

        <div className={styles.footer}>
          <CustomButton disabled={viewModel.disabledExportButton} type="primary" onClick={viewModel.getShopsExport}>
            {t(TranslationKey.Export)}
          </CustomButton>
        </div>
      </>
    ),
    [viewModel.inputValue, viewModel.selectedShopsOptions],
  )

  return (
    <Cascader
      multiple
      // expandIcon=" " // null icon
      open={viewModel.open}
      value={viewModel.selectedTableOptions}
      options={viewModel.tableOptions}
      rootClassName={styles.cascader}
      expandTrigger="hover"
      optionRender={option => (
        <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
          {option.label}
        </Paragraph>
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
  )
})
