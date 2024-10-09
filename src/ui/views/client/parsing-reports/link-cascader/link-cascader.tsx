import { Cascader, Divider } from 'antd'
import { observer } from 'mobx-react'
import { FC, ReactElement, useCallback, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useStyles } from './link-cascader.style'

import { LinkCascaderModel } from './link-cascader.model'

export const LinkCascader: FC = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new LinkCascaderModel(), [])

  const dropdownRender = useCallback(
    (menu: ReactElement) => (
      <>
        <div className={styles.header}>
          <CustomInputSearch
            allowClear
            placeholder="Shop"
            value={viewModel.inputValue}
            wrapperClassName={styles.inputSearch}
            onChange={viewModel.onChangeInput}
          />
        </div>

        <Text
          type="secondary"
          isCell={false}
          copyable={false}
          textRows={1}
          text={`${t(TranslationKey.Shops)}*`}
          className={styles.title}
        />
        <Cascader.Panel
          multiple
          options={viewModel.shopOptions}
          className={styles.cascaderPanel}
          value={viewModel.selectedShopsOptions}
          // @ts-ignore
          onChange={viewModel.onChangeShopsOptions}
        />

        <Divider className={styles.divider} />

        <Text
          type="secondary"
          isCell={false}
          copyable={false}
          textRows={1}
          text={`${t(TranslationKey.Tables)}*`}
          className={styles.title}
        />

        {menu}

        <div className={styles.footer}>
          <CustomButton disabled={viewModel.disabledLinkButton} type="primary" onClick={viewModel.onBindProductToTable}>
            {t(TranslationKey.Link)}
          </CustomButton>
        </div>
      </>
    ),
    [viewModel.inputValue, viewModel.selectedShopsOptions],
  )

  return (
    <Cascader
      multiple
      open={viewModel.open}
      value={viewModel.selectedTableOptions}
      options={viewModel.tableOptions}
      rootClassName={styles.cascader}
      dropdownRender={dropdownRender}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      // @ts-ignore
      onChange={viewModel.onChangeTableOptions}
    >
      <CustomButton type="primary" size="large">
        {t(TranslationKey.Integration)}
      </CustomButton>
    </Cascader>
  )
})
