import { observer } from 'mobx-react'
import { useState } from 'react'

import { getWarehouseDashboardCardConfig } from '@constants/navigation/dashboard-configs'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { DashboardButtons } from '@components/dashboards/dashboard-buttons'
import { DashboardOneLineCardsList } from '@components/dashboards/dashboard-one-line-cards-list'
import { TextCell } from '@components/data-grid/data-grid-cells'
import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { Button } from '@components/shared/button'
import { Modal } from '@components/shared/modal'
import { UserLink } from '@components/user/user-link'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './warehouse-dashboard-view.style'

import { WarehouseDashboardViewModel } from './warehouse-dashboard-view.model'

export const WarehouseDashboardView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseDashboardViewModel(history))

  return (
    <>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userInfoLeftWrapper}>
          <img src={getUserAvatarSrc(viewModel.userInfo._id)} className={styles.cardImg} />

          <div className={styles.info}>
            <DashboardBalance user={viewModel.userInfo} />

            {viewModel.storekeeperDestination ? <TextCell isCell={false} text={viewModel.adress} /> : null}

            <div>
              <Button onClick={viewModel.onClickAddressBtn}>
                {viewModel.storekeeperDestination ? t(TranslationKey.Edit) : t(TranslationKey['Add address'])}
              </Button>
            </div>
          </div>
        </div>

        <DashboardButtons user={viewModel.userInfo} routes={viewModel.warhouseButtonsRoutes} />

        {viewModel.userInfo.masterUser && (
          <div className={styles.masterUserWrapper}>
            <p>{t(TranslationKey['Master user']) + ':'}</p>

            <UserLink
              blackText
              name={viewModel.userInfo.masterUser?.name}
              userId={viewModel.userInfo.masterUser?._id}
            />
          </div>
        )}
      </div>

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
    </>
  )
})
