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

export const categoriesList = {
  client: [
    {icon: InfoOutlinedIcon, title: 'Главная страница', route: '/dashboard', subtitles: null},
    {
      icon: GavelIcon,
      title: 'Биржа товаров',
      route: '/exchange',
      subtitles: [
        {subtitle: 'Биржа вилок', subRoute: '/exchange'},
        {subtitle: 'Private Label', subRoute: '/exchange/private-label'},
        {subtitle: 'Мои заявки', subRoute: '/exchange/requests'},
      ],
    },
    {icon: InboxOutlinedIcon, title: 'Инвентарь', route: '/inventory', subtitles: null},
    {icon: AssignmentIcon, title: 'Мои заказы', route: '/orders', subtitles: null},
    {icon: ArchiveOutlinedIcon, title: 'Мой склад', route: '/warehouse', subtitles: null},
    {icon: AllInboxIcon, title: 'Мои отправления', route: '/batches', subtitles: null},
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      route: '/user',
      subtitles: [
        {subtitle: 'Мой профиль', subRoute: '/user'},
        {subtitle: 'Мои пользователи', subRoute: '/user/subusers'},
      ],
    },
    {icon: SettingsIcon, title: 'Настройки', route: '/settings', subtitles: null},
    {icon: ChatBubbleOutlineOutlinedIcon, title: 'Сообщения', route: '/messages', subtitles: null},
    {icon: MonetizationOnOutlinedIcon, title: 'Финансы', route: '/finances', subtitles: null},
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
    {icon: PeopleIcon, title: 'Пользователи', subtitles: ['Мой профиль', 'Мои пользователи']},
  ],
}
