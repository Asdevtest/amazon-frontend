import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

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
        value: undefined,
      },
    ])

  return (
    <div>
      <div className={styles.searchWrapper}>
        <SearchInput
          key={'client_batches_awaiting-batch_search_input'}
          inputClasses={styles.searchInput}
          value={viewModel.nameSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>
      <div className={styles.btnsWrapper}>
        <div className={styles.btnsSubWrapper}>
          <Button
            disabled={!viewModel.selectedBatches.length}
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
            disabled={viewModel.selectedBatches.length !== 1}
            styles={styles.rightSideButton}
            onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: false })}
          >
            {t(TranslationKey['Edit batch'])}
          </Button>
          <Button
            type={ButtonType.SUCCESS}
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
