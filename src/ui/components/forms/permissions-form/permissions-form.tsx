import { Cascader, Skeleton } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './permissions-form.style'

import { PermissionsFormModel } from './permissions-form.model'
import { PermissionsTab, createPermissionOptions } from './permissions-form.type'

interface PermissionsFormPorps {
  onCloseModal: () => void
  subUser?: IFullUser
}

export const PermissionsForm: FC<PermissionsFormPorps> = observer(props => {
  const { onCloseModal, subUser } = props

  const viewModel = useMemo(() => new PermissionsFormModel(subUser), [])
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <CustomRadioButton
        disabled={viewModel.mainLoading}
        size="large"
        buttonStyle="solid"
        value={viewModel.permissionTab}
        options={createPermissionOptions(viewModel.userInfo?.role)}
        onChange={viewModel.onChangePermissionTab}
      />

      <CustomInputSearch allowClear disabled={viewModel.mainLoading} size="large" />

      {viewModel.mainLoading ? (
        <Skeleton.Button active block className={styles.skeleton} />
      ) : viewModel.permissionTab === PermissionsTab.ASSIGN_PERMISSIONS ? (
        <Cascader.Panel
          multiple
          options={viewModel.permissionsOptions}
          className={styles.cascaderPanel}
          value={viewModel.currentPermissionOptions}
          onChange={viewModel.onChangePermissionOptions}
        />
      ) : viewModel.products.length === 0 ? (
        <Skeleton.Button active block className={styles.skeleton} />
      ) : (
        <Cascader.Panel
          multiple
          options={viewModel.shopsOptions}
          className={styles.cascaderPanel}
          value={viewModel.currentProductOptions}
          onChange={viewModel.onChangeProductsOptions}
        />
      )}

      <div className={styles.footer}>
        {viewModel.showSpecsCascader ? (
          <div className={styles.specCascaderContainer}>
            <p className={styles.specLabel}>{t(TranslationKey['Available request types'])}</p>

            {viewModel.mainLoading ? (
              <Skeleton.Button active block size="large" className={styles.specCascader} />
            ) : (
              <Cascader
                multiple
                size="large"
                maxTagCount="responsive"
                value={viewModel.selectedSpecs}
                options={viewModel.specsOptions}
                rootClassName={styles.specCascader}
                onChange={viewModel.onChangeSpecs}
              />
            )}
          </div>
        ) : null}

        <CustomButton type="primary" size="large" disabled={viewModel.mainLoading}>
          {t(TranslationKey.Save)}
        </CustomButton>

        <CustomButton size="large" onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
