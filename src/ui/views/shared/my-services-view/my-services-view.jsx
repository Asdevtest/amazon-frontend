import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { ServiceExchangeCardList } from '@components/cards/service-exchange-card-list'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { t } from '@utils/translations'

import { useStyles } from './my-services-view.style'

import { MyServicesViewModel } from './my-services-view.model'

export const MyServicesView = observer(({ history, location }) => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new MyServicesViewModel({ history, location }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const isListPosition = viewModel.viewMode === tableViewMode.LIST

  return (
    <React.Fragment>
      <div className={styles.tablePanelWrapper}>
        <div className={styles.toggleBtnAndtaskTypeWrapper}>
          <ViewCardsSelect viewMode={viewModel.viewMode} onChangeViewMode={viewModel.onChangeViewMode} />

          <FreelanceTypeTaskSelect
            selectedTaskType={viewModel.selectedTaskType}
            onClickTaskType={viewModel.onClickTaskType}
          />
        </div>

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by Title, Description'])}
          value={viewModel.nameSearchValue}
          onChange={viewModel.onSearchSubmit}
        />

        <Button success className={styles.rightAddingBtn} onClick={viewModel.onClickCreateServiceBtn}>
          {t(TranslationKey['Create a service'])}
        </Button>
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

      {viewModel.showImageModal && (
        <ImageModal
          showPreviews
          isOpenModal={viewModel.showImageModal}
          imageList={viewModel.service?.linksToMediaFiles}
          openModal={viewModel.showImageModal}
          handleOpenModal={() => viewModel.onTriggerOpenModal('showImageModal')}
        />
      )}

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings.alertShieldMessage}
          error={viewModel?.alertShieldSettings.error}
        />
      )}
    </React.Fragment>
  )
})
