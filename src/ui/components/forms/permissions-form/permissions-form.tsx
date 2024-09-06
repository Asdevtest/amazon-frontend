import { Cascader, Skeleton } from 'antd'
import { observer } from 'mobx-react'
import { FC, useEffect, useMemo } from 'react'

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

  useEffect(() => {
    return () => {
      viewModel.setProductsLoadedState(false) // Reset flag when form is closed
    }
  }, [onCloseModal])

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
      ) : (
        <Skeleton.Button active block className={styles.skeleton} />
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

        {/* {isFreelancer ? (
          <div className={styles.requestTypeWrapper}>
            <p>{t(TranslationKey['Available request types'])}</p>

            <Select
              multiple
              displayEmpty
              value={currentSpecs}
              className={styles.requestTypeField}
              renderValue={selected =>
                !selected?.length
                  ? t(TranslationKey['Select from the list'])
                  : selected?.map(item => specs?.find(({ type }) => type === item)?.title)?.join(', ')
              }
              onChange={e => selectSpecHandler(e.target.value)}
            >
              <MenuItem disabled value={null}>
                {t(TranslationKey['Select from the list'])}
              </MenuItem>

              {specs?.map(spec => (
                <MenuItem key={spec?._id} value={spec?.type}>
                  <Checkbox checked={currentSpecs.includes(spec?.type)} />
                  {spec?.title}
                </MenuItem>
              ))}
            </Select>
          </div>
        ) : null} */}

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
