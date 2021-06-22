export const SUPERVISOR_PRODUCTS_HEAD_CELLS = [
  {id: 'asin', align: 'center', disablePadding: true, label: 'ASIN'},
  {id: 'status', align: 'center', disablePadding: true, label: 'Status'},
  {id: 'createDate', align: 'center', disablePadding: true, label: 'Create date'},
  {id: 'updateDate', align: 'center', disablePadding: true, label: 'Update date'},
  {id: 'price', align: 'right', disablePadding: false, label: 'Amazon $'},
  {id: 'researcher', align: 'left', disablePadding: false, label: 'Researcher'},
  {id: 'bsr', align: 'right', disablePadding: false, label: 'BSR'},
  {id: 'type', align: 'right', disablePadding: false, label: 'Type'},
  {id: 'fbaFee', align: 'center', disablePadding: false, label: 'Fba fee'},
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
  {id: 'id', label: 'Id'},
  {id: 'category', label: 'Category'},
  {id: 'price', label: 'Price'},
  {id: 'deliveryPrice', label: 'Delivery price'},
  {id: 'amount', label: 'Amount'},

  {id: 'fullPrice', label: 'Full price'},
  {id: 'barcode', label: 'Barcode'},

  {id: 'deliveryMethod', label: 'Delivery method'},
  {id: 'warehouse', label: 'Warehouse'},
  {id: 'clientComment', label: 'Client comment'},
]

export const CLIENT_EXCHANGE_HEAD_CELLS = [
  {id: 'img', label: 'Image'},
  {id: 'category', label: 'Category'},
  {id: 'priceAmazon', label: 'Цена'},
  {id: 'weight', label: 'Вес'},
  {id: 'bsr', label: 'BSR'},
  {id: 'reasearcher', label: 'Ресерчер'},
  {id: 'fullPrice', label: 'Стоимость'},
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

export const BUYER_PRODUCTS_HEAD_CELLS = []
