import AllInboxIcon from '@material-ui/icons/AllInbox';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import GavelIcon from '@material-ui/icons/Gavel';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

export const inventorySection = {
  title: 'Инвентарь',
  items: [
    { value: 7, title: 'Товаров в инвентаре', color: '#20a8d8' },
    { value: 5, title: 'Общая стоимость склада', color: '#63c2de' },
    { value: 0, title: 'Товаров с повторной закупкой', color: '#4dbd74' }
  ]
};

export const ordersSection = {
  title: 'Заказы',
  items: [
    { value: 2, title: 'Неоплаченные заказы', color: '#ffc107' },
    { value: 0, title: 'Оплаченные заказы', color: '#f86c6b' },
    { value: 24, title: 'Отмененные заказы', color: '#20a8d8' }
  ]
};
export const exchangeSection = {
  title: 'Товары',
  items: [
    { value: 53, title: 'Продано товаров на бирже', color: '#63c2de' },
    { value: 1, title: 'Начислено ресерчерам', color: '#4dbd74' },
    { value: 17, title: 'Споров по товарам', color: '#f86c6b' }
  ]
};

export const clientUsername = 'Client';
export const clientBalance = '$4 012';

import categoryImgBeautyAndPersonalCare from '@components/product/assets/beautyAndPersonalCare.jpg';
import categoryImgHealthHouseholdAndBabyCare from '@components/product/assets/healthHouseholdAndBabyCare.jpg';
import categoryImgHomeAndKitchen from '@components/product/assets/homeAndKitchen.jpg';
import categoryImgSportsAndOutdoors from '@components/product/assets/sportsAndOutdoors.jpg';
import categoryImgToysAndGames from '@components/product/assets/toysAndGames.jpg';

const PRODUCT_IMAGES = [
  categoryImgHomeAndKitchen,
  categoryImgSportsAndOutdoors,
  categoryImgToysAndGames,
  categoryImgHealthHouseholdAndBabyCare,
  categoryImgBeautyAndPersonalCare
];

export const userPopperItems = {
  client: [
    { label: 'Ваш счёт $4 352', color: '#5a6169', route: null },
    { label: 'Пополнить баланс', color: '#5a6169', route: null },
    { label: 'Сообщения', color: '#5a6169', route: null },
    { label: 'Профиль', color: '#5a6169', route: '/user' },
    { label: 'Выйти', color: '#d22323', route: '/auth' }
  ],
  buyer: [
    { label: 'Ваш счёт $4 352', color: '#5a6169', route: null },
    { label: 'Пополнить баланс', color: '#5a6169', route: null },
    { label: 'Сообщения', color: '#5a6169', route: null },
    { label: 'Профиль', color: '#5a6169', route: '/buyer/user' },
    { label: 'Выйти', color: '#d22323', route: '/auth' }
  ],
  freelancer: [
    { label: 'Ваш счёт $4 352', color: '#5a6169', route: null },
    { label: 'Пополнить баланс', color: '#5a6169', route: null },
    { label: 'Сообщения', color: '#5a6169', route: null },
    { label: 'Профиль', color: '#5a6169', route: null },
    { label: 'Выйти', color: '#d22323', route: '/auth' }
  ],
  supervisor: [
    { label: 'Ваш счёт $4 352', color: '#5a6169', route: null },
    { label: 'Пополнить баланс', color: '#5a6169', route: null },
    { label: 'Сообщения', color: '#5a6169', route: null },
    { label: 'Профиль', color: '#5a6169', route: null },
    { label: 'Выйти', color: '#d22323', route: '/auth' }
  ]
};
export const userRoutes = {
  client: {
    0: null,
    1: null,
    2: null,
    3: '/user',
    4: 'auth'
  },
  buyer: {},
  freelancer: {}
};

