import {Avatar, Paper, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {getWarehouseDashboardCardConfig} from '@constants/dashboard-configs'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DashboardButtons} from '@components/dashboards/dashboard-buttons'
import {DashboardOneLineCardsList} from '@components/dashboards/dashboard-one-line-cards-list'
import {AddOrEditDestinationForm} from '@components/forms/add-or-edit-destination-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {WarehouseDashboardViewModel} from './warehouse-dashboard-view.model'
import {styles} from './warehouse-dashboard-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DASHBOARD

@observer
export class WarehouseDashboardViewRaw extends Component {
  viewModel = new WarehouseDashboardViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showAddOrEditDestinationModal,
      storekeeperDestination,
      dashboardData,
      userInfo,
      drawerOpen,
      onChangeTriggerDrawerOpen,
      onClickInfoCardViewMode,
      onClickAddressBtn,
      onTriggerOpenModal,
      onSubmitChangeDestination,
    } = this.viewModel
    const {classes: classNames} = this.props
    const warhouseButtonsRoutes = {
      notifications: '',
      messages: 'messages',
      settings: 'management',
    }
    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Dashboard)} setDrawerOpen={onChangeTriggerDrawerOpen}>
            <MainContent>
              <Paper className={classNames.userInfoWrapper}>
                <div className={classNames.userInfoLeftWrapper}>
                  <Avatar src={getUserAvatarSrc(userInfo._id)} className={classNames.cardImg} />

                  <div>
                    <DashboardBalance user={userInfo} title={t(TranslationKey['My balance'])} />

                    <div className={classNames.addressMainWrapper}>
                      {storekeeperDestination ? (
                        <div className={classNames.addressSubWrapper}>
                          <Typography className={classNames.address}>
                            {t(TranslationKey['Warehouse address']) + ':'}
                          </Typography>

                          <Typography
                            className={classNames.addressMain}
                          >{`${storekeeperDestination.name} : ${storekeeperDestination.zipCode}, ${storekeeperDestination.country}, ${storekeeperDestination.state}, ${storekeeperDestination.city}, ${storekeeperDestination.address}`}</Typography>
                        </div>
                      ) : null}

                      <Button onClick={onClickAddressBtn}>
                        {storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add Address'])}
                      </Button>
                    </div>
                  </div>
                </div>

                <DashboardButtons user={userInfo} routes={warhouseButtonsRoutes} />
              </Paper>
              {getWarehouseDashboardCardConfig().map(item => (
                <DashboardOneLineCardsList
                  key={item.key}
                  config={item}
                  valuesData={dashboardData}
                  onClickViewMore={onClickInfoCardViewMode}
                />
              ))}

              <Modal
                openModal={showAddOrEditDestinationModal}
                setOpenModal={() => onTriggerOpenModal('showAddOrEditDestinationModal')}
              >
                <AddOrEditDestinationForm
                  destinationToEdit={storekeeperDestination}
                  onCloseModal={() => onTriggerOpenModal('showAddOrEditDestinationModal')}
                  onCreateSubmit={onSubmitChangeDestination}
                  onEditSubmit={onSubmitChangeDestination}
                />
              </Modal>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const WarehouseDashboardView = withStyles(WarehouseDashboardViewRaw, styles)
