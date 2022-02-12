import {Block, DoneOutline, LocalConvenienceStore, Work} from '@material-ui/icons'
import AllInboxIcon from '@material-ui/icons/AllInbox'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import GavelIcon from '@material-ui/icons/Gavel'
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import PeopleIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'

import {isMasterUser} from '@utils/checks'

import {navBarActiveCategory} from './navbar-active-category'
import {UserRole} from './user-roles'

const permissionsKeys = {
  supervisor: {
    SHOW_PAYMENTS_SUPERVISOR: 'SHOW_PAYMENTS_SUPERVISOR',
    SHOW_USERS_SUPERVISOR: 'SHOW_USERS_SUPERVISOR',
    SHOW_PRODUCTS_SUPERVISOR: 'SHOW_PRODUCTS_SUPERVISOR',
    SHOW_VAC_PRODUCTS_SUPERVISOR: 'SHOW_VAC_PRODUCTS_SUPERVISOR',
    SHOW_SETTINGS_SUPERVISOR: 'SHOW_SETTINGS_SUPERVISOR',

    SHOW_VAC_BY_RES_SUPERVISOR: 'SHOW_VAC_BY_RES_SUPERVISOR',
    SHOW_VAC_BY_CLIENT_SUPERVISOR: 'SHOW_VAC_BY_CLIENT_SUPERVISOR',
  },

  buyer: {
    SHOW_PAYMENTS_BUYER: 'SHOW_PAYMENTS_BUYER',
    SHOW_USERS_BUYER: 'SHOW_USERS_BUYER',
    SHOW_VAC_ORDERS_BUYER: 'SHOW_VAC_ORDERS_BUYER',
    SHOW_ORDERS_BUYER: 'SHOW_ORDERS_BUYER',
    SHOW_PRODUCTS_BUYER: 'SHOW_PRODUCTS_BUYER',
    SHOW_VAC_BY_CLIENT_BUYER: 'SHOW_VAC_BY_CLIENT_BUYER',
    SHOW_VAC_BY_SUP_BUYER: 'SHOW_VAC_BY_SUP_BUYER',
  },
  storekeeper: {
    SHOW_PAYMENTS_STOREKEEPER: 'SHOW_PAYMENTS_STOREKEEPER',
    SHOW_USERS_STOREKEEPER: 'SHOW_USERS_STOREKEEPER',
    SHOW_BATCHES_STOREKEEPER: 'SHOW_BATCHES_STOREKEEPER',
    SHOW_CANCELED_TASKS_STOREKEEPER: 'SHOW_CANCELED_TASKS_STOREKEEPER',
    SHOW_COMPLETED_TASKS_STOREKEEPER: 'SHOW_COMPLETED_TASKS_STOREKEEPER',
    SHOW_WAREHOUSE_STOREKEEPER: 'SHOW_WAREHOUSE_STOREKEEPER',
    SHOW_MY_TASKS_STOREKEEPER: 'SHOW_MY_TASKS_STOREKEEPER',
    SHOW_VAC_TASKS_STOREKEEPER: 'SHOW_VAC_TASKS_STOREKEEPER',
  },
  client: {
    SHOW_VACANT_CLIENT: 'SHOW_VACANT_CLIENT',
    SHOW_INVENTORY_CLIENT: 'SHOW_INVENTORY_CLIENT',
    SHOW_REQUESTS_CLIENT: 'SHOW_REQUESTS_CLIENT',
    SHOW_ORDERS_CLIENT: 'SHOW_ORDERS_CLIENT',
    SHOW_WAREHOUSE_CLIENT: 'SHOW_WAREHOUSE_CLIENT',
    SHOW_BATCHES_CLIENT: 'SHOW_BATCHES_CLIENT',
    SHOW_USERS_CLIENT: 'SHOW_USERS_CLIENT',
    SHOW_INTEGRATIONS_CLIENT: 'SHOW_INTEGRATIONS_CLIENT',
    SHOW_USER_SETTINGS_CLIENT: 'SHOW_USER_SETTINGS_CLIENT',
    SHOW_PAYMENTS_CLIENT: 'SHOW_PAYMENTS_CLIENT',
    SHOW_NOTIFICATIONS_CLIENT: 'SHOW_NOTIFICATIONS_CLIENT',
  },
  researcher: {
    SHOW_PAYMENTS_RESEARCHER: 'SHOW_PAYMENTS_RESEARCHER',
    SHOW_SETTINGS_RESEARCHER: 'SHOW_SETTINGS_RESEARCHER',
    SHOW_USERS_RESEARCHER: 'SHOW_USERS_RESEARCHER',
    SHOW_VAC_REQUESTS_RESEARCHER: 'SHOW_VAC_REQUESTS_RESEARCHER',
    SHOW_REQUESTS_RESEARCHER: 'SHOW_REQUESTS_RESEARCHER',
    SHOW_PRODUCTS_RESEARCHER: 'SHOW_PRODUCTS_RESEARCHER',
  },
}

