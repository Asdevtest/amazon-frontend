import { exchangeBuyerWorkColumns } from './exchange-buyer-work-columns'
import { exchangeCanceledColumns } from './exchange-canceled-columns'
import { exchangeСreatedColumns } from './exchange-created-columns'
import { exchangeHighPriceColumns } from './exchange-high-price-columns'
import { exchangeNewColumns } from './exchange-new-columns'
import { exchangePublishedColumns } from './exchange-published-columns'
import { exchangeSupplierFoundedColumns } from './exchange-supplier-founded-columns'
import { exchangeSupplierNotFoundedColumns } from './exchange-supplier-not-founded-columns'
import { exchangeSupplierSearchColumns } from './exchange-supplier-search-columns'

export const exchangeProductsColumns = ({ activeSubCategory }) => {
  const getSubCategoryColumns = () => {
    switch (activeSubCategory) {
      case 0:
        return exchangeСreatedColumns()
      case 1:
        return exchangeNewColumns()
      case 2:
        return exchangeSupplierSearchColumns()
      case 3:
        return exchangeBuyerWorkColumns()
      case 4:
        return exchangeSupplierFoundedColumns()
      case 5:
        return exchangeSupplierNotFoundedColumns()
      case 6:
        return exchangeHighPriceColumns()
      case 7:
        return exchangePublishedColumns()
      case 8:
        return exchangeCanceledColumns()
      case 9:
        return exchangeSupplierNotFoundedColumns()
      case 10:
        return exchangeSupplierNotFoundedColumns()
    }
  }

  return getSubCategoryColumns()
}
