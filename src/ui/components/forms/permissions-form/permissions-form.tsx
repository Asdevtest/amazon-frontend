import { Cascader, Skeleton } from 'antd'
import { DefaultOptionType } from 'antd/es/cascader'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './permissions-form.style'

import { createPermissionOptions } from './permissions-form.config'
import { PermissionsFormModel } from './permissions-form.model'
import { ProductOption } from './product-option'
import { UsersSelect } from './users-select'

export interface PermissionsFormProps {
  onCloseModal: () => void
  onUpdateData: () => void
  subUser?: IFullUser
}

export const PermissionsForm: FC<PermissionsFormProps> = observer(props => {
  const viewModel = useMemo(() => new PermissionsFormModel(props), [])
  const { classes: styles } = useStyles()

  const optionRender = (option: DefaultOptionType) => {
    return viewModel.isAssignPermissions ? (
      option.label
    ) : (
      <ProductOption
        label={option.label as string}
        asin={option.asin}
        sku={option.sku}
        image={option.image}
        subOption={option.subOption}
      />
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {viewModel.hasExpiredRoles ? (
          <p className={styles.title}>{t(TranslationKey['Assign permissions'])}</p>
        ) : (
          <CustomRadioButton
            disabled={viewModel.mainLoading}
            size="large"
            buttonStyle="solid"
            value={viewModel.permissionTab}
            options={createPermissionOptions()}
            onChange={viewModel.onChangePermissionTab}
          />
        )}
        <UsersSelect
          disabled={!!viewModel.subUser || viewModel.mainLoading}
          size="large"
          suffixIcon={viewModel.subUser && null}
          mode={viewModel.subUser ? undefined : 'multiple'}
          maxTagCount="responsive"
          defaultUser={viewModel.subUser}
          onChange={viewModel.onChangeUsersData}
        />
      </div>

      <div className={styles.content}>
        {viewModel.showSkeleton ? (
          <Skeleton.Button active block className={styles.skeleton} />
        ) : (
          <>
            <Cascader
              open
              multiple
              size="large"
              maxTagCount="responsive"
              disabled={viewModel.mainLoading}
              showSearch={{ filter: viewModel.searchFilter }}
              options={viewModel.mainOptions}
              rootClassName={styles.cascader}
              popupClassName={styles.cascaderPopup}
              optionRender={optionRender}
              value={viewModel.currentMainOptions}
              onInputKeyDown={viewModel.onInputKeyDown}
              onSearch={viewModel.onSeacrh}
              onBlur={() => viewModel.onChangeSearchFocus(false)}
              // @ts-ignore
              onChange={viewModel.mainChangeMethod}
            />
            {!viewModel.searchFocus ? (
              <p className={styles.searchPlaseholder}>{t(TranslationKey[viewModel.customSearchPlaseholder])}</p>
            ) : null}
          </>
        )}
      </div>

      <div className={styles.footer}>
        {viewModel.isFreelancer ? (
          viewModel.mainLoading ? (
            <Skeleton.Button active block size="large" />
          ) : (
            <CustomSelect
              isRow
              label="Available request types"
              mode="multiple"
              size="large"
              maxTagCount="responsive"
              optionFilterProp="label"
              defaultValue={viewModel.selectedSpecs}
              options={viewModel.specsOptions}
              wrapperClassName={styles.specCascader}
              onChange={viewModel.onChangeSpecs}
            />
          )
        ) : null}

        <CustomButton
          type="primary"
          size="large"
          disabled={viewModel.mainLoading || !viewModel.userIds.length}
          onClick={viewModel.onEditSubUser}
        >
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton size="large" onClick={props.onCloseModal}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
