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

import {UserRole} from './user-roles'

export const navbarConfig = {
  [UserRole.CLIENT]: [
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
    {
      icon: ChatBubbleOutlineOutlinedIcon,
      title: 'Уведомления по заказам',
      route: '/client/orders-notifications',
      subtitles: null,
    },
  ],
  [UserRole.RESEARCHER]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/researcher/dashboard',
    },
    {icon: AssignmentIcon, title: 'Мои товары', subtitles: null, route: '/researcher/products'},
    {icon: SettingsIcon, title: 'Настройки', subtitles: null, route: '/researcher/settings'},
  ],
  [UserRole.SUPERVISOR]: [
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
  [UserRole.BUYER]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/buyer/dashboard',
    },

    {icon: InboxOutlinedIcon, title: 'Новые товары', route: '/buyer/products', subtitles: null},
    {icon: InboxOutlinedIcon, title: 'Мои товары', route: '/buyer/my-products', subtitles: null},

    {icon: Work, title: 'Мои заказы', route: '/buyer/my-orders', subtitles: null},
    {icon: AssignmentIcon, title: 'Свободные заказы', route: '/buyer/free-orders', subtitles: null},

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
  [UserRole.STOREKEEPER]: [
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
      icon: Work,
      title: 'Мои задачи',
      subtitles: null,
      route: '/warehouse/my-tasks',
    },
    {
      icon: DoneOutline,
      title: 'Выполненые задачи',
      subtitles: null,
      route: '/warehouse/completed-tasks',
    },
    {
      icon: Block,
      title: 'Отмененные задачи',
      subtitles: null,
      route: '/warehouse/canceled-tasks',
    },
    {
      icon: LocalConvenienceStore,
      title: 'Склад',
      subtitles: null,
      route: '/warehouse/boxes',
    },
  ],
  [UserRole.ADMIN]: [
    {
      icon: InfoOutlinedIcon,
      title: 'Главная страница',
      subtitles: null,
      route: '/admin/dashboard',
    },
    {
      icon: GavelIcon,
      title: 'Биржа товаров',
      route: '/admin/exchange',
      subtitles: [
        {subtitle: 'Созданные', subRoute: '/admin/exchange'},
        {subtitle: 'Новые', subRoute: '/admin/exchange'},
        {subtitle: 'Поиск поставщика', subRoute: '/admin/exchange'},
        {subtitle: 'В работе у байера', subRoute: '/admin/exchange'},
        {subtitle: 'Поставщик найден байером', subRoute: '/admin/exchange'},
        {subtitle: 'Поставщик не найден байером', subRoute: '/admin/exchange'},
        {subtitle: 'Цена выше МЗЦ', subRoute: '/admin/exchange'},
        {subtitle: 'Опубликованные', subRoute: '/admin/exchange'},
        {subtitle: 'Отклоненные', subRoute: '/admin/exchange'},
        {subtitle: 'Нет поставщика (закончено супервизором)', subRoute: '/admin/exchange'},
      ],
    },
    {icon: InboxOutlinedIcon, title: 'Инвентарь', route: '/admin/inventory', subtitles: null},
    {
      icon: AssignmentIcon,
      title: 'Заказы',
      route: '/admin/orders',
      subtitles: [
        {subtitle: 'Доступен к обработке', subRoute: '/admin/orders'},
        {subtitle: 'Закупщик взял заказ', subRoute: '/admin/orders'},
        {subtitle: 'Закупщик оплатил заказ', subRoute: '/admin/orders'},

        {subtitle: 'Выдан трек номер', subRoute: '/admin/orders'},
        {subtitle: 'Пришёл на склад', subRoute: '/admin/orders'},
        {subtitle: 'Возврат заказа', subRoute: '/admin/orders'},

        {subtitle: 'Ожидает отправки', subRoute: '/admin/orders'},
        {subtitle: 'Отправлен', subRoute: '/admin/orders'},
        {subtitle: 'Закрыт', subRoute: '/admin/orders'},
      ],
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
    },
    {
      icon: MonetizationOnOutlinedIcon,
      title: 'Финансы',
      route: '/admin/finances',
      subtitles: [
        {subtitle: 'Пополнения', subRoute: '/admin/finances'},
        // {subtitle: 'Начисления', subRoute: '/admin/finances'}, // пока можно убрать
        {subtitle: 'Списания', subRoute: '/admin/finances'},
      ],
    },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/admin/users',
    },
    {icon: SettingsIcon, title: 'Настройки', subtitles: null, route: '/admin/settings'},
  ],
}
