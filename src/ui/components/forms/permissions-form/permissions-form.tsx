import { Cascader, Skeleton } from 'antd'
import { DefaultOptionType } from 'antd/es/cascader'
import Paragraph from 'antd/es/typography/Paragraph'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './permissions-form.style'

import { PermissionsTab, createPermissionOptions } from './permissions-form.config'
import { PermissionsFormModel } from './permissions-form.model'

export interface PermissionsFormProps {
  onCloseModal: () => void
  onUpdateData: () => void
  subUser?: IFullUser
}

export const PermissionsForm: FC<PermissionsFormProps> = observer(props => {
  const viewModel = useMemo(() => new PermissionsFormModel(props), [])
  const { classes: styles } = useStyles()

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  return (
    <div className={styles.root}>
      {!viewModel.showSpecsCascader ? (
        <CustomRadioButton
          disabled={viewModel.mainLoading}
          size="large"
          buttonStyle="solid"
          value={viewModel.permissionTab}
          options={createPermissionOptions()}
          onChange={viewModel.onChangePermissionTab}
        />
      ) : null}

      <div className={styles.content}>
        {viewModel.mainLoading ? (
          <Skeleton.Button active block className={styles.skeleton} />
        ) : viewModel.permissionTab === PermissionsTab.ASSIGN_PERMISSIONS ? (
          <Cascader
            open
            multiple
            size="large"
            maxTagCount="responsive"
            disabled={viewModel.mainLoading}
            placeholder="Search by Title"
            showSearch={{ filter, matchInputWidth: false }}
            options={viewModel.permissionsOptions}
            rootClassName={styles.cascader}
            popupClassName={styles.cascaderPopup}
            optionRender={option => (
              <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
                {option.label}
              </Paragraph>
            )}
            value={viewModel.currentPermissionOptions}
            // @ts-ignore
            onChange={viewModel.onChangePermissionOptions}
          />
        ) : viewModel.products.length === 0 ? (
          <Skeleton.Button active block className={styles.skeleton} />
        ) : (
          <Cascader
            open
            multiple
            size="large"
            maxTagCount="responsive"
            disabled={viewModel.mainLoading}
            placeholder="Search by Title"
            showSearch={{ filter }}
            options={viewModel.shopsOptions}
            rootClassName={styles.cascader}
            popupClassName={styles.cascaderPopup}
            optionRender={option => (
              <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
                {option.label}
              </Paragraph>
            )}
            value={viewModel.currentProductOptions}
            // @ts-ignore
            onChange={viewModel.onChangeProductsOptions}
          />
        )}
      </div>

      <div className={styles.footer}>
        {viewModel.showSpecsCascader ? (
          viewModel.mainLoading ? (
            <Skeleton.Button active block size="large" />
          ) : (
            <CustomSelect
              allowClear
              isRow
              label="Available request types"
              mode="multiple"
              size="large"
              maxTagCount="responsive"
              defaultValue={viewModel.selectedSpecs}
              options={viewModel.specsOptions}
              wrapperClassName={styles.specCascader}
              onChange={viewModel.onChangeSpecs}
            />
          )
        ) : null}

        <CustomButton type="primary" size="large" disabled={viewModel.mainLoading} onClick={viewModel.onEditSubUser}>
          {t(TranslationKey.Save)}
        </CustomButton>

        <CustomButton size="large" onClick={props.onCloseModal}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
