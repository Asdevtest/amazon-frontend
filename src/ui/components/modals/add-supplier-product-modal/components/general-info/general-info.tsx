import { Form } from 'antd'
import { FC, memo } from 'react'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTreeSelect } from '@components/shared/custom-tree-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { ICategory } from '@typings/shared/category'
import { UploadFileType } from '@typings/shared/upload-file'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './general-info.style'

import { ICreateSupplierProduct } from '../../add-supplier-product-modal.type'

interface GeneralInfoProps {
  categoriesLoading: boolean
  categories: ICategory[]
  images: UploadFileType[]
  handleUploadFiles: (images: UploadFileType[]) => void
}

export const GeneralInfo: FC<GeneralInfoProps> = memo(props => {
  const { categoriesLoading, categories, images, handleUploadFiles } = props

  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.root}>
      <div className={styles.productInfoWrapper}>
        <div className={styles.selectsWrapper}>
          <Form.Item<ICreateSupplierProduct>
            name="supplierId"
            className={cx(sharedStyles.field, 'select')}
            rules={getRequiredRules()}
          >
            <CustomSelect
              required
              allowClear
              mode="tags"
              // loading={viewModel.paymentMethodsRequestStatus === loadingStatus.IS_LOADING}
              wrapperClassName={sharedStyles.input}
              label="Supplier"
              placeholder="Supplier"
              // options={viewModel.paymentMethods}
              options={[{ label: 'test', value: 'test' }]}
              // fieldNames={{ label: 'title', value: '_id' }}
            />
          </Form.Item>

          <Form.Item<ICreateSupplierProduct>
            name="categoryId"
            className={cx(sharedStyles.field, 'select')}
            rules={getRequiredRules()}
          >
            <CustomTreeSelect
              required
              allowClear
              loading={categoriesLoading}
              label="Categories"
              placeholder="Categories"
              wrapperClassName={sharedStyles.input}
              treeData={categories}
              fieldNames={{ label: 'title', value: '_id', children: 'subCategories' }}
            />
          </Form.Item>
        </div>

        <Form.Item<ICreateSupplierProduct> name="cardName" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomInput required size="large" label="Title" placeholder="Title" wrapperClassName={sharedStyles.input} />
        </Form.Item>

        <Form.Item<ICreateSupplierProduct> name="link" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomInput required size="large" label="Link" placeholder="Link" wrapperClassName={sharedStyles.input} />
        </Form.Item>
      </div>

      <Form.Item<ICreateSupplierProduct>
        name="images"
        className={cx(sharedStyles.field, styles?.uploadFiles)}
        rules={getRequiredRules()}
        validateTrigger={['onChange', 'onBlur']}
      >
        <UploadFilesInput dragAndDropButtonHeight={50} images={images} setImages={handleUploadFiles} />
      </Form.Item>
    </div>
  )
})
