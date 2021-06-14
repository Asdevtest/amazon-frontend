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

import {userRole} from './user-roles'

export const navbarConfig = {
  [userRole.CLIENT]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      route: '/client/dashboard',
      subtitles: null,
    },
    {
      icon: GavelIcon,
      title: 'Биржа товаров',
      route: '/client/exchange',
      subtitles: [
        {subtitle: 'Биржа вилок', subRoute: '/client/exchange'},
        {subtitle: 'Private Label', subRoute: '/client/exchange/private-label'},
        {subtitle: 'Мои заявки', subRoute: '/client/exchange/requests'},
      ],
    },
    {icon: InboxOutlinedIcon, title: 'Инвентарь', route: '/client/inventory', subtitles: null},
    {icon: AssignmentIcon, title: 'Мои заказы', route: '/client/orders', subtitles: null},
    {icon: ArchiveOutlinedIcon, title: 'Мой склад', route: '/client/warehouse', subtitles: null},
    {icon: AllInboxIcon, title: 'Мои отправления', route: '/client/batches', subtitles: null},
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/client/users/user-profile',
      subtitles: [
        {subtitle: 'Мой профиль', subRoute: '/client/users/user-profile'},
        {subtitle: 'Мои пользователи', subRoute: '/client/users/sub-users'},
      ],
    },
    {icon: SettingsIcon, title: 'Настройки', route: '/client/settings', subtitles: null},
    {
      icon: ChatBubbleOutlineOutlinedIcon,
      title: 'Сообщения',
      route: '/client/messages',
      subtitles: null,
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/client/finances',
      subtitles: null,
    },
  ],
  [userRole.RESEARCHER]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/researcher/dashboard',
    },
    {icon: AssignmentIcon, title: 'Мои заказы', subtitles: null, route: '/researcher/products'},
    {icon: SettingsIcon, title: 'Настройки', subtitles: null, route: '/researcher/settings'},
  ],
  [userRole.SUPERVISOR]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/supervisor/dashboard',
    },
    {
      icon: AssignmentIcon,
      title: 'Готовые к проверке',
      subtitles: null,
      route: '/supervisor/ready-to-check',
    },
    {
      icon: InboxOutlinedIcon,
      title: 'Мои товары',
      subtitles: null,
      route: '/supervisor/products',
    },
    {icon: SettingsIcon, title: 'Настройки', subtitles: null, route: '/supervisor/settings'},
  ],
  [userRole.BUYER]: [
    {icon: InboxOutlinedIcon, title: 'Товары', route: '/buyer/products', subtitles: null},
    {icon: InboxOutlinedIcon, title: 'Мои товары', route: '/buyer/my-products', subtitles: null},
    {
      icon: AssignmentIcon,
      title: 'Заказы',
      route: '/buyer/orders/my-orders',
      subtitles: [
        {subtitle: 'Мои заказы', subRoute: '/buyer/orders/my-orders'},
        {subtitle: 'Свободные заказы', subRoute: '/buyer/orders/free-orders'},
      ],
    },
    {icon: ArchiveOutlinedIcon, title: 'Мой склад', subtitles: null, route: '/buyer/warehouse'},
    {icon: AllInboxIcon, title: 'Партии товаров', route: '/buyer/batches', subtitles: null},
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/buyer/users/user-profile',
      subtitles: [
        {subtitle: 'Мой профиль', subRoute: '/buyer/users/user-profile'},
        {subtitle: 'Мои пользователи', subRoute: '/buyer/users/sub-users'},
      ],
    },
  ],
  [userRole.WAREHOUSE]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/warehouse/dashboard',
    },
    {
      icon: AssignmentIcon,
      title: 'Вакантные задачи',
      subtitles: null,
      route: '/warehouse/vacant-tasks',
    },
    {
      icon: AssignmentIcon,
      title: 'Выполненые задачи',
      subtitles: null,
      route: '/warehouse/completed-tasks',
    },
  ],
}
