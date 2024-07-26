import { observer } from 'mobx-react'
import { useState } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { ServiceExchangeCardList } from '@components/cards/service-exchange-card-list'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { t } from '@utils/translations'

import { useStyles } from './my-services-view.style'

import { MyServicesViewModel } from './my-services-view.model'

export const MyServicesView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new MyServicesViewModel({ history }))

  const isListPosition = viewModel.viewMode === tableViewMode.LIST

  return (
    <>
      <div className={styles.header}>
        <div className={styles.flexContainer}>
          <ViewCardsSelect viewMode={viewModel.viewMode} onChangeViewMode={viewModel.onChangeViewMode} />

          <FreelanceTypeTaskSelect
            selectedSpec={viewModel.radioButtonOption}
            specs={viewModel.userInfo?.allowedSpec}
            onClickSpec={viewModel.onChangeRadioButtonOption}
          />
        </div>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by Title, Description"
          onSearch={viewModel.onSearchSubmit}
        />

        <div className={styles.flexContainer}>
          <CustomButton size="large" onClick={() => viewModel.onToggleArchive(!viewModel.archive)}>
            {t(TranslationKey[viewModel.archive ? 'To the actual' : 'Open archive'])}
          </CustomButton>

          <CustomButton size="large" type="primary" onClick={viewModel.onClickCreateService}>
            {t(TranslationKey['Create a service'])}
          </CustomButton>
        </div>
      </div>

      <div className={cx(styles.dashboardCardWrapper, { [styles.dashboardCardWrapperList]: isListPosition })}>
        {viewModel.currentData.map((service, serviceKey) =>
          isListPosition ? (
            <ServiceExchangeCardList
              key={serviceKey}
              service={service}
              pathname={viewModel.history?.location?.pathname}
              onClickThumbnail={viewModel.onClickThumbnail}
              onClickButton={viewModel.onClickOpenButton}
            />
          ) : (
            <ServiceExchangeCard
              key={serviceKey}
              service={service}
              pathname={viewModel.history?.location?.pathname}
              onClickThumbnail={viewModel.onClickThumbnail}
              onClickButton={viewModel.onClickOpenButton}
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
    </>
  )
})
