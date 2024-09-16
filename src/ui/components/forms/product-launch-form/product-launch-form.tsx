import { Radio } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOption } from '@components/modals/report-modal/components/header/asin-option'
import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { ChildProductLaunchIcon, ParentProductLaunchIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './product-launch-form.style'

import { RadioValue } from './product-launch-form.config'
import { ProductLaunchFormModel } from './product-launch-form.model'

interface ProductLaunchFormProps {
  onClose: () => void
  onSubmit: (product?: IProduct) => void
  selectedProduct?: IProduct
}

export const ProductLaunchForm: FC<ProductLaunchFormProps> = observer(props => {
  const { onClose, onSubmit, selectedProduct } = props

  const viewModel = useMemo(() => new ProductLaunchFormModel(selectedProduct), [])
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Product launch'])}</p>

      <Radio.Group value={viewModel.radioValue} className={styles.radioGroup} onChange={viewModel.onChangeRadioValue}>
        <div className={styles.radioOptionContainer}>
          <Radio value={RadioValue.NEW}>{t(TranslationKey['New product'])}</Radio>
          <div className={cx(styles.iconContainer, styles.iconCreate)}>
            <ParentProductLaunchIcon />
          </div>
        </div>

        <div className={styles.radioOptionContainer}>
          <Radio value={RadioValue.VARIATION}>{t(TranslationKey.Variation)}</Radio>
          <div className={cx(styles.iconContainer, styles.iconSelect)}>
            <ChildProductLaunchIcon />
          </div>
          <CustomSelect
            showSearch
            filterOption={false}
            disabled={!viewModel.radioValue}
            defaultActiveFirstOption={false}
            placeholder="Parent product"
            options={viewModel.asinOptions}
            value={viewModel.selectedProduct}
            optionRender={({ data }) => <AsinOption data={data} />}
            onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
            onSearch={viewModel.onClickSubmitSearch}
            onPopupScroll={viewModel.onPopupScroll}
            onChange={viewModel.onChangeProduct}
          />
        </div>
      </Radio.Group>

      <div className={styles.buttons}>
        <CustomButton
          type="primary"
          size="large"
          disabled={viewModel.disabledSubmit}
          onClick={() => onSubmit(viewModel.selectedProduct)}
        >
          {t(TranslationKey.Next)}
        </CustomButton>

        <CustomButton size="large" onClick={onClose}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
