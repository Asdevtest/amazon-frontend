import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './header-table.style'

export const HeaderTable = ({ viewModel }) => {
  const { classes: styles } = useStyles()

  const switcherSettings = viewModel.storekeepersData
    .filter(({ boxesCount }) => boxesCount !== 0)
    .sort((a, b) => a.name?.localeCompare(b.name))
    .map(({ name, _id }) => ({ label: () => name, value: _id }))
    .concat([
      {
        label: () => t(TranslationKey['All warehouses']),
        value: '',
      },
    ])

  return (
    <div>
      <div className={styles.searchWrapper}>
        <SearchInput
          key={'client_batches_awaiting-batch_search_input'}
          inputClasses={styles.searchInput}
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>
      <div className={styles.btnsWrapper}>
        <div className={styles.btnsSubWrapper}>
          <Button
            styleType={ButtonStyle.DANGER}
            disabled={!viewModel.selectedRows.length}
            tooltipInfoContent={t(
              TranslationKey['Returns all boxes from the selected batch to the "Boxes ready to send" section'],
            )}
            styles={styles.cancelBtn}
            onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          >
            {t(TranslationKey['Cancel Send'])}
          </Button>

          <CustomSwitcher
            switchMode={'medium'}
            condition={viewModel.currentStorekeeperId}
            switcherSettings={switcherSettings}
            changeConditionHandler={viewModel.onClickStorekeeperBtn}
          />
        </div>

        <div className={styles.rightSideButtonsWrapper}>
          <Button
            disabled={viewModel.selectedRows.length !== 1}
            styles={styles.rightSideButton}
            onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: false })}
          >
            {t(TranslationKey['Edit batch'])}
          </Button>
          <Button
            styleType={ButtonStyle.SUCCESS}
            styles={styles.rightSideButton}
            onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: true })}
          >
            {t(TranslationKey['Create a batch'])}
          </Button>
        </div>
      </div>
    </div>
  )
}
