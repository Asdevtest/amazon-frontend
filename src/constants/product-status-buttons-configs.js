import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ProductStatus, ProductStatusByKey} from './product-status'
import {texts} from './texts'
import {UserRole} from './user-roles'

const textConfigs = getLocalizedTexts(texts, 'ru').productStatusButtonsConfigs

export const productStatusButtonsConfigs = {
  [UserRole.RESEARCHER]: curStatus => {
    if (curStatus < ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR]) {
      return [
        {
          statusKey: ProductStatus.RESEARCHER_CREATED_PRODUCT,
          label: textConfigs.sendToSupervisor,
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },

        {
          statusKey: ProductStatus.RESEARCHER_FOUND_SUPPLIER,
          label: textConfigs.createWithSupplier,
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    }
  },

  [UserRole.SUPERVISOR]: curStatus => {
    if (curStatus === ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT]) {
      return
    } else if (
      curStatus > ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] ||
      curStatus === ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER]
    ) {
      return [
        {
          statusKey: ProductStatus.COMPLETE_SUCCESS,
          label: textConfigs.publish,
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },
        {
          statusKey: ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND,
          label: textConfigs.supplierWasNotFound,
          color: '#ff9800',
          colorHover: '#f57c00',
        },
      ]
    } else if (curStatus <= ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]) {
      return [
        {
          statusKey: ProductStatus.TO_BUYER_FOR_RESEARCH,
          label: textConfigs.searchForSupplier,
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
        {
          statusKey: ProductStatus.CHECKED_BY_SUPERVISOR,
          label: textConfigs.checkedBySupervisor,
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },
        {
          statusKey: ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP,
          label: textConfigs.rejectedBySupervisor,
          color: 'rgb(210, 35, 35)',
          colorHover: '#c51a1c',
        },
      ]
    }
  },
  [UserRole.BUYER]: curStatus => {
    if (
      curStatus >= ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] &&
      curStatus < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]
    ) {
      return [
        {
          statusKey: ProductStatus.BUYER_FOUND_SUPPLIER,
          label: textConfigs.supplierWasFound,
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },
        {
          statusKey: ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
          label: textConfigs.supplierWasNotFound,
          color: 'rgb(210, 35, 35)',
          colorHover: '#c51a1c',
        },
        {
          statusKey: ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
          label: textConfigs.supplierPriceNotAccepted,
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    }
  },
}
