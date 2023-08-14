/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Box, Typography } from '@mui/material'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { ServiceExchangeCardList } from '@components/cards/service-exchange-card-list'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { ToggleBtnGroupFreelance } from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import { ToggleBtnFreelancer } from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import { SearchInput } from '@components/shared/search-input'
import { ViewCartsBlock, ViewCartsLine } from '@components/shared/svg-icons'

import { checkIsFreelancer } from '@utils/checks'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

import { styles } from './my-services-view.style'

import { MyServicesViewModel } from './my-services-view.model'

export const MyServicesViewRaw = props => {
  const [viewModel] = useState(() => new MyServicesViewModel({ history: props.history, location: props.location }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const whiteList =
    !!viewModel.userInfo && checkIsFreelancer(viewModel.userRole)
      ? [
          String(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]),
          ...(viewModel.userInfo?.allowedSpec?.map(spec => spec && String(spec)) || []),
        ]
      : Object.keys(freelanceRequestTypeByCode)

  return (
    <React.Fragment>
      <div>
        <div className={classNames.tablePanelWrapper}>
          <div className={classNames.toggleBtnAndtaskTypeWrapper}>
            <div className={classNames.tablePanelViewWrapper}>
              <ToggleBtnGroupFreelance exclusive value={viewModel.viewMode} onChange={viewModel.onChangeViewMode}>
                <ToggleBtnFreelancer
                  value={tableViewMode.BLOCKS}
                  disabled={viewModel.viewMode === tableViewMode.BLOCKS}
                >
                  <ViewCartsBlock
                    className={cx(classNames.viewCart, {
                      [classNames.viewCartSelected]: viewModel.viewMode === tableViewMode.BLOCKS,
                    })}
                  />
                </ToggleBtnFreelancer>
                <ToggleBtnFreelancer value={tableViewMode.LIST} disabled={viewModel.viewMode === tableViewMode.LIST}>
                  <ViewCartsLine
                    className={cx(classNames.viewCart, {
                      [classNames.viewCartSelected]: viewModel.viewMode === tableViewMode.LIST,
                    })}
                  />
                </ToggleBtnFreelancer>
              </ToggleBtnGroupFreelance>
            </div>

            <div className={classNames.taskTypeWrapper}>
              {Object.keys({
                ...getObjectFilteredByKeyArrayWhiteList(freelanceRequestTypeByCode, whiteList),
                // freelanceRequestTypeByCode
              }).map((taskType, taskIndex) => (
                <Button
                  key={taskIndex}
                  variant="text"
                  disabled={Number(taskType) === Number(viewModel.selectedTaskType)}
                  className={cx(classNames.button, {
                    [classNames.selectedBoxesBtn]: Number(taskType) === Number(viewModel.selectedTaskType),
                  })}
                  onClick={() => viewModel.onClickTaskType(taskType)}
                >
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
                </Button>
              ))}
            </div>
          </div>

          <div className={classNames.searchInputWrapper}>
            <SearchInput
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey['Search by Title, Description'])}
              value={viewModel.nameSearchValue}
              onChange={viewModel.onSearchSubmit}
            />
          </div>

          <div className={classNames.createServiceBtnWrapper}>
            <Button success className={cx(classNames.rightAddingBtn)} onClick={viewModel.onClickCreateServiceBtn}>
              {t(TranslationKey['Create a service'])}
            </Button>
          </div>
        </div>
        <Box
          classes={{ root: classNames.dashboardCardWrapper }}
          display="grid"
          gridTemplateColumns={
            viewModel.viewMode === tableViewMode.LIST
              ? 'repeat(auto-fill, minmax(calc(100% / 2), 1fr))'
              : 'repeat(auto-fill, minmax(calc(100% / 4), 1fr))'
          }
        >
          {viewModel.currentData.map((service, serviceKey) =>
            viewModel.viewMode === tableViewMode.LIST ? (
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
        </Box>
        {!viewModel.currentData.length && (
          <div className={classNames.emptyTableWrapper}>
            <img src="/assets/icons/empty-table.svg" />
            <Typography variant="h5" className={classNames.emptyTableText}>
              {t(TranslationKey.Missing)}
            </Typography>
          </div>
        )}
      </div>

      <ImageModal
        showPreviews
        isOpenModal={viewModel.showImageModal}
        imageList={viewModel.bigImagesOptions.images}
        currentImageIndex={viewModel.bigImagesOptions.imgIndex}
        handleCurrentImageIndex={index => viewModel.handleBigImageModal(index)}
        openModal={viewModel.showImageModal}
        handleOpenModal={() => viewModel.onTriggerOpenModal('showImageModal')}
      />

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
        />
      )}
    </React.Fragment>
  )
}

export const MyServicesView = withStyles(observer(MyServicesViewRaw), styles)
