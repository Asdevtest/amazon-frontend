export const SUPERVISOR_PRODUCTS_HEAD_CELLS = [
  {id: 'asin', align: 'center', disablePadding: true, label: 'ASIN'},
  {id: 'price', align: 'right', disablePadding: false, label: 'Price'},
  {id: 'fees', align: 'left', disablePadding: false, label: 'Fees & Net'},
  {id: 'rank', align: 'right', disablePadding: false, label: 'Rank'},
  {id: 'rating', align: 'center', disablePadding: false, label: 'Rating'},
  {id: 'sales', align: 'right', disablePadding: false, label: 'Sales'},
  {id: 'salersTotal', align: 'center', disablePadding: false, label: 'Salers total'},
  {id: 'type', align: 'right', disablePadding: false, label: 'Type'},
  {id: 'revenue', align: 'right', disablePadding: false, label: 'Revenue'},
  {id: 'amazonPrice', align: 'right', disablePadding: false, label: 'Amazon $'},
  {id: 'bsr', align: 'right', disablePadding: false, label: 'BSR'},
  {id: 'fba', align: 'right', disablePadding: false, label: 'FBA'},
]

export const CLIENT_ORDERS_HEAD_CELL = [
  'Заказы',
  'Штрих-код',
  'Кол-во',
  'Куда',
  'Коробка',
  'Сумма',
  'Вес',
  'Вес финальный',
  'Трек номер',
]
export const CLIENT_EXCHANGE_MODAL_HEAD_CELLS = [
  {id: 'img', label: 'Image'},
  {id: 'img', label: 'Category'},
  {id: 'img', label: 'Price'},
  {id: 'img', label: 'Qty'},
  {id: 'img', label: 'avg Price'},

  {id: 'img', label: 'Рекомендуемая партия'},
  {id: 'img', label: 'Вес'},

  {id: 'img', label: 'avg BSR'},
  {id: 'img', label: 'avg Reviews'},
  {id: 'img', label: 'avg Revenue'},
  {id: 'img', label: 'Стоимость запуска'},
  {id: 'img', label: 'Manager'},
]

export const CLIENT_EXCHANGE_HEAD_CELLS = [
  {id: 'img', label: 'Image'},
  {id: 'img', label: 'Category'},
  {id: 'img', label: 'Цена'},
  {id: 'img', label: 'Кол-во'},
  {id: 'img', label: 'Средняя цена'},

  {id: 'img', label: 'Рекомендуемая партия'},
  {id: 'img', label: 'Вес'},

  {id: 'img', label: 'avg BSR'},
  {id: 'img', label: 'avg Reviews'},
  {id: 'img', label: 'avg Revenue'},
  {id: 'img', label: 'Researcher'},
  {id: 'img', label: 'Стоимость запуска'},
]

export const CLIENT_WAREHOUSE_HEAD_CELLS = [
  {id: 'img', label: '#'},
  {id: 'img', label: ''},
  {id: 'img', label: 'Product'},
  {id: 'img', label: 'Order'},
  {id: 'img', label: 'Barcode'},
  {id: 'img', label: 'ASIN'},
  {id: 'img', label: 'Qty'},
  {id: 'img', label: 'Material'},
  {id: 'img', label: 'Warehouse'},
  {id: 'img', label: 'Boxes'},
  {id: 'img', label: 'Price'},
  {id: 'img', label: 'Weight'},
  {id: 'img', label: 'Gross Weight'},
  {id: 'img', label: 'Track ID'},
]

export const BUYER_MY_ORDERS_HEAD_CELLS = [
  'Статус',
  'Товар',
  'Штрихкод',
  'Создан',
  'Изменён',
  'Склад',
  'Способ доставки',
  'Комментарий клиента',
  'Комментарий байера',
]

export const BUYER_MY_ORDERS_MODAL_HEAD_CELLS = [
  '',
  'Товар',
  'Способ доставки',
  'Создан',
  'Проверен',
  'Поставщик',
  'Штрихкод',
  'Материал',
]

export const BUYER_FREE_ORDERS_MODAL_HEAD_CELLS = [
  'Статус',
  'Товар',
  'Штрихкод',
  'Создан',
  'Изменён',
  'Склад',
  'Способ доставки',
  'Комментарий клиента',
  'Комментарий байера',
]

export const ADMIN_PRODUCTS_HEAD_CELLS = [
  {id: 'asin', align: 'center', disablePadding: true, label: 'ASIN'},
  {id: 'price', align: 'right', disablePadding: false, label: 'Price'},
  {id: 'fees', align: 'left', disablePadding: false, label: 'Fees & Net'},
  {id: 'supplier', align: 'left', disablePadding: false, label: 'Supplier'},
  {id: 'supervisor', align: 'left', disablePadding: false, label: 'Supervisor'},
  {id: 'researcher', align: 'left', disablePadding: false, label: 'Researcher'},
  {id: 'buyer', align: 'left', disablePadding: false, label: 'Buyer'},
  {id: 'rank', align: 'right', disablePadding: false, label: 'Rank'},
  {id: 'rating', align: 'center', disablePadding: false, label: 'Rating'},
  {id: 'sales', align: 'right', disablePadding: false, label: 'Sales'},
  {id: 'salersTotal', align: 'center', disablePadding: false, label: 'Salers total'},
  {id: 'type', align: 'right', disablePadding: false, label: 'Type'},
  {id: 'revenue', align: 'right', disablePadding: false, label: 'Revenue'},
  {id: 'amazonPrice', align: 'right', disablePadding: false, label: 'Amazon $'},
  {id: 'bsr', align: 'right', disablePadding: false, label: 'BSR'},
  {id: 'fba', align: 'right', disablePadding: false, label: 'FBA'},
  {id: 'Штрих код', align: 'right', disablePadding: false, label: 'Barcode'},
]
export const ADMIN_ORDERS_HEAD_CELL = [
  'Заказы',
  'Штрих-код',
  'Кол-во',
  'Куда',
  'Коробка',
  'Сумма',
  'Вес',
  'Вес финальный',
  'Трек номер',
]

export const ADMIN_SUB_USERS_TABLE_CELLS = [
  {id: 'created', label: 'Created'},
  {id: 'email', label: 'Email'},
  {id: 'bu', label: 'Bussines unit'},
  {id: 'admin', label: 'Admin'},
]
