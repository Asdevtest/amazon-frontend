export const inventorySection = {
  title: 'Инвентарь',
  items: [
    {value: 7, title: 'Товаров в инвентаре', color: '#20a8d8'},
    {value: 5, title: 'Общая стоимость склада', color: '#63c2de'},
    {value: 0, title: 'Товаров с повторной закупкой', color: '#4dbd74'},
  ],
}

export const ordersSection = {
  title: 'Заказы',
  items: [
    {value: 2, title: 'Неоплаченные заказы', color: '#ffc107'},
    {value: 0, title: 'Оплаченные заказы', color: '#f86c6b'},
    {value: 24, title: 'Отмененные заказы', color: '#20a8d8'},
  ],
}
export const exchangeSection = {
  title: 'Товары',
  items: [
    {value: 53, title: 'Продано товаров на бирже', color: '#63c2de'},
    {value: 1, title: 'Начислено ресерчерам', color: '#4dbd74'},
    {value: 17, title: 'Споров по товарам', color: '#f86c6b'},
  ],
}

export const clientUsername = 'Client'
export const clientBalance = '$4 012'

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

export const userPopperItems = {
  client: [
    {label: 'Ваш счёт $4 352', color: '#5a6169', route: null},
    {label: 'Пополнить баланс', color: '#5a6169', route: null},
    {label: 'Сообщения', color: '#5a6169', route: null},
    {label: 'Профиль', color: '#5a6169', route: '/user'},
    {label: 'Выйти', color: '#d22323', route: '/auth'},
  ],
  buyer: [
    {label: 'Ваш счёт $4 352', color: '#5a6169', route: null},
    {label: 'Пополнить баланс', color: '#5a6169', route: null},
    {label: 'Сообщения', color: '#5a6169', route: null},
    {label: 'Профиль', color: '#5a6169', route: '/buyer/user'},
    {label: 'Выйти', color: '#d22323', route: '/auth'},
  ],
  freelancer: [
    {label: 'Ваш счёт $4 352', color: '#5a6169', route: null},
    {label: 'Пополнить баланс', color: '#5a6169', route: null},
    {label: 'Сообщения', color: '#5a6169', route: null},
    {label: 'Профиль', color: '#5a6169', route: null},
    {label: 'Выйти', color: '#d22323', route: '/auth'},
  ],
  supervisor: [
    {label: 'Ваш счёт $4 352', color: '#5a6169', route: null},
    {label: 'Пополнить баланс', color: '#5a6169', route: null},
    {label: 'Сообщения', color: '#5a6169', route: null},
    {label: 'Профиль', color: '#5a6169', route: null},
    {label: 'Выйти', color: '#d22323', route: '/auth'},
  ],
}
export const userRoutes = {
  client: {
    0: null,
    1: null,
    2: null,
    3: '/user',
    4: 'auth',
  },
  buyer: {},
  freelancer: {},
}

export const CATEGORIES_LIST = {
  client: [
    {icon: InfoOutlinedIcon, title: 'Главная страница', subtitles: null},
    {
      icon: GavelIcon,
      title: 'Биржа товаров',
      subtitles: ['Биржа вилок', 'Private Label', 'Мои заявки'],
    },
    {icon: InboxOutlinedIcon, title: 'Инвентарь', subtitles: null},
    {icon: AssignmentIcon, title: 'Мои заказы', subtitles: null},
    {icon: ArchiveOutlinedIcon, title: 'Мой склад'},
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      subtitles: ['Мой профиль', 'Мои пользователи'],
    },
    {icon: SettingsIcon, title: 'Настройки', subtitles: null},
    {icon: ChatBubbleOutlineOutlinedIcon, title: 'Сообщения', subtitles: null},
    {icon: MonetizationOnOutlinedIcon, title: 'Финансы', subtitles: null},
    {icon: InfoOutlinedIcon, title: 'Продукт', subtitles: null},
  ],
  freelancer: [
    {icon: InfoOutlinedIcon, title: 'Главная страница', subtitles: null},
    {icon: AssignmentIcon, title: 'Мои заказы', subtitles: null},
    {icon: SettingsIcon, title: 'Настройки', subtitles: null},
  ],
  supervisor: [
    {icon: InfoOutlinedIcon, title: 'Главная страница', subtitles: null},
    {icon: AssignmentIcon, title: 'Готовые к проверке', subtitles: null},
    {icon: InboxOutlinedIcon, title: 'Мои товары', subtitles: null},
    {icon: SettingsIcon, title: 'Настройки', subtitles: null},
  ],
  buyer: [
    {icon: InboxOutlinedIcon, title: 'Товары', subtitles: null},
    {icon: InboxOutlinedIcon, title: 'Мои товары', subtitles: null},
    {icon: AssignmentIcon, title: 'Заказы', subtitles: ['Мои заказы', 'Свободные заказы']},
    {icon: ArchiveOutlinedIcon, title: 'Мой склад', subtitles: null},
    {icon: AllInboxIcon, title: 'Партии товаров', subtitles: null},
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      subtitles: ['Мой профиль', 'Мои пользователи'],
    },
  ],
  others: [
    {icon: InfoOutlinedIcon, title: 'Аутентификация', subtitles: null},
    {icon: InfoOutlinedIcon, title: 'Регистрация', subtitles: null},
  ],
}

export const INVENTORY_CARD_LIST = [
  {count: 7, label: 'Товаров в инвентаре', timer: null},
  {count: 45, label: 'Товаров купленных на бирже', timer: '59:03'},
  {count: 23, label: 'Товаров добавлено', timer: null},
  {count: 20, label: 'Заказов оформлено', timer: null},
  {count: 420, label: 'Куплено за 30 дней', timer: null},
]