export const CATEGORIES_LIST = {
  client: [
    { icon: InfoOutlinedIcon, title: 'Главная страница', subtitles: null },
    {
      icon: GavelIcon,
      title: 'Биржа товаров',
      subtitles: [ 'Биржа вилок', 'Private Label', 'Мои заявки' ]
    },
    { icon: InboxOutlinedIcon, title: 'Инвентарь', subtitles: null },
    { icon: AssignmentIcon, title: 'Мои заказы', subtitles: null },
    { icon: ArchiveOutlinedIcon, title: 'Мой склад' },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      subtitles: [ 'Мой профиль', 'Мои пользователи' ]
    },
    { icon: SettingsIcon, title: 'Настройки', subtitles: null },
    { icon: ChatBubbleOutlineOutlinedIcon, title: 'Сообщения', subtitles: null },
    { icon: MonetizationOnOutlinedIcon, title: 'Финансы', subtitles: null },
    { icon: InfoOutlinedIcon, title: 'Продукт', subtitles: null }
  ],
  freelancer: [
    { icon: InfoOutlinedIcon, title: 'Главная страница', subtitles: null },
    { icon: AssignmentIcon, title: 'Мои заказы', subtitles: null },
    { icon: SettingsIcon, title: 'Настройки', subtitles: null }
  ],
  supervisor: [
    { icon: InfoOutlinedIcon, title: 'Главная страница', subtitles: null },
    { icon: AssignmentIcon, title: 'Готовые к проверке', subtitles: null },
    { icon: InboxOutlinedIcon, title: 'Мои товары', subtitles: null },
    { icon: SettingsIcon, title: 'Настройки', subtitles: null }
  ],
  buyer: [
    { icon: InboxOutlinedIcon, title: 'Товары', subtitles: null },
    { icon: InboxOutlinedIcon, title: 'Мои товары', subtitles: null },
    { icon: AssignmentIcon, title: 'Заказы', subtitles: [ 'Мои заказы', 'Свободные заказы' ] },
    { icon: ArchiveOutlinedIcon, title: 'Мой склад', subtitles: null },
    { icon: AllInboxIcon, title: 'Партии товаров', subtitles: null },
    {
      icon: PeopleIcon,
      title: 'Пользователи',
      subtitles: [ 'Мой профиль', 'Мои пользователи' ]
    }
  ],
  others: [
    { icon: InfoOutlinedIcon, title: 'Аутентификация', subtitles: null },
    { icon: InfoOutlinedIcon, title: 'Регистрация', subtitles: null }
  ]
};

export const INVENTORY_CARD_LIST = [
  { count: 7, label: 'Товаров в инвентаре', timer: null },
  { count: 45, label: 'Товаров купленных на бирже', timer: '59:03' },
  { count: 23, label: 'Товаров добавлено', timer: null },
  { count: 20, label: 'Заказов оформлено', timer: null },
  { count: 420, label: 'Куплено за 30 дней', timer: null }
];

export const PRODUCT_INITIAL_PRODUCT = {
  images: PRODUCT_IMAGES,
  csCode:
    'Leaf Style Door Stopper Set - Silicone Rubber Stoppers Colorful Door Stop Wedge Cute Finger Guard Door Stoppers with Silicone Holders Window / Door Stopper for Home and Office',
  asin: 'B07RKM1PSD',
  linkAmazon: 'https://www.amazon.com/dp/B07RKM1PSD',
  fba: true,
  bsr: 23.309,
  buyBoxPrice: 5.99,
  width: 5.2756,
  height: 7.0472,
  length: 1.7717,
  weight: 2.5,
  minPrice: 0.541,
  supplier: 5,
  express: true,
  maxDeliveryPrice: 0.6512,
  refferalFee: 0.8894,
  fbaFee: 5.02,
  totalFba: 5.02,
  recConsignmentQty: 10,
  revenue: 10.412,
  margin: 12,
  status: 'status',
  summary: 'some summary',
  description:
    'Product information Size:Leaf Technical Details Manufacturer HYQO Brand HYQO Item Weight 4.7 ounces Package Dimensions 7.05 x 5.28 x 1.77 inches Color Green, Yellow, Blue, Brown Material Type Silicone Size Leaf Manufacturer Part Number Leaf Additional Information ASIN B08CH6J8NF Customer Reviews 4.1 out of 5 stars 69 ratings 4.1 out of 5 stars Best Sellers Rank #23,309 in Office Products (See Top 100 in Office Products) #173 in Door Stops Date First Available July 7, 2020 Warranty & Support Product Warranty: For warranty information about this product, please click here Feedback Would you like to tell us about a lower price?',
  commentManager: "Manager's comment",
  commentSupervisor: "Supervisor's comment",
  commentBuyer: "Buyer's comment"
};
export const PRODUCT_INITIAL_SUPPLIERS = [
  {
    name: 'Jakki Chan',
    link: 'alibaba.com',
    price: 10.49,
    deliveryPrice: 4.99,
    qty: 400,
    minQty: 100,
    comment: 'Делает скидку если слать поцелуи'
  },
  {
    name: 'Jakki No Chan',
    link: 'not-alibaba.com',
    price: 7.88,
    deliveryPrice: 2.88,
    qty: 888,
    minQty: 10,
    comment: 'Не делает скидку если слать поцелуи'
  }
];
export const PRODUCT_EMPTY_SUPPLIERS = {
  name: '',
  link: '',
  price: 0,
  deliveryPrice: 0,
  qty: 0,
  minQty: 0,
  comment: ''
};
