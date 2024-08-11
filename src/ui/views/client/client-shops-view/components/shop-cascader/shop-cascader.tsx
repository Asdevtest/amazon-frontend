import { Cascader, CascaderProps } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import Paragraph from 'antd/es/typography/Paragraph'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './shop-cascader.style'

interface ShopCascaderProps
  extends IDefaultPropsExtensionAntdComponent,
    CascaderProps<DefaultOptionType, 'value', true> {}

export const ShopCascader: FC<ShopCascaderProps> = memo(props => {
  const { required, isRow, isCell, label, labelClassName, wrapperClassName, options, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

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
        showSearch={{ filter }}
      />
    </div>
  )
})
