import { Form } from 'antd'
import { FC, UIEvent, memo, useCallback } from 'react'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTreeSelect } from '@components/shared/custom-tree-select'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { throttle } from '@utils/throttle'

import { ISupplierV2Light } from '@typings/models/suppliers/supplier-v2'
import { ICategory } from '@typings/shared/category'
import { UploadFileType } from '@typings/shared/upload-file'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './general-info.style'

import { ICreateSupplierProductModal } from '../../add-supplier-card-modal.type'

interface GeneralInfoProps {
  suppliers: ISupplierV2Light[]
  categoriesLoading: boolean
  isSuppliersLoading: boolean
  categories: ICategory[]
  images: UploadFileType[]
  handleUploadFiles: (images: UploadFileType[]) => void
  loadMoreSuppliers: () => void
  searchSuppliers: (value: string) => void
}

export const GeneralInfo: FC<GeneralInfoProps> = memo(props => {
  const {
    suppliers,
    isSuppliersLoading,
    categoriesLoading,
    categories,
    images,
    handleUploadFiles,
    loadMoreSuppliers,
    searchSuppliers,
  } = props

  const { classes: styles, cx } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const throttledSearch = useCallback(
    throttle((value: string) => searchSuppliers(value), 1500),
    [searchSuppliers],
  )

  return (
    <div className={cx(styles.root, sharedStyles.sectionWrapper)}>
      <div className={styles.productInfoWrapper}>
        <div className={styles.selectsWrapper}>
          <Form.Item<ICreateSupplierProductModal> name="supplierId" className={cx(sharedStyles.field, 'select')}>
            <CustomSelect
              allowClear
              showSearch
              filterOption={false}
              loading={isSuppliersLoading}
              wrapperClassName={sharedStyles.input}
              label="Supplier"
              options={suppliers}
              fieldNames={{ label: 'companyName', value: '_id' }}
              onSearch={throttledSearch}
              onClear={() => searchSuppliers('')}
              onPopupScroll={(event: UIEvent<HTMLElement>) => {
                const isEndScroll =
                  event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight

                if (isEndScroll) {
                  loadMoreSuppliers()
                }
              }}
            />
          </Form.Item>

          <Form.Item<ICreateSupplierProductModal>
            name="categoryId"
            className={cx(sharedStyles.field, 'select')}
            rules={getRequiredRules()}
          >
            <CustomTreeSelect
              required
              allowClear
              loading={categoriesLoading}
              label="Categories"
              wrapperClassName={sharedStyles.input}
              treeData={categories}
              fieldNames={{ label: 'title', value: '_id', children: 'subCategories' }}
            />
          </Form.Item>
        </div>

        <Form.Item<ICreateSupplierProductModal>
          name="cardName"
          className={sharedStyles.field}
          rules={getRequiredRules()}
        >
          <CustomInput required size="large" label="Title" wrapperClassName={sharedStyles.input} />
        </Form.Item>

        <Form.Item<ICreateSupplierProductModal> name="link" className={sharedStyles.field} rules={getRequiredRules()}>
          <CustomInput required size="large" label="Link" wrapperClassName={sharedStyles.input} />
        </Form.Item>
      </div>

      <Form.Item<ICreateSupplierProductModal>
        name="images"
        className={cx(sharedStyles.field, styles?.uploadFiles)}
        validateTrigger={['onChange', 'onBlur']}
      >
        <UploadFilesInput
          wrapperClassName={sharedStyles.uploadFilesInputWrapper}
          dragAndDropButtonHeight={50}
          images={images}
          setImages={handleUploadFiles}
        />
      </Form.Item>
    </div>
  )
})
