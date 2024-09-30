import { Badge } from 'antd'
import { Link } from 'react-router-dom'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { CustomButton } from '@components/shared/custom-button'

import { getSumPropertiesObject } from '@utils/object'
import { renderTooltipTitle } from '@utils/renders'

import { useStyles } from './menu-sub-item.style'

export const MenuSubItem = props => {
  const { activeCategory, activeSubCategory, category, userInfo } = props

  const { classes: styles, cx, theme } = useStyles()

  const renderNotificationBySubRoute = subRoute => {
    switch (subRoute) {
      case '/warehouse/tasks/vacant-tasks':
        return userInfo?.tasksNewAll || 0
      case '/warehouse/tasks/my-tasks':
        return userInfo?.tasksAtProcessAll || 0
      case '/client/notifications/ideas-notifications':
        return userInfo?.updatesOnIdeas || 0
      case '/buyer/notifications/ideas-notifications':
        return userInfo?.updatesOnIdeas || 0
      case '/client/notifications/orders-notifications':
        return userInfo?.needConfirmPriceChange?.orders || 0
      case '/client/notifications/boxes-notifications':
        return userInfo?.needConfirmPriceChange?.boxes || 0
      case '/client/notifications/tariffs-notifications':
        return userInfo?.needUpdateTariff?.boxes || 0
      case '/client/notifications/freelance-notifications':
        return userInfo?.freelanceNotices?.length || 0
      case '/freelancer/notifications/freelance-notifications':
        return userInfo?.freelanceNotices?.length || 0
      case '/client/my-orders/pending-orders':
        return userInfo?.pendingOrder || 0
      case '/client/my-orders/orders':
        return userInfo?.orders || 0
      case '/buyer/not-paid-orders':
        return userInfo?.notPaid || 0
      case '/buyer/need-track-number-orders':
        return userInfo?.needTrackNumber || 0
      case '/buyer/inbound-orders':
        return userInfo?.inbound || 0
      case '/buyer/confirmation-required-orders':
        return userInfo?.confirmationRequired || 0
      case '/buyer/closed-and-canceled-orders':
        return userInfo?.closedAndCanceled || 0
      case '/buyer/ready-for-payment-orders':
        return userInfo?.readyForPayment || 0
      case '/buyer/partially-paid-orders':
        return userInfo?.partiallyPaid || 0
      case '/buyer/all-orders':
        return userInfo?.allOrders || 0
      case '/client/ideas/new':
        return userInfo?.ideas?.new || 0
      case '/client/ideas/on-checking':
        return userInfo?.ideas?.onCheck || 0
      case '/client/ideas/search-suppliers':
        return userInfo?.ideas?.supplierSearch || 0
      case '/client/ideas/create-card':
        return userInfo?.ideas?.productCreating || 0
      case '/client/ideas/add-asin':
        return userInfo?.ideas?.addingAsin || 0
      case '/client/ideas/realized':
        return userInfo?.ideas?.finished || 0
      case '/client/ideas/closed':
        return userInfo?.ideas?.rejectedOrClosed || 0
      case `/${UserRoleCodeMapForRoutes[userInfo?.role]}/notifications/general-notifications-view`:
        return userInfo?.notificationCounter || 0
      case '/client/ideas/all':
        return (
          userInfo?.ideas?.new +
            userInfo?.ideas?.onCheck +
            userInfo?.ideas?.supplierSearch +
            userInfo?.ideas?.productCreating +
            userInfo?.ideas?.addingAsin +
            userInfo?.ideas?.finished +
            userInfo?.ideas?.rejectedOrClosed || 0
        )
      case '/freelancer/freelance/vacant-requests':
        return userInfo?.vacantRequests || 0
      case '/freelancer/freelance/my-proposals':
        return getSumPropertiesObject(userInfo?.myProposals) || 0
      case '/buyer/search-supplier-by-supervisor':
        return userInfo?.searchFromSupervisor || 0
      case '/buyer/search-supplier-by-client':
        return userInfo?.searchFromClient || 0
      default:
        return null
    }
  }

  const getNotificationCountBySubRoute = subRoute => {
    switch (subRoute) {
      case '/warehouse/tasks/vacant-tasks':
        return userInfo?.tasksNewHigh
      case '/warehouse/tasks/my-tasks':
        return userInfo?.tasksAtProcessHigh
      default:
        return null
    }
  }

  const getBigBadge = route => {
    switch (route) {
      case '/client/my-orders/pending-orders':
        return userInfo?.purchaseOrderRequired?.length
      case '/supervisor/ready-to-check-by-researcher':
        return userInfo?.vacFromResearcher
      case '/supervisor/ready-to-check-by-client':
        return userInfo?.vacFromClient
      case '/client/freelance/my-requests':
      case '/freelancer/freelance/my-proposals':
        return userInfo?.freelanceNotices.length
      default:
        return null
    }
  }

  const renderSubCategory = (subIndex, subCategory) => {
    const badge = getNotificationCountBySubRoute(subCategory.subRoute)
    const subCategoryTitle = subCategory?.subtitle()
    const isTooltipVisible = subCategoryTitle !== category?.title()
    const isSelected = subIndex === activeSubCategory
    const notificationBySubRoute = renderNotificationBySubRoute(subCategory.subRoute)
      ? renderNotificationBySubRoute(subCategory.subRoute)
      : null

    return (
      <Link key={subIndex} to={subCategory.subRoute}>
        <CustomButton
          block
          textAlign="left"
          color="primary"
          variant={isSelected ? 'filled' : 'text'}
          size="large"
          icon={<div style={{ width: '24px' }} />}
          title={renderTooltipTitle(subCategory?.subtitle(), userInfo.role)}
          className={styles.menuItem}
        >
          <Badge
            count={notificationBySubRoute}
            overflowCount={99999}
            offset={[25, 7]}
            color={theme.palette.primary.main}
          >
            <span className={styles.text}>{subCategory?.subtitle()}</span>
          </Badge>

          <Badge count={getBigBadge(subCategory.subRoute)} />
        </CustomButton>
      </Link>
    )
  }

  return category.subtitles?.map((subCategory, subIndex) =>
    subCategory.checkHideSubBlock
      ? subCategory.checkHideSubBlock(userInfo)
        ? renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory)
        : null
      : renderSubCategory(subCategory.key ? subCategory.key : subIndex, subCategory),
  )
}
