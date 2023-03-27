import {UserRole} from '@constants/user-roles'

import {isHaveMasterUser} from '@utils/checks'
import {t} from '@utils/translations'

import {navBarActiveCategory, navBarActiveSubCategory} from './navbar-active-category'
import {permissionsKeys} from './permissions'
import {
  Addresses,
  ClockIcon,
  DashboardIcon,
  ExchangeIcon,
  Feedback,
  FreelanceIcon,
  FreeOrdersIcon,
  InventoryIcon,
  Message,
  MyBatchesIcon,
  MyFinanceIcon,
  MyNotificationsIcon,
  MyOrdersIcon,
  MyProductsIcon,
  MyUsersIcon,
  MyWarehouseIcon,
  SearchIcon,
  SettingsIcon,
  ShopsIcon,
  TasksIcon,
  NewTasksIcon,
  TradingShops,
  UsersPermissionsIcon,
} from './svg-icons'
import {TranslationKey} from './translations/translation-key'

export const navbarConfig = () => ({
  [UserRole.CLIENT]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      route: '/client/dashboard',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_DASHBOARD_CLIENT),
    },

    {
      icon: FreelanceIcon,
      title: t(TranslationKey.Freelance),
      route: '/client/freelance/my-requests',
      subtitles: [
        {
          subtitle: t(TranslationKey['My requests']),
          subRoute: '/client/freelance/my-requests',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS,
        },
        {
          subtitle: t(TranslationKey['Vacant requests']),
          subRoute: '/client/freelance/vacant-requests',
          key: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
        },

        {
          subtitle: t(TranslationKey['My proposals']),
          subRoute: '/client/freelance/my-proposals',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
        },
      ],
      key: navBarActiveCategory.NAVBAR_REQUESTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_FREELANCE_CLIENT),
    },

    {
      icon: InventoryIcon,
      title: t(TranslationKey.Inventory),
      route: '/client/inventory',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_INVENTORY,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_INVENTORY_CLIENT),
    },

    {
      icon: ExchangeIcon,
      title: t(TranslationKey['Commodity exchange']),
      route: '/client/product-exchange/forks-exchange',
      subtitles: [
        {subtitle: t(TranslationKey['Deal exchange']), subRoute: '/client/product-exchange/forks-exchange'},
        {subtitle: 'Private Label', subRoute: '/client/product-exchange/private-label'},
      ],
      key: navBarActiveCategory.NAVBAR_EXCHANGE,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_VACANT_CLIENT),
    },

    {
      icon: TradingShops,
      title: t(TranslationKey['Trading stores']),
      route: '/client/trading-shops/sell-shops',
      subtitles: [
        {
          subtitle: t(TranslationKey['Buy store']),
          subRoute: '/client/trading-shops/buy-shops',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BUY_SHOPS,
        },
        {
          subtitle: t(TranslationKey['Sell the store']),
          subRoute: '/client/trading-shops/sell-shops',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS,
        },
      ],
      key: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT),
    },

    {
      icon: MyOrdersIcon,
      title: t(TranslationKey['My orders']),
      route: '/client/my-orders/orders',
      // subtitles: null,
      subtitles: [
        {
          subtitle: t(TranslationKey.Orders),
          subRoute: '/client/my-orders/orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_ORDERS_CLIENT),
        },
        {
          subtitle: t(TranslationKey['Pending orders']),
          subRoute: '/client/my-orders/pending-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_PENDING_ORDERS,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_PENDING_ORDERS_CLIENT),
        },
      ],

      key: navBarActiveCategory.NAVBAR_MY_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(
          item =>
            item.key === permissionsKeys.client.SHOW_ORDERS_CLIENT ||
            item.key === permissionsKeys.client.SHOW_PENDING_ORDERS_CLIENT,
        ),
    },
    {
      icon: MyWarehouseIcon,
      title: t(TranslationKey['My warehouse']),
      route: '/client/warehouse/in-stock',
      subtitles: [
        {
          subtitle: t(TranslationKey['Boxes in stock']),
          subRoute: '/client/warehouse/in-stock',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BOXES,
        },

        {
          subtitle: t(TranslationKey['Boxes ready to send']),
          subRoute: '/client/warehouse/boxes-ready-to-batch',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BOXES_READY_TO_BATCH,
        },
      ],
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_WAREHOUSE_CLIENT),
    },
    {
      icon: MyBatchesIcon,
      title: t(TranslationKey['My batches']),
      route: '/client/batches/awaiting-batch',
      subtitles: [
        {
          subtitle: t(TranslationKey['Awaiting send']),
          subRoute: '/client/batches/awaiting-batch',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BOXES_AWAITING_BATCH,
        },
        {
          subtitle: t(TranslationKey['Sent boxes']),
          subRoute: '/client/batches/sent-batches',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BATCHES,
        },
      ],
      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_BATCHES_CLIENT),
    },
    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/client/users/sub-users',
      subtitles: [{subtitle: t(TranslationKey['My users']), subRoute: '/client/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_USERS_CLIENT),
    },

    {
      icon: ShopsIcon,
      title: t(TranslationKey.Shops),
      route: '/client/shops',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_SHOPS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_SHOPS_CLIENT),
    },

    {
      icon: MyFinanceIcon,
      title: t(TranslationKey.Finances),
      route: '/client/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_PAYMENTS_CLIENT),
    },

    {
      icon: MyNotificationsIcon,
      title: t(TranslationKey.Notifications),
      route: '/client/notifications/orders-notifications',
      subtitles: [
        {subtitle: t(TranslationKey['On orders']), subRoute: '/client/notifications/orders-notifications'},
        {subtitle: t(TranslationKey['On boxes']), subRoute: '/client/notifications/boxes-notifications'},
        {subtitle: t(TranslationKey['On boxes tariffs']), subRoute: '/client/notifications/tariffs-notifications'},
        {subtitle: t(TranslationKey['On ideas']), subRoute: '/client/notifications/ideas-notifications'},
      ],
      key: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_NOTIFICATIONS_CLIENT),
    },

    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/client/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_CHAT_CLIENT),
    },
  ],
  [UserRole.RESEARCHER]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      subtitles: null,
      route: '/researcher/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_DASHBOARD_RESEARCHER),
    },
    {
      icon: MyProductsIcon,
      title: t(TranslationKey['My products']),
      subtitles: null,
      route: '/researcher/products',
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_PRODUCTS_RESEARCHER),
    },

    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/researcher/users/sub-users',
      subtitles: [{subtitle: t(TranslationKey['My users']), subRoute: '/researcher/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_USERS_RESEARCHER),
    },

    // {
    //   icon: MyFinanceIcon,
    //   title: t(TranslationKey.Finances),
    //   route: '/researcher/finances',
    //   key: navBarActiveCategory.NAVBAR_FINANCES,
    //   checkHideBlock: user =>
    //     !isHaveMasterUser(user) ||
    //     user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_PAYMENTS_RESEARCHER),
    // },

    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/researcher/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_CHAT_RESEARCHER),
    },
  ],
  [UserRole.FREELANCER]: [
    {
      // icon: InfoOutlinedIcon,
      icon: DashboardIcon,

      title: t(TranslationKey.Dashboard),
      subtitles: null,
      route: '/freelancer/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },

    {
      icon: FreelanceIcon,
      title: t(TranslationKey.Freelance),
      route: '/freelancer/freelance/vacant-requests',
      subtitles: [
        {
          subtitle: t(TranslationKey['Vacant requests']),
          subRoute: '/freelancer/freelance/vacant-requests',
          key: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
        },

        {
          subtitle: t(TranslationKey['My proposals']),
          subRoute: '/freelancer/freelance/my-proposals',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
        },

        // {subtitle: 'Заявки в работе', subRoute: '/freelancer/requests-in-work'},
      ],
      key: navBarActiveCategory.NAVBAR_REQUESTS,
      checkHideBlock: user => !isHaveMasterUser(user),
    },

    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/freelancer/users/sub-users',
      subtitles: [{subtitle: t(TranslationKey['My users']), subRoute: '/freelancer/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: () => true,
    },

    {
      icon: MyFinanceIcon,
      title: t(TranslationKey.Finances),
      route: '/freelancer/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: () => true,
    },
    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/freelancer/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: () => true,
    },
  ],
  [UserRole.SUPERVISOR]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      subtitles: null,
      route: '/supervisor/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_DASHOBARD_SUPERVISOR),
    },

    {
      icon: FreelanceIcon,
      title: t(TranslationKey.Freelance),
      route: '/supervisor/freelance/vacant-deals',
      subtitles: [
        {
          subtitle: t(TranslationKey['Vacant deals']),
          subRoute: '/supervisor/freelance/vacant-deals',
          key: navBarActiveSubCategory.SUB_NAVBAR_VACANT_DEALS,
        },
        {
          subtitle: t(TranslationKey['Deals on review']),
          subRoute: '/supervisor/freelance/deals-on-review',
          key: navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW,
        },
      ],
      key: navBarActiveCategory.NAVBAR_DEALS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_FREELANCE_CLIENT),
    },
    {
      icon: TasksIcon,
      title: t(TranslationKey['Ready to check']),
      route: '/supervisor/ready-to-check',
      subtitles: [
        {
          subtitle: t(TranslationKey['From the Researcher']),
          subRoute: '/supervisor/ready-to-check',
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_VAC_BY_RES_SUPERVISOR),
        },
        {
          subtitle: t(TranslationKey['From the Client']),
          subRoute: '/supervisor/ready-to-check-by-client',
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_VAC_BY_CLIENT_SUPERVISOR),
        },
        // {
        //   subtitle: t(TranslationKey.Idea),
        //   subRoute: '/supervisor/ready-to-check-for-idea',
        //   checkHideSubBlock: () => true,
        // },
      ],
      key: navBarActiveCategory.NAVBAR_READY_TO_CHECK,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(
          item =>
            item.key === permissionsKeys.supervisor.SHOW_VAC_BY_RES_SUPERVISOR ||
            item.key === permissionsKeys.supervisor.SHOW_VAC_BY_CLIENT_SUPERVISOR,
        ),
    },
    {
      icon: MyProductsIcon,
      title: t(TranslationKey['My products']),
      subtitles: null,
      route: '/supervisor/products',
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_PRODUCTS_SUPERVISOR),
    },
    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/supervisor/users/sub-users',
      subtitles: [{subtitle: t(TranslationKey['My users']), subRoute: '/supervisor/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_USERS_SUPERVISOR),
    },
    {
      icon: MyFinanceIcon,
      title: t(TranslationKey.Finances),
      route: '/supervisor/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_PAYMENTS_SUPERVISOR),
    },
    {
      icon: SettingsIcon,
      title: t(TranslationKey.Settings),
      subtitles: null,
      route: '/supervisor/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_SETTINGS_SUPERVISOR),
    },

    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/supervisor/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_CHAT_SUPERVISOR),
    },
  ],
  [UserRole.BUYER]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      subtitles: null,
      route: '/buyer/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_DASHBOARD_BUYER),
    },

    {
      icon: FreeOrdersIcon,
      title: t(TranslationKey['Free Orders']),
      route: '/buyer/free-orders',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_FREE_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_VAC_ORDERS_BUYER),
    },

    {
      icon: ClockIcon,
      title: t(TranslationKey['Pending orders']),
      route: '/buyer/pending-orders',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_PENDING_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_PENDING_ORDERS_BUYER),
    },

    {
      icon: MyOrdersIcon,
      title: t(TranslationKey['My orders']),
      route: '/buyer/my-orders',
      subtitles: [
        {
          subtitle: t(TranslationKey['Not paid']),
          subRoute: '/buyer/not-paid-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NOT_PAID,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_ORDERS_NOT_PAID_BUYER),
        },
        {
          subtitle: t(TranslationKey['Need track number']),
          subRoute: '/buyer/need-track-number-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NEED_TRACK_NUMBER,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_ORDERS_NEED_TRACK_NUMBER_BUYER),
        },
        {
          subtitle: t(TranslationKey.Inbound),
          subRoute: '/buyer/inbound-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_INBOUND,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_ORDERS_INBOUND_BUYER),
        },
        {
          subtitle: t(TranslationKey['Confirmation required']),
          subRoute: '/buyer/confirmation-required-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CONFIRMATION_REQUIRED,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_ORDERS_CONFIRMATION_REQUIRED_BUYER),
        },
        {
          subtitle: t(TranslationKey['Closed and canceled']),
          subRoute: '/buyer/closed-and-canceled-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CLOSED_AND_CANCELED,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_ORDERS_CLOSED_AND_CANCELED_BUYER),
        },
        {
          subtitle: t(TranslationKey['All orders']),
          subRoute: '/buyer/all-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_ALL_ORDERS,
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_ORDERS_BUYER),
        },
      ],
      key: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(
          item =>
            item.key === permissionsKeys.buyer.SHOW_ORDERS_BUYER ||
            item.key === permissionsKeys.buyer.SHOW_ORDERS_NOT_PAID_BUYER ||
            item.key === permissionsKeys.buyer.SHOW_ORDERS_NEED_TRACK_NUMBER_BUYER ||
            item.key === permissionsKeys.buyer.SHOW_ORDERS_INBOUND_BUYER ||
            item.key === permissionsKeys.buyer.SHOW_ORDERS_CONFIRMATION_REQUIRED_BUYER ||
            item.key === permissionsKeys.buyer.SHOW_ORDERS_CLOSED_AND_CANCELED_BUYER,
        ),
    },

    {
      icon: MyProductsIcon,
      title: t(TranslationKey['My products']),
      route: '/buyer/my-products',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_PRODUCTS_BUYER),
    },

    {
      icon: SearchIcon,
      title: t(TranslationKey['Supplier search']),
      // route: '/buyer/search-supplier-by-supervisor',
      subtitles: [
        {
          subtitle: t(TranslationKey['From the Supervisor']),
          subRoute: '/buyer/search-supplier-by-supervisor',
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_VAC_BY_SUP_BUYER),
        },
        {
          subtitle: t(TranslationKey['From the Client']),
          subRoute: '/buyer/search-supplier-by-client',
          checkHideSubBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER),
        },
        // {
        //   subtitle: t(TranslationKey.Idea),
        //   subRoute: '/buyer/search-supplier-for-idea',
        //   checkHideSubBlock: user =>
        //     !isHaveMasterUser(user) ||
        //     user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER),
        // },
      ],
      key: navBarActiveCategory.NAVBAR_NEW_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(
          item =>
            item.key === permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER ||
            item.key === permissionsKeys.buyer.SHOW_VAC_BY_SUP_BUYER,
        ),
    },

    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/buyer/users/sub-users',
      subtitles: [{subtitle: t(TranslationKey['My users']), subRoute: '/buyer/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_USERS_BUYER),
    },
    {
      icon: MyFinanceIcon,
      title: t(TranslationKey.Finances),
      route: '/buyer/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_PAYMENTS_BUYER),
    },

    {
      icon: MyNotificationsIcon,
      title: t(TranslationKey.Notifications),
      route: '/buyer/notifications/ideas-notifications',
      subtitles: [{subtitle: t(TranslationKey['On ideas']), subRoute: '/buyer/notifications/ideas-notifications'}],
      key: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_NOTIFICATIONS_BUYER),
    },

    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/buyer/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_CHAT_BUYER),
    },
  ],
  [UserRole.STOREKEEPER]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      subtitles: null,
      route: '/warehouse/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_DASHBOARD_STOREKEEPER),
    },
    {
      icon: NewTasksIcon,
      title: t(TranslationKey.Tasks),
      subtitles: [
        {
          subtitle: t(TranslationKey['New tasks']),
          subRoute: '/warehouse/tasks/vacant-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_VAC_TASKS,
        },
        {
          subtitle: t(TranslationKey['My tasks']),
          subRoute: '/warehouse/tasks/my-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_MY_TASKS,
        },

        {
          subtitle: t(TranslationKey['Completed tasks']),
          subRoute: '/warehouse/tasks/completed-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_COMPLETED_TASKS,
        },
        {
          subtitle: t(TranslationKey['Canceled tasks']),
          subRoute: '/warehouse/tasks/canceled-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_CANCELED_TASKS,
        },
      ],
      route: '/warehouse/tasks',
      key: navBarActiveCategory.NAVBAR_TASKS,

      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_MY_TASKS_STOREKEEPER),
    },

    {
      icon: MyWarehouseIcon,
      title: t(TranslationKey['My warehouse']),
      route: '/warehouse/my-warehouse',
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,

      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_WAREHOUSE_STOREKEEPER),
    },

    {
      icon: MyBatchesIcon,
      title: t(TranslationKey['My batches']),
      route: '/warehouse/batches/awaiting-batches',
      subtitles: [
        {
          subtitle: t(TranslationKey['Awaiting send']),
          subRoute: '/warehouse/batches/awaiting-batches',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_AWAITING_BATCHES,
        },
        {
          subtitle: t(TranslationKey.Sent),
          subRoute: '/warehouse/batches/sent-batches',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BATCHES,
        },
      ],

      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_BATCHES_STOREKEEPER),
    },
    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/warehouse/users/sub-users',
      subtitles: [{subtitle: t(TranslationKey['My users']), subRoute: '/warehouse/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER),
    },
    {
      icon: MyFinanceIcon,
      title: t(TranslationKey.Finances),
      route: '/warehouse/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_PAYMENTS_STOREKEEPER),
    },

    {
      icon: SettingsIcon,
      title: t(TranslationKey['Warehouse management']),
      route: '/warehouse/management',
      key: navBarActiveCategory.NAVBAR_MANAGEMENT,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_MANAGEMENT_STOREKEEPER),
    },

    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/warehouse/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_CHAT_STOREKEEPER),
    },
  ],
  [UserRole.ADMIN]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      subtitles: null,
      route: '/admin/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: ExchangeIcon,
      title: t(TranslationKey['Commodity exchange']),
      subtitles: null,
      route: '/admin/exchange',
      key: navBarActiveCategory.NAVBAR_EXCHANGE,
      checkHideBlock: () => true,
    },

    {
      icon: InventoryIcon,
      title: t(TranslationKey.Inventory),
      route: '/admin/inventory',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_INVENTORY,
      checkHideBlock: () => true,
    },

    {
      icon: MyOrdersIcon,
      title: t(TranslationKey.Orders),
      subtitles: null,
      route: '/admin/orders',
      key: navBarActiveCategory.NAVBAR_ORDERS,
      checkHideBlock: () => true,
    },

    {
      icon: MyWarehouseIcon,
      title: t(TranslationKey.Warehouse),
      route: '/admin/warehouse/tasks',
      subtitles: [
        {subtitle: t(TranslationKey.Tasks), subRoute: '/admin/warehouse/tasks'},
        {subtitle: t(TranslationKey.Boxes), subRoute: '/admin/warehouse/boxes'},
        // {subtitle: t(TranslationKey.Destinations), subRoute: '/admin/warehouse/destinations'},
      ],
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: () => true,
    },

    {
      icon: MyBatchesIcon,
      title: t(TranslationKey.Batches),
      route: '/admin/batches/awaiting-batches',
      subtitles: [
        {
          subtitle: t(TranslationKey['Awaiting send']),
          subRoute: '/admin/batches/awaiting-batches',
        },
        {
          subtitle: t(TranslationKey.Sent),
          subRoute: '/admin/batches/sent-batches',
        },
      ],

      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: () => true,
    },

    {
      icon: MyFinanceIcon,
      title: t(TranslationKey.Finances),
      route: '/admin/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: () => true,
    },
    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/admin/users',
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: () => true,
    },

    {
      icon: UsersPermissionsIcon,
      title: t(TranslationKey['User permissions']),
      route: '/admin/permissions',
      key: navBarActiveCategory.NAVBAR_PERMISSIONS,
      checkHideBlock: () => true,
    },
    {
      icon: SettingsIcon,
      title: t(TranslationKey.Settings),
      subtitles: null,
      route: '/admin/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: () => true,
    },
    {
      icon: Feedback,
      title: t(TranslationKey.Feedback),
      subtitles: null,
      route: '/admin/feedback',
      key: navBarActiveCategory.NAVBAR_FEEDBACK,
      checkHideBlock: () => true,
    },

    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/admin/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: () => true,
    },
  ],

  [UserRole.MODERATOR]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      route: '/moderator/dashboard',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: TradingShops,
      title: t(TranslationKey['Trading stores']),
      route: '/moderator/trading-shops/stores-to-check',
      subtitles: [
        {
          subtitle: t(TranslationKey['Stores to check']),
          subRoute: '/moderator/trading-shops/stores-to-check',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BUY_SHOPS,
        },
        {
          subtitle: t(TranslationKey['Sell the store']),
          subRoute: '/client/trading-shops/sell-shops',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS,
        },
      ],
      key: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT),
    },
    {
      icon: Addresses,
      title: t(TranslationKey.Appeals),
      route: '/moderator/appeals',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_APPEALS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_PRODUCTS_BUYER),
    },
    {
      icon: MyProductsIcon,
      title: t(TranslationKey['My products']),
      route: '/moderator/my-products',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_PRODUCTS_BUYER),
    },

    {
      icon: MyUsersIcon,
      title: t(TranslationKey.Users),
      route: '/moderator/users/sub-users',
      subtitles: [{subtitle: t(TranslationKey['My users']), subRoute: '/moderator/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER),
    },
    {
      icon: SettingsIcon,
      title: t(TranslationKey.Settings),
      subtitles: null,
      route: '/moderator/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: () => true,
    },
    {
      icon: Message,
      title: t(TranslationKey.Messages),
      route: '/moderator/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: () => true,
    },
  ],
})
