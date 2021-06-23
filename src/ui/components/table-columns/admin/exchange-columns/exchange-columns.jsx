import {exchangeAllColumns} from './exchange-all-columns'
import {exchangeBuyerWorkColumns} from './exchange-buyer-work-columns'
import {exchangeCheckingColumns} from './exchange-cheking-columns'
import {exchangeSupplierFoundedColumns} from './exchange-supplier-founded-columns'
import {exchangeSupplierSearchColumns} from './exchange-supplier-search-columns'
import {exchangeWaitingColumns} from './exchange-waiting-columns'

export const exchangeProductsColumns = ({handlers, activeSubCategory}) => {
  const getSubCategoryColumns = () => {
    switch (activeSubCategory) {
      case 0:
        return exchangeWaitingColumns({handlers})
      case 1:
        return exchangeCheckingColumns({handlers})
      case 2:
        return exchangeSupplierSearchColumns({handlers})
      case 3:
        return exchangeBuyerWorkColumns({handlers})
      case 4:
        return exchangeSupplierFoundedColumns({handlers})
      case 5:
        return exchangeAllColumns({handlers})
      case 6:
        return exchangeAllColumns({handlers})
      case 7:
        return exchangeAllColumns({handlers})
      case 8:
        return exchangeAllColumns({handlers})
    }
  }

  return getSubCategoryColumns()
}
