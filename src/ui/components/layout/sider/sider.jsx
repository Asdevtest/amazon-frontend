import { Badge, Flex, Layout, Menu } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { BsFire } from 'react-icons/bs'
import { VscFeedback } from 'react-icons/vsc'
import { useHistory } from 'react-router-dom'

import { appVersion } from '@constants/app-version'
import { navBarActiveCategory } from '@constants/navigation/navbar-active-category'
import { TranslationKey } from '@constants/translations/translation-key'

import { VersionHistoryForm } from '@components/forms/version-history-form'
import { FeedBackModal } from '@components/modals/feedback-modal'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { ShortLogoIcon } from '@components/shared/svg-icons'

import { renderTooltipTitle } from '@utils/renders'
import { t } from '@utils/translations'

import { isAdmin, isModerator } from '@typings/guards/roles'

import { useStyles } from './sider.style'

import { SiderModel } from './sider.model'

export const alwaysShowSubCategoryKeys = [
  navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
  navBarActiveCategory.NAVBAR_READY_TO_CHECK,
]

const { Sider: AntSider } = Layout

export const Sider = observer(({ activeCategory, activeSubCategory }) => {
  const { classes: styles, theme, cx } = useStyles()
  const history = useHistory()
  const viewModel = useMemo(() => new SiderModel(), [])

  const getBadge = route => {
    if (route.includes('/messages')) {
      return viewModel.unreadMessages
    }

    switch (route) {
      case '/buyer/pending-orders':
        return viewModel.userInfo.pendingOrders
      case '/client/my-orders/orders':
        return viewModel.userInfo.allOrders
      case '/client/freelance/service-exchange':
        return viewModel.userInfo.freelanceNotices?.length
      case '/client/my-orders/pending-orders':
        return viewModel.userInfo?.purchaseOrderRequired?.length
      case '/supervisor/ready-to-check-by-researcher':
        return viewModel.userInfo?.vacFromResearcher
      case '/supervisor/ready-to-check-by-client':
        return viewModel.userInfo?.vacFromClient
      case '/client/freelance/my-requests':
      case '/freelancer/freelance/my-proposals':
        return viewModel.userInfo?.freelanceNotices.length
      case '/warehouse/tasks/vacant-tasks':
        return viewModel.userInfo?.tasksNewHigh
      case '/warehouse/tasks/my-tasks':
        return viewModel.userInfo?.tasksAtProcessHigh
      case '/warehouse/tasks':
        return viewModel.userInfo?.tasksAtProcessAll + viewModel.userInfo?.tasksNewAll
      case '/client/notifications':
        return (
          viewModel.userInfo?.needConfirmPriceChange?.boxes +
          viewModel.userInfo?.needConfirmPriceChange?.orders +
          viewModel.userInfo?.needUpdateTariff?.boxes +
          viewModel.userInfo?.freelanceNotices?.length +
          viewModel.userInfo?.notificationCounter
        )
      case '/freelancer/notifications':
        return viewModel.userInfo?.freelanceNotices?.length + viewModel.userInfo?.notificationCounter
      case '/buyer/notifications':
        return viewModel.userInfo.userInfo?.notificationCounter
      case '/buyer/free-orders':
        return viewModel.userInfo?.freeOrders
      case '/buyer/search-supplier':
        return viewModel.userInfo?.searchFromClient + viewModel.userInfo?.searchFromSupervisor
      case '/client/ideas':
        return (
          viewModel.userInfo?.ideas?.addingAsin +
          viewModel.userInfo?.ideas?.new +
          viewModel.userInfo?.ideas?.onCheck +
          viewModel.userInfo?.ideas?.productCreating +
          viewModel.userInfo?.ideas?.supplierSearch
        )
      default:
        return null
    }
  }

  const getItem = item =>
    item?.checkHideBlock?.(viewModel.userInfo) && {
      key: item.key,
      icon: (
        <Badge
          size="small"
          count={getBadge(item.route)}
          overflowCount={99999}
          offset={[10, 0]}
          color={theme.palette.primary.main}
        >
          {item.icon}
        </Badge>
      ),
      label: t(TranslationKey[item.label]),
      route: item.route,
      title: renderTooltipTitle(item.label, viewModel.userInfo.role),
      extra: (
        <>
          {getBadge(item.route) >= 1 ? <BsFire size={20} color="red" /> : null}
          <Badge count={getBadge(item.route)} overflowCount={999} />
        </>
      ),
      children: item.children?.map(
        subItem =>
          subItem?.checkHideBlock?.(viewModel.userInfo) && {
            key: subItem.key,
            icon: <Badge count={getBadge(subItem.route)} overflowCount={999} color={theme.palette.primary.main} />,
            label: t(TranslationKey[subItem.label]),
            route: subItem.route,
            title: renderTooltipTitle(subItem.label, viewModel.userInfo.role),
            extra: <Badge count={getBadge(subItem.route)} overflowCount={999} />,
            onClick: () => history.push(subItem.route),
          },
      ),
    }

  const options = viewModel.menuItems.map((menuItem, index) => getItem(menuItem))

  return (
    <>
      <AntSider width={280} className={styles.sider}>
        <Flex component="div" align="center" justify="center" style={{ minHeight: 50 }}>
          <ShortLogoIcon />
        </Flex>

        <Flex vertical>
          <Menu triggerSubMenuAction="hover" defaultSelectedKeys={[activeCategory]} mode="vertical" items={options} />
        </Flex>

        <Flex vertical>
          {!isAdmin(viewModel.userInfo.role) && !isModerator(viewModel.userInfo.role) ? (
            <CustomButton
              block
              size="large"
              type="link"
              textAlign="left"
              icon={<VscFeedback size={24} />}
              className={styles.feedback}
              onClick={() => viewModel.onTriggerOpenModal('showFeedbackModal')}
            >
              {t(TranslationKey.Feedback)}
            </CustomButton>
          ) : null}
          <CustomButton
            block
            type="link"
            size="small"
            textAlign="left"
            className={styles.version}
            onClick={viewModel.onClickVersion}
          >
            {appVersion}
          </CustomButton>
        </Flex>
      </AntSider>

      {viewModel.showFeedbackModal ? (
        <FeedBackModal
          // @ts-ignore
          openModal={viewModel.showFeedbackModal}
          onSubmit={viewModel.sendFeedbackAboutPlatform}
          onClose={() => viewModel.onTriggerOpenModal('showFeedbackModal')}
        />
      ) : null}

      <Modal
        openModal={viewModel.showVersionHistoryModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showVersionHistoryModal')}
      >
        <VersionHistoryForm
          title={t(TranslationKey['Version history of releases'])}
          selectedPatchNote={viewModel.patchNote}
          patchNotes={viewModel.patchNotes}
          onScrollPatchNotes={viewModel.loadMoreDataHadler}
          onResetPatchNote={viewModel.onResetPatchNote}
          onViewPatchNote={viewModel.getPatchNote}
          onClickResetVersion={viewModel.onClickResetVersion}
        />
      </Modal>
    </>
  )
})
