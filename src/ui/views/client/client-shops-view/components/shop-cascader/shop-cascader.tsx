import { Cascader, CascaderProps, Divider, Space } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import Paragraph from 'antd/es/typography/Paragraph'
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './shop-cascader.style'

interface ShopCascaderProps
  extends IDefaultPropsExtensionAntdComponent,
    CascaderProps<DefaultOptionType, 'value', true> {}

export const ShopCascader: FC<ShopCascaderProps> = memo(props => {
  const { required, isRow, isCell, label, labelClassName, wrapperClassName, options, ...restProps } = props

  const { classes: styles, cx } = useStyles()
  const [open, setOpen] = useState(false)

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
  }

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
        open={false}
        size="large"
        suffixIcon={null}
        options={options}
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
              <CustomButton type="primary">{t(TranslationKey.Export)}</CustomButton>
              <CustomButton>{t(TranslationKey.Cancel)}</CustomButton>
            </Space>
          </>
        )}
      />
    </div>
  )
})