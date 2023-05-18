import { Avatar, Paper, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { getWarehouseDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { WarehouseDashboardViewModel } from './warehouse-dashboard-view.model'
import { styles } from './warehouse-dashboard-view.style'

export const WarehouseDashboardViewRaw = props => {
  const [viewModel] = useState(() => new WarehouseDashboardViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const warhouseButtonsRoutes = {
    notifications: '',
    messages: 'messages',
    settings: 'management',
  }

  return (
    <React.Fragment>
      <MainContent>
        <Paper className={classNames.userInfoWrapper}>
          <div className={classNames.userInfoLeftWrapper}>
            <Avatar src={getUserAvatarSrc(viewModel.userInfo._id)} className={classNames.cardImg} />

            <div>
              <DashboardBalance user={viewModel.userInfo} title={t(TranslationKey['My balance'])} />

              {window.innerWidth >= 768 ? (
                <div className={classNames.addressMainWrapper}>
                  {viewModel.storekeeperDestination ? (
                    <div className={classNames.addressSubWrapper}>
                      <Typography className={classNames.address}>
                        {t(TranslationKey['Warehouse address']) + ':'}
                      </Typography>

                      <Typography
                        className={classNames.addressMain}
                      >{`${viewModel.storekeeperDestination.name} : ${viewModel.storekeeperDestination.zipCode}, ${viewModel.storekeeperDestination.country}, ${viewModel.storekeeperDestination.state}, ${viewModel.storekeeperDestination.city}, ${viewModel.storekeeperDestination.address}`}</Typography>
                    </div>
                  ) : null}

                  <Button className={classNames.editBtn} onClick={viewModel.onClickAddressBtn}>
                    {viewModel.storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add Address'])}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          {window.innerWidth < 768 ? (
            <div className={classNames.addressMainWrapper}>
              {viewModel.storekeeperDestination ? (
                <div className={classNames.addressSubWrapper}>
                  <Typography className={classNames.address}>{t(TranslationKey['Warehouse address']) + ':'}</Typography>

                  <Typography
                    className={classNames.addressMain}
                  >{`${viewModel.storekeeperDestination.name} : ${viewModel.storekeeperDestination.zipCode}, ${viewModel.storekeeperDestination.country}, ${viewModel.storekeeperDestination.state}, ${viewModel.storekeeperDestination.city}, ${viewModel.storekeeperDestination.address}`}</Typography>
                </div>
              ) : null}

              <Button className={classNames.editBtn} onClick={viewModel.onClickAddressBtn}>
                {viewModel.storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add Address'])}
              </Button>
            </div>
          ) : null}

          <DashboardButtons user={viewModel.userInfo} routes={warhouseButtonsRoutes} />

          {viewModel.userInfo.masterUser && (
            <div className={classNames.masterUserWrapper}>
              <Typography>{t(TranslationKey['Master user']) + ':'}</Typography>

              <UserLink
                blackText
                name={viewModel.userInfo.masterUser?.name}
                userId={viewModel.userInfo.masterUser?._id}
              />
            </div>
          )}
        </Paper>
        {getWarehouseDashboardCardConfig().map(item => (
          <DashboardOneLineCardsList
            key={item.key}
            config={item}
            valuesData={viewModel.dashboardData}
            onClickViewMore={viewModel.onClickInfoCardViewMode}
          />
        ))}

        <Modal
          openModal={viewModel.showAddOrEditDestinationModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditDestinationModal')}
        >
          <AddOrEditDestinationForm
            destinationToEdit={viewModel.storekeeperDestination}
            onCloseModal={() => viewModel.onTriggerOpenModal('showAddOrEditDestinationModal')}
            onCreateSubmit={viewModel.onSubmitChangeDestination}
            onEditSubmit={viewModel.onSubmitChangeDestination}
          />
        </Modal>
      </MainContent>
    </React.Fragment>
  )
}

export const WarehouseDashboardView = withStyles(observer(WarehouseDashboardViewRaw), styles)
