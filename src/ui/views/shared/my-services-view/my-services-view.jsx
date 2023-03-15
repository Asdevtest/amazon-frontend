/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography, Box, Alert} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/freelance-request-type'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {ViewCartsBlock, ViewCartsLine} from '@constants/svg-icons'
import {tableViewMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {ServiceExchangeCard} from '@components/cards/service-exchange-card'
import {ServiceExchangeCardList} from '@components/cards/service-exchange-card-list'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'
import {ToggleBtnGroupFreelance} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtnFreelancer} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {t} from '@utils/translations'

import {MyServicesViewModel} from './my-services-view.model'
import {styles} from './my-services-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES

@observer
class MyServicesViewRaw extends Component {
  viewModel = new MyServicesViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      history,
      viewMode,
      drawerOpen,
      onTriggerDrawerOpen,
      selectedTaskType,
      currentData,
      bigImagesOptions,
      showImageModal,
      acceptMessage,
      showAcceptMessage,
      nameSearchValue,

      onSearchSubmit,
      onTriggerOpenModal,
      onClickTaskType,
      onClickCreateServiceBtn,
      onChangeViewMode,
      onClickThumbnail,
      onClickOpenButton,
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
          <Appbar title={t(TranslationKey['My services'])} setDrawerOpen={onTriggerDrawerOpen}>
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
                    placeholder={t(TranslationKey['Search by Title, Description'])}
                    value={nameSearchValue}
                    onChange={onSearchSubmit}
                  />
                </div>

                <div className={classNames.createServiceBtnWrapper}>
                  <Button success className={cx(classNames.rightAddingBtn)} onClick={onClickCreateServiceBtn}>
                    {t(TranslationKey['Create a service'])}
                  </Button>
                </div>
              </div>
              <Box
                container
                classes={{root: classNames.dashboardCardWrapper}}
                display="grid"
                gridTemplateColumns={
                  viewMode === tableViewMode.LIST
                    ? 'repeat(auto-fill, minmax(calc(100% / 2), 1fr))'
                    : 'repeat(auto-fill, minmax(calc(100% / 4), 1fr))'
                }
                gridGap="20px"
              >
                {currentData.map((service, serviceKey) =>
                  viewMode === tableViewMode.LIST ? (
                    <ServiceExchangeCardList
                      key={serviceKey}
                      service={service}
                      history={history}
                      onClickThumbnail={onClickThumbnail}
                      onClickButton={onClickOpenButton}
                    />
                  ) : (
                    <ServiceExchangeCard
                      key={serviceKey}
                      service={service}
                      history={history}
                      onClickThumbnail={onClickThumbnail}
                      onClickButton={onClickOpenButton}
                    />
                  ),
                )}
              </Box>
              {!currentData.length && (
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
        />

        {acceptMessage && showAcceptMessage ? (
          <div className={classNames.acceptMessageWrapper}>
            <Alert elevation={5} severity="success">
              {acceptMessage}
            </Alert>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export const MyServicesView = withStyles(MyServicesViewRaw, styles)
