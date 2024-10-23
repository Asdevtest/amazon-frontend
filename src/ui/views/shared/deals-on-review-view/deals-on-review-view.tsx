import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'

import { tableSortMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantDealsListCard } from '@components/cards/vacant-deals-list-card'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './deals-on-review-view.style'

import { DealsOnReviewModel } from './deals-on-review-view.model'

export const DealsOnReviewView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new DealsOnReviewModel(history), [])

  return (
    <>
      <div className={styles.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
        <p className={styles.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</p>

        {viewModel.sortMode === tableSortMode.DESK ? <MdArrowDropDown /> : <MdArrowDropUp />}
      </div>

      <div className={styles.dealsOnReviewWrapper}>
        {viewModel.currentData.length ? (
          viewModel.currentData.map((deal, index) => (
            <VacantDealsListCard
              key={index}
              showDetails
              item={deal}
              onClickViewMore={viewModel.onClickViewMore}
              onClickGetToWorkModal={() => {}}
            />
          ))
        ) : (
          <div className={styles.emptyTableWrapper}>
            <img src="/assets/icons/empty-table.svg" />
            <p className={styles.emptyTableText}>{t(TranslationKey['No deals yet'])}</p>
          </div>
        )}
      </div>
    </>
  )
})
