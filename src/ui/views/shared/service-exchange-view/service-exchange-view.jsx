/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography, Box, Alert} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import {tableViewMode} from '@constants/table/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {ServiceExchangeCard} from '@components/cards/service-exchange-card'
import {ServiceExchangeCardList} from '@components/cards/service-exchange-card-list'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {Button} from '@components/shared/buttons/button'
import {ToggleBtnGroupFreelance} from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import {ToggleBtnFreelancer} from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import {SearchInput} from '@components/shared/search-input'
import {ViewCartsBlock, ViewCartsLine} from '@components/shared/svg-icons'

import {t} from '@utils/translations'

import {ServiceExchangeViewModel} from './service-exchange-view.model'
import {styles} from './service-exchange-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_SERVICE_EXCHANGE

@observer
class ServiceExchangeViewRaw extends Component {
  viewModel = new ServiceExchangeViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      viewMode,
      drawerOpen,
      onTriggerDrawerOpen,
      selectedTaskType,
      currentData,
      showImageModal,
      bigImagesOptions,
      nameSearchValue,

      onClickTaskType,
      onChangeViewMode,
      onClickThumbnail,
      onTriggerOpenModal,
      onClickOrderBtn,
      onSearchSubmit,
      setBigImagesOptions,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My proposals'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.tablePanelWrapper}>
                <div className={classNames.toggleBtnAndtaskTypeWrapper}>
                  <div className={classNames.tablePanelViewWrapper}>
                    <ToggleBtnGroupFreelance exclusive value={viewMode} onChange={onChangeViewMode}>
                      <ToggleBtnFreelancer value={tableViewMode.BLOCKS} disabled={viewMode === tableViewMode.BLOCKS}>
                        <ViewCartsBlock
                          className={cx(classNames.viewCart, {
                            [classNames.viewCartSelected]: viewMode === tableViewMode.BLOCKS,
                          })}
                        />
                      </ToggleBtnFreelancer>
                      <ToggleBtnFreelancer value={tableViewMode.LIST} disabled={viewMode === tableViewMode.LIST}>
                        <ViewCartsLine
                          className={cx(classNames.viewCart, {
                            [classNames.viewCartSelected]: viewMode === tableViewMode.LIST,
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
                        disabled={Number(taskType) === Number(selectedTaskType)}
                        className={cx(classNames.button, {
                          [classNames.selectedBoxesBtn]: Number(taskType) === Number(selectedTaskType),
                        })}
                        onClick={() => onClickTaskType(taskType)}
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
                    value={nameSearchValue}
                    onChange={onSearchSubmit}
                  />
                </div>
              </div>

              <Box
                container
                classes={{root: classNames.dashboardCardWrapper}}
                className={classNames.dashboardCardWrapper}
                sx={{
                  gridTemplateColumns:
                    viewMode === tableViewMode.LIST
                      ? 'repeat(auto-fill, minmax(calc((100% - 20px) / 2), 1fr))'
                      : 'repeat(auto-fill, minmax(calc((100% - 80px) / 4), 1fr))',
                }}
              >
                {currentData.map((service, serviceKey) =>
                  viewMode === tableViewMode.LIST ? (
                    <ServiceExchangeCardList
                      key={serviceKey}
                      order
                      service={service}
                      onClickThumbnail={onClickThumbnail}
                      onClickButton={onClickOrderBtn}
                    />
                  ) : (
                    <ServiceExchangeCard
                      key={serviceKey}
                      order
                      service={service}
                      onClickThumbnail={onClickThumbnail}
                      onClickButton={onClickOrderBtn}
                    />
                  ),
                )}
              </Box>

              {!currentData && (
                <div className={classNames.emptyTableWrapper}>
                  <img src="/assets/icons/empty-table.svg" />
                  <Typography variant="h5" className={classNames.emptyTableText}>
                    {t(TranslationKey.Missing)}
                  </Typography>
                </div>
              )}
            </MainContent>
          </Appbar>
        </Main>
        <BigImagesModal
          openModal={showImageModal}
          setOpenModal={() => onTriggerOpenModal('showImageModal')}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
          setImageIndex={imgIndex => setBigImagesOptions({...bigImagesOptions, imgIndex})}
        />
      </React.Fragment>
    )
  }
}

export const ServiceExchangeView = withStyles(ServiceExchangeViewRaw, styles)
