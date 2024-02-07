import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { ServiceExchangeCardList } from '@components/cards/service-exchange-card-list'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { t } from '@utils/translations'

import { useStyles } from './service-exchange-view.style'

import { ServiceExchangeViewModel } from './service-exchange-view.model'

export const ServiceExchangeView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ServiceExchangeViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const isListPosition = viewModel.viewMode === tableViewMode.LIST

  return (
    <>
      <div className={styles.tablePanelWrapper}>
        <div className={styles.toggleBtnAndtaskTypeWrapper}>
          <ViewCardsSelect viewMode={viewModel.viewMode} onChangeViewMode={viewModel.onChangeViewMode} />

          <FreelanceTypeTaskSelect
            selectedSpec={viewModel.selectedSpec}
            specs={viewModel.specs}
            onClickSpec={viewModel.onClickSpec}
          />
        </div>

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by Performer, Title, Description'])}
          value={viewModel.nameSearchValue}
          onSubmit={viewModel.onSearchSubmit}
        />
      </div>

      <div
        className={cx(styles.dashboardCardWrapper, { [styles.dashboardCardWrapperList]: isListPosition })}
        onScroll={e => {
          const element = e.target
          const scrollTop = element?.scrollTop
          const containerHeight = element?.clientHeight
          const contentHeight = element?.scrollHeight

          if (contentHeight - (scrollTop + containerHeight) < 200) {
            viewModel.loadMoreDataHadler()
          }
        }}
      >
        {viewModel.currentData.map(service =>
          isListPosition ? (
            <ServiceExchangeCardList
              key={service._id}
              order
              service={service}
              onClickThumbnail={viewModel.onClickThumbnail}
              onClickButton={viewModel.onClickOrderBtn}
            />
          ) : (
            <ServiceExchangeCard
              key={service._id}
              order
              service={service}
              onClickThumbnail={viewModel.onClickThumbnail}
              onClickButton={viewModel.onClickOrderBtn}
            />
          ),
        )}
      </div>

      {!viewModel.currentData.length && (
        <div className={styles.emptyTableWrapper}>
          <img src="/assets/icons/empty-table.svg" />
          <p className={styles.emptyTableText}>{t(TranslationKey.Missing)}</p>
        </div>
      )}

      {viewModel.showImageModal && (
        <ImageModal
          files={viewModel.bigImagesOptions.images}
          currentFileIndex={viewModel.bigImagesOptions.imgIndex}
          isOpenModal={viewModel.showImageModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showImageModal')}
          onCurrentFileIndex={imgIndex => viewModel.setBigImagesOptions({ ...viewModel.bigImagesOptions, imgIndex })}
        />
      )}
    </>
  )
})
