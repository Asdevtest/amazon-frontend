/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Box, Typography } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { ServiceExchangeCardList } from '@components/cards/service-exchange-card-list'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { ToggleBtnGroupFreelance } from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import { ToggleBtnFreelancer } from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import { SearchInput } from '@components/shared/search-input'
import { ViewCartsBlock, ViewCartsLine } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { styles } from './service-exchange-view.style'

import { ServiceExchangeViewModel } from './service-exchange-view.model'

export const ServiceExchangeViewRaw = props => {
  const [viewModel] = useState(() => new ServiceExchangeViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

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
              {Object.keys(freelanceRequestTypeByCode).map((taskType, taskIndex) => (
                <Button
                  key={taskIndex}
                  variant="text"
                  btnWrapperStyle={classNames.btnWrapperStyle}
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
              placeholder={t(TranslationKey['Search by Performer, Title, Description'])}
              value={viewModel.nameSearchValue}
              onChange={viewModel.onSearchSubmit}
            />
          </div>
        </div>

        <Box
          container
          classes={{ root: classNames.dashboardCardWrapper }}
          className={classNames.dashboardCardWrapper}
          sx={{
            gridTemplateColumns:
              viewModel.viewMode === tableViewMode.LIST
                ? 'repeat(auto-fill, minmax(calc((100% - 20px) / 2), 1fr))'
                : 'repeat(auto-fill, minmax(calc((100% - 80px) / 4), 1fr))',
          }}
        >
          {viewModel.currentData.map((service, serviceKey) =>
            viewModel.viewMode === tableViewMode.LIST ? (
              <ServiceExchangeCardList
                key={serviceKey}
                order
                service={service}
                onClickThumbnail={viewModel.onClickThumbnail}
                onClickButton={viewModel.onClickOrderBtn}
              />
            ) : (
              <ServiceExchangeCard
                key={serviceKey}
                order
                service={service}
                onClickThumbnail={viewModel.onClickThumbnail}
                onClickButton={viewModel.onClickOrderBtn}
              />
            ),
          )}
        </Box>

        {!viewModel.currentData && (
          <div className={classNames.emptyTableWrapper}>
            <img src="/assets/icons/empty-table.svg" />
            <Typography variant="h5" className={classNames.emptyTableText}>
              {t(TranslationKey.Missing)}
            </Typography>
          </div>
        )}
      </div>

      <ImageModal
        imageList={viewModel.bigImagesOptions.images}
        currentImageIndex={viewModel.bigImagesOptions.imgIndex}
        isOpenModal={viewModel.showImageModal}
        handleOpenModal={() => viewModel.onTriggerOpenModal('showImageModal')}
        handleCurrentImageIndex={imgIndex => viewModel.setBigImagesOptions({ ...viewModel.bigImagesOptions, imgIndex })}
      />
    </React.Fragment>
  )
}

export const ServiceExchangeView = withStyles(observer(ServiceExchangeViewRaw), styles)
