import { Cascader, CascaderProps, Divider, Space } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import Paragraph from 'antd/es/typography/Paragraph'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'
import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './shop-cascader.style'

import { ShopsCascaderModel } from './shop-cascader.model'

interface ShopCascaderProps
  extends IDefaultPropsExtensionAntdComponent,
    CascaderProps<DefaultOptionType, 'value', true> {
  data: IShop[]
}

export const ShopCascader: FC<ShopCascaderProps> = observer(props => {
  const { required, isRow, isCell, label, labelClassName, wrapperClassName, data, ...restProps } = props

  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ShopsCascaderModel(data))

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>*</span> : null}
        </p>
      ) : null}

      <Cascader
        {...restProps}
        multiple
        open={viewModel.open}
        suffixIcon={null}
        options={viewModel.exportOptions}
        rootClassName={styles.cascader}
        expandTrigger="hover"
        optionRender={option => (
          <div className={styles.option}>
            <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
              {option.label}
            </Paragraph>
          </div>
        )}
        dropdownMenuColumnStyle={{ height: 40 }}
        dropdownRender={menu => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '8px 16px 16px' }}>
              <CustomButton type="primary" onClick={viewModel.getShopsExport}>
                {t(TranslationKey.Export)}
              </CustomButton>
              <CustomButton onClick={viewModel.onClose}>{t(TranslationKey.Cancel)}</CustomButton>
            </Space>
          </>
        )}
        onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      />
    </div>
  )
})
