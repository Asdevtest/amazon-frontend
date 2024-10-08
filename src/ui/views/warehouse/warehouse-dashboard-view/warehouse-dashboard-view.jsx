import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Paper, Typography } from '@mui/material'

import { getWarehouseDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { Button } from '@components/shared/button'
import { Modal } from '@components/shared/modal'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { styles } from './warehouse-dashboard-view.style'

import { WarehouseDashboardViewModel } from './warehouse-dashboard-view.model'

export const WarehouseDashboardViewRaw = props => {
  const [viewModel] = useState(() => new WarehouseDashboardViewModel({ history: props.history }))
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const warhouseButtonsRoutes = {
    notifications: '',
    messages: 'messages',
    settings: 'management',
  }

  return (
    <>
      <div>
        <Paper className={styles.userInfoWrapper}>
          <div className={styles.userInfoLeftWrapper}>
            <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={styles.cardImg} />

            <div>
              <DashboardBalance user={viewModel.userInfo} />

              {window.innerWidth >= 768 ? (
                <div className={styles.addressMainWrapper}>
                  {viewModel.storekeeperDestination ? (
                    <div className={styles.addressSubWrapper}>
                      <Typography className={styles.address}>{t(TranslationKey['Warehouse address']) + ':'}</Typography>

                      <Typography
                        className={styles.addressMain}
                      >{`${viewModel.storekeeperDestination.name} : ${viewModel.storekeeperDestination.zipCode}, ${viewModel.storekeeperDestination.country}, ${viewModel.storekeeperDestination.state}, ${viewModel.storekeeperDestination.city}, ${viewModel.storekeeperDestination.address}`}</Typography>
                    </div>
                  ) : null}

                  <Button className={styles.editBtn} onClick={viewModel.onClickAddressBtn}>
                    {viewModel.storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add Address'])}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          {window.innerWidth < 768 ? (
            <div className={styles.addressMainWrapper}>
              {viewModel.storekeeperDestination ? (
                <div className={styles.addressSubWrapper}>
                  <Typography className={styles.address}>{t(TranslationKey['Warehouse address']) + ':'}</Typography>

                  <Typography
                    className={styles.addressMain}
                  >{`${viewModel.storekeeperDestination.name} : ${viewModel.storekeeperDestination.zipCode}, ${viewModel.storekeeperDestination.country}, ${viewModel.storekeeperDestination.state}, ${viewModel.storekeeperDestination.city}, ${viewModel.storekeeperDestination.address}`}</Typography>
                </div>
              ) : null}

              <Button className={styles.editBtn} onClick={viewModel.onClickAddressBtn}>
                {viewModel.storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add Address'])}
              </Button>
            </div>
          ) : null}

          <DashboardButtons user={viewModel.userInfo} routes={warhouseButtonsRoutes} />

          {viewModel.userInfo.masterUser && (
            <div className={styles.masterUserWrapper}>
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
      </div>
    </>
  )
}

export const WarehouseDashboardView = withStyles(observer(WarehouseDashboardViewRaw), styles)