export const navbarConfig = {
  [UserRole.CLIENT]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      route: '/client/dashboard',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: GavelIcon,
      title: 'Биржа товаров',
      route: '/client/exchange',
      subtitles: [
        {subtitle: 'Биржа вилок', subRoute: '/client/exchange'},
        {subtitle: 'Private Label', subRoute: '/client/exchange/private-label'},
      ],
      key: navBarActiveCategory.NAVBAR_EXCHANGE,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_VACANT_CLIENT),
    },
    {
      icon: InboxOutlinedIcon,
      title: 'Инвентарь',
      route: '/client/inventory',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_INVENTORY,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_INVENTORY_CLIENT),
    },
    {
      icon: Work,
      title: 'Заявки',
      route: '/client/exchange/requests/my',
      subtitles: [
        // {subtitle: 'На поиск продукта', subRoute: '/client/exchange/requests/products'},
        // {subtitle: 'На поиск ниши', subRoute: '/client/exchange/requests/niches'},
        {subtitle: 'Мои заявки', subRoute: '/client/exchange/requests/my'},
        {subtitle: 'Вакантные заявки', subRoute: '/client/exchange/requests/vacant'},
      ],
      key: navBarActiveCategory.NAVBAR_REQUESTS,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_REQUESTS_CLIENT),
    },
    {
      icon: AssignmentIcon,
      title: 'Мои заказы',
      route: '/client/orders',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MY_ORDERS,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_ORDERS_CLIENT),
    },
    {
      icon: ArchiveOutlinedIcon,
      title: 'Мой склад',
      route: '/client/warehouse',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_WAREHOUSE_CLIENT),
    },
    {
      icon: AllInboxIcon,
      title: 'Мои отправления',
      route: '/client/batches',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_BATCHES_CLIENT),
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/client/users/sub-users',
      subtitles: [{subtitle: 'Мои пользователи', subRoute: '/client/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_USERS_CLIENT),
    },

    {
      icon: LocalConvenienceStore,
      title: 'Mагазины',
      route: '/client/shops',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_SHOPS,
      checkHideBlock: () => true,
    },

    {
      icon: SettingsIcon,
      title: 'Интеграции',
      route: '/client/integrations/daily',
      subtitles: [
        {subtitle: 'Отчет со склада', subRoute: '/client/integrations/daily'},
        {subtitle: 'Дашборд по товарам/дням', subRoute: '/client/integrations/last-30-day'},
      ],
      key: navBarActiveCategory.NAVBAR_INTEGRATIONS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_INTEGRATIONS_CLIENT),
    },
    {
      icon: SettingsIcon,
      title: 'Настройки',
      route: '/client/settings',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_USER_SETTINGS_CLIENT),
    },
    {
      icon: ChatBubbleOutlineOutlinedIcon,
      title: 'Сообщения',
      route: '/client/messages',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MESSAGES,
      checkHideBlock: () => true,
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/client/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_PAYMENTS_CLIENT),
    },
    {
      icon: ChatBubbleOutlineOutlinedIcon,
      title: 'Уведомления по заказам',
      route: '/client/orders-notifications',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.client.SHOW_NOTIFICATIONS_CLIENT),
    },
  ],
  [UserRole.RESEARCHER]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/researcher/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: AssignmentIcon,
      title: 'Мои товары',
      subtitles: null,
      route: '/researcher/products',
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_PRODUCTS_RESEARCHER),
    },
    {
      icon: AssignmentIcon,
      title: 'Заявки в работе',
      route: '/researcher/my-requests/products',
      subtitles: [
        {subtitle: 'На поиск продукта', subRoute: '/researcher/my-requests/products'},
        {subtitle: 'На поиск ниши', subRoute: '/researcher/my-requests/niches'},
        {subtitle: 'Универсальные', subRoute: '/researcher/my-requests/custom'},
      ],
      key: navBarActiveCategory.NAVBAR_MY_REQUESTS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_REQUESTS_RESEARCHER),
    },
    {
      icon: AssignmentIcon,
      title: 'Вакантные заявки',
      route: '/researcher/requests/products',
      subtitles: [
        {subtitle: 'На поиск продукта', subRoute: '/researcher/requests/products'},
        {subtitle: 'На поиск ниши', subRoute: '/researcher/requests/niches'},
        {subtitle: 'Универсальные', subRoute: '/researcher/requests/custom'},
      ],
      key: navBarActiveCategory.NAVBAR_VACANT_REQUESTS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_VAC_REQUESTS_RESEARCHER),
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/researcher/users/sub-users',
      subtitles: [{subtitle: 'Мои пользователи', subRoute: '/researcher/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_USERS_RESEARCHER),
    },
    {
      icon: SettingsIcon,
      title: 'Настройки',
      subtitles: null,
      route: '/researcher/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_SETTINGS_RESEARCHER),
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/researcher/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.researcher.SHOW_PAYMENTS_RESEARCHER),
    },
  ],
  [UserRole.FREELANCER]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/freelancer/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    // {
    //   icon: AssignmentIcon,
    //   title: 'Заявки в работе',
    //   route: '/freelancer/my-requests/products',
    //   subtitles: [
    //     {subtitle: 'На поиск продукта', subRoute: '/freelancer/my-requests/products'},
    //     {subtitle: 'На поиск ниши', subRoute: '/freelancer/my-requests/niches'},
    //     {subtitle: 'Универсальные', subRoute: '/freelancer/my-requests/custom'},
    //   ],
    //   key: navBarActiveCategory.NAVBAR_MY_REQUESTS,
    //   checkHideBlock: user => !isMasterUser(user) && !noPermissionsUser(user),
    // },
    // {
    //   icon: AssignmentIcon,
    //   title: 'Вакантные заявки',
    //   route: '/freelancer/requests/products',
    //   subtitles: [
    //     {subtitle: 'На поиск продукта', subRoute: '/freelancer/requests/products'},
    //     {subtitle: 'На поиск ниши', subRoute: '/freelancer/requests/niches'},
    //     {subtitle: 'Универсальные', subRoute: '/freelancer/requests/custom'},
    //   ],
    //   key: navBarActiveCategory.NAVBAR_VACANT_REQUESTS,
    //   checkHideBlock: () => true,
    // },

    {
      icon: Work,
      title: 'Заявки',
      route: '/freelancer/requests',
      subtitles: [
        {subtitle: 'Вакантные заявки', subRoute: '/freelancer/requests'},
        {subtitle: 'Заявки в работе', subRoute: '/freelancer/requests-in-work'},
        {subtitle: 'Мои заявки', subRoute: '/freelancer/my-requests'},
      ],
      key: navBarActiveCategory.NAVBAR_REQUESTS,
      checkHideBlock: user => !isMasterUser(user),
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/freelancer/users/sub-users',
      subtitles: [{subtitle: 'Мои пользователи', subRoute: '/freelancer/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: () => true,
    },

    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/freelancer/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: () => true,
    },
  ],
  [UserRole.SUPERVISOR]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/supervisor/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: AssignmentIcon,
      title: 'Готовые к проверке',
      route: '/supervisor/ready-to-check',
      subtitles: [
        {
          subtitle: 'От Ресерчера',
          subRoute: '/supervisor/ready-to-check',
          checkHideSubBlock: user =>
            !isMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_VAC_BY_RES_SUPERVISOR),
        },
        {
          subtitle: 'От Клиента',
          subRoute: '/supervisor/ready-to-check-by-client',
          checkHideSubBlock: user =>
            !isMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_VAC_BY_CLIENT_SUPERVISOR),
        },
      ],
      key: navBarActiveCategory.NAVBAR_READY_TO_CHECK,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(
          item =>
            item.key === permissionsKeys.supervisor.SHOW_VAC_BY_RES_SUPERVISOR ||
            permissionsKeys.supervisor.SHOW_VAC_BY_CLIENT_SUPERVISOR,
        ),
    },
    {
      icon: InboxOutlinedIcon,
      title: 'Мои товары',
      subtitles: null,
      route: '/supervisor/products',
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_PRODUCTS_SUPERVISOR),
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/supervisor/users/sub-users',
      subtitles: [{subtitle: 'Мои пользователи', subRoute: '/supervisor/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_USERS_SUPERVISOR),
    },
    {
      icon: SettingsIcon,
      title: 'Настройки',
      subtitles: null,
      route: '/supervisor/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_SETTINGS_SUPERVISOR),
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/supervisor/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.supervisor.SHOW_PAYMENTS_SUPERVISOR),
    },
  ],
  [UserRole.BUYER]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/buyer/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },

    {
      icon: InboxOutlinedIcon,
      title: 'Поиск поставщика',
      route: '/buyer/search-supplier-by-supervisor',
      subtitles: [
        {
          subtitle: 'От Супервайзера',
          subRoute: '/buyer/search-supplier-by-supervisor',
          checkHideSubBlock: user =>
            !isMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_VAC_BY_SUP_BUYER),
        },
        {
          subtitle: 'От Клиента',
          subRoute: '/buyer/search-supplier-by-client',
          checkHideSubBlock: user =>
            !isMasterUser(user) ||
            user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER),
        },
      ],
      key: navBarActiveCategory.NAVBAR_NEW_PRODUCTS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(
          item =>
            item.key === permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER || permissionsKeys.buyer.SHOW_VAC_BY_SUP_BUYER,
        ),
    },

    {
      icon: InboxOutlinedIcon,
      title: 'Мои товары',
      route: '/buyer/my-products',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_PRODUCTS_BUYER),
    },

    {
      icon: Work,
      title: 'Мои заказы',
      route: '/buyer/my-orders',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MY_ORDERS,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_ORDERS_BUYER),
    },
    {
      icon: AssignmentIcon,
      title: 'Свободные заказы',
      route: '/buyer/free-orders',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_FREE_ORDERS,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_VAC_ORDERS_BUYER),
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/buyer/users/sub-users',
      subtitles: [{subtitle: 'Мои пользователи', subRoute: '/buyer/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_USERS_BUYER),
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/buyer/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isMasterUser(user) || user?.permissions.some(item => item.key === permissionsKeys.buyer.SHOW_PAYMENTS_BUYER),
    },
  ],
  [UserRole.STOREKEEPER]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/warehouse/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: AssignmentIcon,
      title: 'Вакантные задачи',
      subtitles: null,
      route: '/warehouse/vacant-tasks',
      key: navBarActiveCategory.NAVBAR_VACANT_TASKS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_VAC_TASKS_STOREKEEPER),
    },
    {
      icon: Work,
      title: 'Мои задачи',
      subtitles: null,
      route: '/warehouse/my-tasks',
      key: navBarActiveCategory.NAVBAR_MY_TASKS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_MY_TASKS_STOREKEEPER),
    },

    {
      icon: DoneOutline,
      title: 'Выполненые задачи',
      subtitles: null,
      route: '/warehouse/completed-tasks',
      key: navBarActiveCategory.NAVBAR_COMPLETED_TASKS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_COMPLETED_TASKS_STOREKEEPER),
    },
    {
      icon: Block,
      title: 'Отмененные задачи',
      subtitles: null,
      route: '/warehouse/canceled-tasks',
      key: navBarActiveCategory.NAVBAR_CANCELED_TASKS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_CANCELED_TASKS_STOREKEEPER),
    },

    {
      icon: ArchiveOutlinedIcon,
      title: 'Мой склад',
      subtitles: null,
      route: '/warehouse/my-warehouse',
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_WAREHOUSE_STOREKEEPER),
    },

    {
      icon: LocalConvenienceStore,
      title: 'Отправления',
      subtitles: null,
      route: '/warehouse/boxes',
      key: navBarActiveCategory.NAVBAR_BATCHES,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_BATCHES_STOREKEEPER),
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/warehouse/users/sub-users',
      subtitles: [{subtitle: 'Мои пользователи', subRoute: '/warehouse/users/sub-users'}],
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER),
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/warehouse/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: user =>
        !isMasterUser(user) ||
        user?.permissions.some(item => item.key === permissionsKeys.storekeeper.SHOW_PAYMENTS_STOREKEEPER),
    },
  ],
  [UserRole.ADMIN]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/admin/dashboard',
      key: navBarActiveCategory.NAVBAR_DASHBOARD,
      checkHideBlock: () => true,
    },
    {
      icon: GavelIcon,
      title: 'Биржа товаров',
      subtitles: null,
      route: '/admin/exchange',
      key: navBarActiveCategory.NAVBAR_EXCHANGE,
      checkHideBlock: () => true,
    },

    {
      icon: InboxOutlinedIcon,
      title: 'Инвентарь',
      route: '/admin/inventory',
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_INVENTORY,
      checkHideBlock: () => true,
    },

    {
      icon: AssignmentIcon,
      title: 'Заказы',
      subtitles: null,
      route: '/admin/orders',
      key: navBarActiveCategory.NAVBAR_ORDERS,
      checkHideBlock: () => true,
    },

    {
      icon: ArchiveOutlinedIcon,
      title: 'Склад',
      route: '/admin/warehouse/tasks',
      subtitles: [
        {subtitle: 'Задачи', subRoute: '/admin/warehouse/tasks'},
        {subtitle: 'Коробки', subRoute: '/admin/warehouse/boxes'},
        {subtitle: 'Партии', subRoute: '/admin/warehouse/batches'},
      ],
      key: navBarActiveCategory.NAVBAR_WAREHOUSE,
      checkHideBlock: () => true,
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/admin/finances',
      key: navBarActiveCategory.NAVBAR_FINANCES,
      checkHideBlock: () => true,
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/admin/users',
      key: navBarActiveCategory.NAVBAR_USERS,
      checkHideBlock: () => true,
    },

    {
      icon: PeopleIcon,
      title: 'Разрешения пользователей',
      route: '/admin/permissions',
      key: navBarActiveCategory.NAVBAR_PERMISSIONS,
      checkHideBlock: () => true,
    },
    {
      icon: SettingsIcon,
      title: 'Настройки',
      subtitles: null,
      route: '/admin/settings',
      key: navBarActiveCategory.NAVBAR_SETTINGS,
      checkHideBlock: () => true,
    },
  ],
}
