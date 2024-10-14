import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

import { useStyles } from './header-table.style'

export const HeaderTable = ({ viewModel }) => {
  const { classes: styles } = useStyles()

  const switcherSettings = viewModel.storekeepersData
    .filter(({ boxesCount }) => boxesCount !== 0)
    .sort((a, b) => a.name?.localeCompare(b.name))
    .map(({ name, _id }) => ({ label: name, value: _id }))
    .concat([
      {
        label: t(TranslationKey['All warehouses']),
        value: '',
      },
    ])

  return (
    <>
      <div className={styles.flexRow}>
        <div className={styles.flexRow}>
          <CustomButton
            danger
            size="large"
            type="primary"
            disabled={!viewModel.selectedRows.length}
            title={t(TranslationKey["Returns all boxes from the selected batch to the 'Boxes ready to send' section"])}
            onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          >
            {t(TranslationKey['Cancel Send'])}
          </CustomButton>

          <CustomRadioButton
            size="large"
            options={switcherSettings}
            defaultValue={viewModel.currentStorekeeperId}
            onChange={viewModel.onClickStorekeeperBtn}
          />
        </div>

        <CustomInputSearch
          enterButton
          allowClear
          wrapperClassName={styles.searchInput}
          size="large"
          placeholder="Search by ASIN, Title, Batch ID"
          onSearch={viewModel.onSearchSubmit}
        />

        <div className={styles.flexRow}>
          <CustomButton
            size="large"
            type="primary"
            disabled={viewModel.selectedRows.length !== 1}
            onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: false })}
          >
            {t(TranslationKey['Edit batch'])}
          </CustomButton>
          <CustomButton size="large" type="primary" onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: true })}>
            {t(TranslationKey['Create a batch'])}
          </CustomButton>
        </div>
      </div>
    </>
  )
}
