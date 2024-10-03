import { BsBasket, BsCurrencyExchange } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { FaBoxOpen, FaClipboardList, FaRegClock, FaTasks, FaUserCheck, FaUsers } from 'react-icons/fa'
import { FaRegAddressCard, FaRegCreditCard, FaShop } from 'react-icons/fa6'
import { FcIdea } from 'react-icons/fc'
import { GiCardExchange, GiInfo } from 'react-icons/gi'
import { GrUpdate } from 'react-icons/gr'
import { IoSettingsOutline } from 'react-icons/io5'
import { LuMessagesSquare } from 'react-icons/lu'
import { MdNotificationsActive, MdOutlineInventory2, MdOutlineWarehouse } from 'react-icons/md'
import { SiFreelancermap } from 'react-icons/si'
import { VscFeedback } from 'react-icons/vsc'

import { UserRole } from '@constants/keys/user-roles'

import { isHaveMasterUser } from '@utils/checks'

import { Route } from '@typings/shared/navbar-config'

import { permissionsKeys } from '../keys/permissions'

import { navBarActiveCategory, navBarActiveSubCategory } from './navbar-active-category'

export const navbarConfig: Record<string, Route[]> = {
  [UserRole.CLIENT]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      route: '/client/dashboard',
      children: null,
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.SHOW_DASHBOARD_CLIENT),
    },
    {
      icon: <SiFreelancermap size={18} />,
      label: 'Freelance',
      route: '/client/freelance/my-requests',
      children: [
        {
          label: 'Service exchange',
          route: '/client/freelance/service-exchange',
          key: navBarActiveSubCategory.SUB_NAVBAR_SERVICE_EXCHANGE,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_FREELANCE_EXCHANGE_CLIENT),
        },
        {
          label: 'My requests',
          route: '/client/freelance/my-requests',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_FREELANCE_REQUESTS_CLIENT),
        },
      ],
      key: navBarActiveCategory.NAVBAR_REQUESTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.SHOW_FREELANCE_CLIENT),
    },
    {
      icon: <MdOutlineInventory2 size={18} />,
      label: 'Inventory',
      route: '/client/inventory',
      children: [
        {
          label: 'Products',
          route: '/client/inventory',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_INVENTORY,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.inventory.SHOW_PRODUCTS_INVENTORY_CLIENT),
        },
        {
          label: 'Reports',
          route: '/client/inventory/reports',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_INVENTORY_REPORTS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.inventory.SHOW_INVENTORY_LISTING_REPORTS),
        },
      ],
      key: navBarActiveCategory.NAVBAR_INVENTORY,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.inventory.SHOW_INVENTORY_CLIENT),
    },
    {
      icon: <FcIdea size={18} />,
      route: '/client/ideas',
      label: 'Ideas',
      children: [
        {
          label: 'All',
          route: '/client/ideas/all',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_ALL_IDEAS_CLIENT),
        },
        {
          label: 'New ideas',
          route: '/client/ideas/new',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_NEW_IDEAS_CLIENT),
        },
        {
          label: 'On checking',
          route: '/client/ideas/on-checking',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_ON_CHECKING_IDEAS_CLIENT),
        },
        {
          label: 'Search for suppliers',
          route: '/client/ideas/search-suppliers',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_SEARCH_SUPPLIER_IDEAS_CLIENT),
        },
        {
          label: 'Creating a product card',
          route: '/client/ideas/create-card',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_CREATE_CARD_IDEAS_CLIENT),
        },
        {
          label: 'Adding ASIN',
          route: '/client/ideas/add-asin',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_ADD_ASIN_IDEAS_CLIENT),
        },
        {
          label: 'Rejected and closed',
          route: '/client/ideas/closed',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_CLOSED_IDEAS_CLIENT),
        },
        {
          label: 'Realized ideas',
          route: '/client/ideas/realized',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_REALIZED_IDEAS_CLIENT),
        },
      ],
      key: navBarActiveCategory.NAVBAR_IDEAS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.ideas.SHOW_IDEAS_CLIENT),
    },
    {
      icon: <BsCurrencyExchange size={18} />,
      label: 'Commodity exchange',
      route: '/client/product-exchange',
      children: [
        {
          label: 'Research exchange',
          route: '/client/product-exchange/forks-exchange',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_COMEXCHANGE_RESEXCHANGE_CLIENT),
        },
        {
          label: 'Private label',
          route: '/client/product-exchange/private-label',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_COMEXCHANGE_PRLABEL_CLIENT),
        },
      ],
      key: navBarActiveCategory.NAVBAR_EXCHANGE,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.client.SHOW_VACANT_CLIENT),
    },
    {
      icon: <FaClipboardList size={18} />,
      label: 'My orders',
      route: '/client/my-orders/orders',
      children: [
        {
          label: 'Orders',
          route: '/client/my-orders/orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_ORDERS_CLIENT),
        },
        {
          label: 'Pending orders',
          route: '/client/my-orders/pending-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_PENDING_ORDERS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_PENDING_ORDERS_CLIENT),
        },
      ],
      key: navBarActiveCategory.NAVBAR_MY_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.SHOW_MYORDERS_CLIENT),
    },
    {
      icon: <MdOutlineWarehouse size={18} />,
      label: 'My warehouse',
      route: '/client/warehouse/in-stock',
      children: [
        {
          label: 'Boxes in stock',
          route: '/client/warehouse/in-stock',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BOXES,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_WAREHOUSE_BOXESINSTOCK_CLIENT),
        },
        {
          label: 'Tasks',
          route: '/client/warehouse/tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_TASKS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_WAREHOUSE_TASKS_CLIENT),
        },
      ],
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.SHOW_WAREHOUSE_CLIENT),
    },
    {
      icon: <FaBoxOpen size={18} />,
      label: 'My batches',
      route: '/client/batches/awaiting-batch',
      children: [
        {
          label: 'Awaiting send',
          route: '/client/batches/awaiting-batch',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BOXES_AWAITING_BATCH,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_BATCHES_AWAITINGSEND_CLIENT),
        },
        {
          label: 'Sent boxes',
          route: '/client/batches/sent-batches',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BATCHES,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_BATCHES_SENTBOXES_CLIENT),
        },
      ],
      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.client.SHOW_BATCHES_CLIENT),
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/client/users/sub-users',
      children: [{ label: 'My users', route: '/client/users/sub-users' }],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.client.SHOW_USERS_CLIENT),
    },
    {
      icon: <FaShop size={18} />,
      label: 'Shops',
      route: '/client/shops',
      key: navBarActiveCategory.NAVBAR_SHOPS,
      children: [
        {
          label: 'Shops',
          route: '/client/shops/shops',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_SHOPS_CLIENT),
        },
        {
          label: 'Reports',
          route: '/client/shops/reports',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_SHOPS_REPORTS_CLIENT),
        },
        {
          label: 'Parsing reports',
          route: '/client/shops/parsing-reports',
        },
      ],
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.client.SHOW_STORES_CLIENT),
    },
    {
      icon: <FaRegCreditCard size={18} />,
      label: 'Finances',
      route: '/client/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.SHOW_PAYMENTS_CLIENT),
    },
    {
      icon: <MdNotificationsActive size={18} />,
      label: 'Notifications',
      route: '/client/notifications',
      children: [
        {
          label: 'On orders',
          route: '/client/notifications/orders-notifications',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_NOTIFICATIONS_ORDERS_CLIENT),
        },
        {
          label: 'On boxes',
          route: '/client/notifications/boxes-notifications',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_NOTIFICATIONS_BOXES_CLIENT),
        },

        {
          label: 'On boxes tariffs',
          route: '/client/notifications/tariffs-notifications',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_NOTIFICATIONS_BOXESTARIF_CLIENT),
        },
        {
          label: 'Request messages',
          route: '/client/notifications/freelance-notifications',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_NOTIFICATIONS_REQUESTS_CLIENT),
        },
        {
          label: 'General notifications',
          key: navBarActiveSubCategory.SUB_NAVBAR_GENERAL_NOTIFICATIONS,
          route: '/client/notifications/general-notifications-view',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.client.SHOW_NOTIFICATIONS_GENERAL_CLIENT),
        },
      ],
      key: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.SHOW_NOTIFICATIONS_CLIENT),
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/client/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.client.SHOW_CHAT_CLIENT),
    },
  ],
  [UserRole.RESEARCHER]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      children: null,
      route: '/researcher/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.researcher.SHOW_DASHBOARD_RESEARCHER),
    },
    {
      icon: <BsBasket size={18} />,
      label: 'My products',
      children: null,
      route: '/researcher/products',
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.researcher.SHOW_PRODUCTS_RESEARCHER),
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/researcher/users/sub-users',
      children: [{ label: 'My users', route: '/researcher/users/sub-users' }],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.researcher.SHOW_USERS_RESEARCHER),
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/researcher/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.researcher.SHOW_CHAT_RESEARCHER),
    },
  ],
  [UserRole.FREELANCER]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      children: null,
      route: '/freelancer/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_DASHBOARD_FREELANCER),
    },
    {
      icon: <SiFreelancermap size={18} />,
      label: 'Freelance',
      route: '/freelancer/freelance/vacant-requests',
      children: [
        {
          label: 'Vacant requests',
          route: '/freelancer/freelance/vacant-requests',
          key: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_VAC_REQUESTS_FREELANCER),
        },
        {
          label: 'My proposals',
          route: '/freelancer/freelance/my-proposals',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_PROPOSALS_FREELANCER),
        },
        {
          label: 'All proposals',
          route: '/freelancer/freelance/all-proposals',
          key: navBarActiveSubCategory.SUB_NAVBAR_ALL_PROPOSALS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_FREELANCE_ALLPROPOSALS_FREELANCER),
        },
        {
          label: 'My services',
          route: '/freelancer/freelance/my-services',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES,

          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_ANNOUNCEMENTS_FREELANCER),
        },
        {
          label: 'Source Files',
          route: '/freelancer/freelance/source-files',
          key: navBarActiveSubCategory.SUB_NAVBAR_SOURCE_FILES,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_SOURCES_FREELANCER),
        },
      ],
      key: navBarActiveCategory.NAVBAR_REQUESTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_FREELANCE_FREELANCER),
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/freelancer/users/sub-users',
      children: [{ label: 'My users', route: '/freelancer/users/sub-users' }],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_USERS_FREELANCER),
    },
    {
      icon: <FaRegCreditCard size={18} />,
      label: 'Finances',
      route: '/freelancer/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_PAYMENTS_FREELANCER),
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/freelancer/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_CHAT_FREELANCER),
    },
    {
      icon: <MdNotificationsActive size={18} />,
      label: 'Notifications',
      route: '/freelancer/notifications',
      children: [
        {
          label: 'Request messages',
          route: '/freelancer/notifications/freelance-notifications',

          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_NOTIFICATIONS_REQUESTS_FREELANCER),
        },
        {
          label: 'General notifications',
          key: navBarActiveSubCategory.SUB_NAVBAR_GENERAL_NOTIFICATIONS,
          route: '/freelancer/notifications/general-notifications-view',

          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_NOTIFICATIONS_GENERAL_FREELANCER),
        },
      ],
      key: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.freelancer.SHOW_NOTIFICATIONS_FREELANCER),
    },
  ],
  [UserRole.SUPERVISOR]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      children: null,
      route: '/supervisor/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_DASHOBARD_SUPERVISOR),
    },
    {
      icon: <FaTasks size={18} />,
      label: 'Ready to check',
      route: '/supervisor/ready-to-check',
      children: [
        {
          label: 'From the Researcher',
          route: '/supervisor/ready-to-check-by-researcher',
          key: navBarActiveSubCategory.SUB_NAVBAR_FROM_THE_RESEARCHER,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_VAC_BY_RES_SUPERVISOR),
        },
        {
          label: 'From the Client',
          route: '/supervisor/ready-to-check-by-client',
          key: navBarActiveSubCategory.SUB_NAVBAR_FROM_THE_CLIENT,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_VAC_BY_CLIENT_SUPERVISOR),
        },
      ],
      key: navBarActiveCategory.NAVBAR_READY_TO_CHECK,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_READYTOCHECK_SUPERVISOR),
    },
    {
      icon: <BsBasket size={18} />,
      label: 'My products',
      children: null,
      route: '/supervisor/products',
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_PRODUCTS_SUPERVISOR),
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/supervisor/users/sub-users',
      children: [{ label: 'My users', route: '/supervisor/users/sub-users' }],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_USERS_SUPERVISOR),
    },
    {
      icon: <FaRegCreditCard size={18} />,
      label: 'Finances',
      route: '/supervisor/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_PAYMENTS_SUPERVISOR),
    },
    {
      icon: <IoSettingsOutline size={18} />,
      label: 'Settings',
      children: null,
      route: '/supervisor/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_SETTINGS_SUPERVISOR),
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/supervisor/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.supervisor.SHOW_CHAT_SUPERVISOR),
    },
  ],
  [UserRole.BUYER]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      children: null,
      route: '/buyer/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_DASHBOARD_BUYER),
    },
    {
      icon: <FaClipboardList size={18} />,
      label: 'Free orders',
      route: '/buyer/free-orders',
      children: null,
      key: navBarActiveCategory.NAVBAR_FREE_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_VAC_ORDERS_BUYER),
    },
    {
      icon: <FaRegClock size={18} />,
      label: 'Pending orders',
      route: '/buyer/pending-orders',
      children: null,
      key: navBarActiveCategory.NAVBAR_PENDING_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_PENDING_ORDERS_BUYER),
    },
    {
      icon: <FaClipboardList size={18} />,
      label: 'My orders',
      route: '/buyer/my-orders',
      children: [
        {
          label: 'Not paid',
          route: '/buyer/not-paid-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NOT_PAID,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_NOT_PAID_BUYER),
        },
        {
          label: 'Ready for payment',
          route: '/buyer/ready-for-payment-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_READY_FOR_PAYMENT,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_READY_FOR_PAYMENT_BUYER),
        },
        {
          label: 'Partially paid',
          route: '/buyer/partially-paid-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_PARTIALLY_PAID,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_PARTIALLY_PAID_BUYER),
        },
        {
          label: 'Need track number',
          route: '/buyer/need-track-number-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NEED_TRACK_NUMBER,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_NEED_TRACK_NUMBER_BUYER),
        },
        {
          label: 'Inbound',
          route: '/buyer/inbound-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_INBOUND,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_INBOUND_BUYER),
        },
        {
          label: 'Confirmation required',
          route: '/buyer/confirmation-required-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CONFIRMATION_REQUIRED,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_CONFIRMATION_REQUIRED_BUYER),
        },
        {
          label: 'Closed and canceled',
          route: '/buyer/closed-and-canceled-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CLOSED_AND_CANCELED,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_CLOSED_AND_CANCELED_BUYER),
        },
        {
          label: 'All orders',
          route: '/buyer/all-orders',
          key: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_ALL_ORDERS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_ORDERS_BUYER),
        },
      ],
      key: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_MYORDERS_BUYER),
    },
    {
      icon: <BsBasket size={18} />,
      label: 'My products',
      route: '/buyer/my-products',
      children: null,
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_PRODUCTS_BUYER),
    },
    {
      icon: <CiSearch size={18} />,
      label: 'Supplier search',
      route: '/buyer/search-supplier',
      children: [
        {
          label: 'From the Supervisor',
          route: '/buyer/search-supplier-by-supervisor',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_VAC_BY_SUP_BUYER),
        },
        {
          label: 'From the Client',
          route: '/buyer/search-supplier-by-client',
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER),
        },
      ],
      key: navBarActiveCategory.NAVBAR_NEW_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_SUPSEARCH_BUYER),
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/buyer/users/sub-users',
      children: [{ label: 'My users', route: '/buyer/users/sub-users' }],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_USERS_BUYER),
    },
    {
      icon: <FaRegCreditCard size={18} />,
      label: 'Finances',
      route: '/buyer/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_PAYMENTS_BUYER),
    },
    {
      icon: <MdNotificationsActive size={18} />,
      label: 'Notifications',
      route: '/buyer/notifications/ideas-notifications',
      children: [
        {
          label: 'General notifications',
          key: navBarActiveSubCategory.SUB_NAVBAR_GENERAL_NOTIFICATIONS,
          route: '/buyer/notifications/general-notifications-view',
        },
      ],
      key: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_NOTIFICATIONS_BUYER),
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/buyer/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_CHAT_BUYER),
    },
  ],
  [UserRole.STOREKEEPER]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      children: null,
      route: '/warehouse/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_DASHBOARD_STOREKEEPER),
    },
    {
      icon: <FaTasks size={18} />,
      label: 'Tasks',
      children: [
        {
          label: 'New tasks',
          route: '/warehouse/tasks/vacant-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_VAC_TASKS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_TASKS_NEWTASKS_STOREKEEPER),
        },
        {
          label: 'My tasks',
          route: '/warehouse/tasks/my-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_MY_TASKS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_TASKS_MYTASKS_STOREKEEPER),
        },
        {
          label: 'Completed tasks',
          route: '/warehouse/tasks/completed-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_COMPLETED_TASKS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_TASKS_COMPLETTASKS_STOREKEEPER),
        },
        {
          label: 'Canceled tasks',
          route: '/warehouse/tasks/canceled-tasks',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_CANCELED_TASKS,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_TASKS_CANCELTASKS_STOREKEEPER),
        },
      ],
      route: '/warehouse/tasks',
      key: navBarActiveCategory.NAVBAR_TASKS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_MY_TASKS_STOREKEEPER),
    },
    {
      icon: <MdOutlineWarehouse size={18} />,
      label: 'My warehouse',
      route: '/warehouse/my-warehouse',
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_WAREHOUSE_STOREKEEPER),
    },
    {
      icon: <FaBoxOpen size={18} />,
      label: 'My batches',
      route: '/warehouse/batches/awaiting-batches',
      children: [
        {
          label: 'Awaiting send',
          route: '/warehouse/batches/awaiting-batches',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_AWAITING_BATCHES,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_BATCHES_AWAITINGSEND_STOREKEEPER),
        },
        {
          label: 'Sent',
          route: '/warehouse/batches/sent-batches',
          key: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BATCHES,
          checkHideBlock: user =>
            !isHaveMasterUser(user) ||
            user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_BATCHES_SENT_STOREKEEPER),
        },
      ],
      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_BATCHES_STOREKEEPER),
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/warehouse/users/sub-users',
      children: [{ label: 'My users', route: '/warehouse/users/sub-users' }],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER),
    },
    {
      icon: <FaRegCreditCard size={18} />,
      label: 'Finances',
      route: '/warehouse/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_PAYMENTS_STOREKEEPER),
    },
    {
      icon: <IoSettingsOutline size={18} />,
      label: 'Warehouse management',
      route: '/warehouse/management',
      key: navBarActiveCategory.NAVBAR_MANAGEMENT,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_MANAGEMENT_STOREKEEPER),
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/warehouse/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_CHAT_STOREKEEPER),
    },
  ],
  [UserRole.ADMIN]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      children: null,
      route: '/admin/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: <BsCurrencyExchange size={18} />,
      label: 'Commodity exchange',
      children: null,
      route: '/admin/exchange',
      key: navBarActiveCategory.NAVBAR_EXCHANGE,
      checkHideBlock: () => true,
    },
    {
      icon: <MdOutlineInventory2 size={18} />,
      label: 'Inventory',
      route: '/admin/inventory',
      children: null,
      key: navBarActiveCategory.NAVBAR_INVENTORY,
      checkHideBlock: () => true,
    },
    {
      icon: <FaClipboardList size={18} />,
      label: 'Orders',
      children: null,
      route: '/admin/orders',
      key: navBarActiveCategory.NAVBAR_ORDERS,
      checkHideBlock: () => true,
    },
    {
      icon: <MdOutlineWarehouse size={18} />,
      label: 'Warehouse',
      route: '/admin/warehouse/tasks',
      children: [
        { label: 'Tasks', route: '/admin/warehouse/tasks' },
        { label: 'Boxes', route: '/admin/warehouse/boxes' },
      ],
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: () => true,
    },
    {
      icon: <FaBoxOpen size={18} />,
      label: 'Batches',
      route: '/admin/batches/awaiting-batches',
      children: [
        {
          label: 'Awaiting send',
          route: '/admin/batches/awaiting-batches',
        },
        {
          label: 'Sent',
          route: '/admin/batches/sent-batches',
        },
      ],
      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: () => true,
    },
    {
      icon: <GrUpdate size={18} />,
      label: 'Patch notes',
      route: '/admin/updated',
      children: null,
      key: navBarActiveCategory.NAVBAR_UPDATED,
      checkHideBlock: () => true,
    },
    {
      icon: <FaRegCreditCard size={18} />,
      label: 'Finances',
      route: '/admin/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: () => true,
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/admin/users',
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: () => true,
    },
    {
      icon: <FaUserCheck size={18} />,
      label: 'User permissions',
      route: '/admin/permissions',
      key: navBarActiveCategory.NAVBAR_PERMISSIONS,
      checkHideBlock: () => true,
    },
    {
      icon: <GiCardExchange size={18} />,
      label: 'Parsing',
      route: '/admin/parsing',
      children: [
        {
          label: 'Profiles',
          route: '/admin/parsing/profiles',
        },
        {
          label: 'Requests',
          route: '/admin/parsing/requests',
        },
      ],
      key: navBarActiveCategory.NAVBAR_PARSING,
      checkHideBlock: () => true,
    },
    {
      icon: <IoSettingsOutline size={18} />,
      label: 'Settings',
      children: null,
      route: '/admin/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: () => true,
    },
    {
      icon: <VscFeedback size={18} />,
      label: 'Feedback',
      children: null,
      route: '/admin/feedback',
      key: navBarActiveCategory.NAVBAR_FEEDBACK,
      checkHideBlock: () => true,
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/admin/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: () => true,
    },
  ],
  [UserRole.MODERATOR]: [
    {
      icon: <GiInfo size={18} />,
      label: 'Dashboard',
      route: '/moderator/dashboard',
      children: null,
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: <FaShop size={18} />,
      label: 'Trading stores',
      route: '/moderator/trading-shops/stores-to-check',
      children: [
        {
          label: 'Stores to check',
          route: '/moderator/trading-shops/stores-to-check',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BUY_SHOPS,
        },
        {
          label: 'Sell the store',
          route: '/client/trading-shops/sell-shops',
          key: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS,
        },
      ],
      key: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT),
    },
    {
      icon: <FaRegAddressCard size={18} />,
      label: 'Appeals',
      route: '/moderator/appeals',
      children: null,
      key: navBarActiveCategory.NAVBAR_APPEALS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_PRODUCTS_BUYER),
    },
    {
      icon: <BsBasket size={18} />,
      label: 'My products',
      route: '/moderator/my-products',
      children: null,
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) || user?.permissions?.some(item => item === permissionsKeys.buyer.SHOW_PRODUCTS_BUYER),
    },
    {
      icon: <GrUpdate size={18} />,
      label: 'Patch notes',
      route: '/moderator/updated',
      children: null,
      key: navBarActiveCategory.NAVBAR_UPDATED,
      checkHideBlock: () => true,
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Users',
      route: '/moderator/users/sub-users',
      children: [{ label: 'My users', route: '/moderator/users/sub-users' }],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isHaveMasterUser(user) ||
        user?.permissions?.some(item => item === permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER),
    },
    {
      icon: <IoSettingsOutline size={18} />,
      label: 'Settings',
      children: null,
      route: '/moderator/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: () => true,
    },
    {
      icon: <VscFeedback size={18} />,
      label: 'Feedback',
      children: null,
      route: '/moderator/feedback',
      key: navBarActiveCategory.NAVBAR_FEEDBACK,
      checkHideBlock: () => true,
    },
    {
      icon: <LuMessagesSquare size={18} />,
      label: 'Messages',
      route: '/moderator/messages',
      children: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: () => true,
    },
  ],
}
