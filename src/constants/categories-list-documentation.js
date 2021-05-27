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
