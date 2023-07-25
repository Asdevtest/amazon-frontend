import { UserRole } from '@constants/keys/user-roles'

import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

import { ProductStatus, ProductStatusByKey } from './product-status'

export const productStatusButtonsConfigs = {
  [UserRole.RESEARCHER]: curStatus => {
    if (curStatus < ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR]) {
      return [
        {
          statusKey: ProductStatus.RESEARCHER_CREATED_PRODUCT,
          label: t(TranslationKey['Send to check']),
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },

        // {
        //   statusKey: ProductStatus.RESEARCHER_FOUND_SUPPLIER,
        //   label: t(TranslationKey['Create with a supplier']),
        //   color: 'rgb(0, 123, 255)',
        //   colorHover: '#1269ec',
        // },
      ]
    }
  },

  [UserRole.SUPERVISOR]: curStatus => {
    if (curStatus === ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT]) {
      return
    } else if (curStatus === ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR]) {
      return [
        {
          statusKey: ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
          label: t(TranslationKey['Finding a supplier (product fit)']),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },

        {
          statusKey: ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
          label: t(TranslationKey['Supplier not found']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },
      ]
    } else if (curStatus === ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER]) {
      return [
        {
          statusKey: ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS,
          label: t(TranslationKey['Supplier found']),
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },

        {
          statusKey: ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
          label: t(TranslationKey['Repeat search']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },

        {
          statusKey: ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
          label: t(TranslationKey['Supplier not found']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },
        {
          statusKey: ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
          label: t(TranslationKey["The supplier's price does not fit"]),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    } else if (curStatus > ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER]) {
      return [
        {
          statusKey: ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
          label: t(TranslationKey['Repeat search']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },

        {
          statusKey: ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
          label: t(TranslationKey['Supplier not found']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },
        {
          statusKey: ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
          label: t(TranslationKey["The supplier's price does not fit"]),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    } else if (curStatus === ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER]) {
      return [
        {
          statusKey: ProductStatus.COMPLETE_SUCCESS,
          label: t(TranslationKey['Publish on the exchange']),
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },

        {
          statusKey: ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND,
          label: t(TranslationKey['Supplier not found']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },

        {
          statusKey: ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
          label: t(TranslationKey["The supplier's price does not fit"]),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    } else if (
      curStatus > ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH] &&
      curStatus <= ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]
    ) {
      return [
        {
          statusKey: ProductStatus.COMPLETE_SUCCESS,
          label: t(TranslationKey['Publish on the exchange']),
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },

        {
          statusKey: ProductStatus.TO_BUYER_FOR_RESEARCH,
          label: t(TranslationKey['Repeat search']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },
        {
          statusKey: ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND,
          label: t(TranslationKey['Supplier not found']),
          color: '#ff9800',
          colorHover: '#f57c00',
        },

        {
          statusKey: ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
          label: t(TranslationKey["The supplier's price does not fit"]),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    } else if (curStatus <= ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]) {
      return [
        {
          statusKey: ProductStatus.TO_BUYER_FOR_RESEARCH,
          label: t(TranslationKey['Finding a supplier (product fit)']),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
        {
          statusKey: ProductStatus.CHECKED_BY_SUPERVISOR,
          label: t(TranslationKey['The product is suitable']),
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },
        {
          statusKey: ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP,
          label: t(TranslationKey["Doesn't fit"]),
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
          label: t(TranslationKey['Supplier found']),
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },
        {
          statusKey: ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
          label: t(TranslationKey['Supplier not found']),
          color: 'rgb(210, 35, 35)',
          colorHover: '#c51a1c',
        },
        {
          statusKey: ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
          label: t(TranslationKey["The supplier's price does not fit"]),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    } else if (
      curStatus >= ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH] &&
      curStatus < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS]
    ) {
      return [
        {
          statusKey: ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
          label: t(TranslationKey['Supplier found']),
          color: 'rgb(15, 169, 20)',
          colorHover: '#009a07',
        },
        {
          statusKey: ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
          label: t(TranslationKey['Supplier not found']),
          color: 'rgb(210, 35, 35)',
          colorHover: '#c51a1c',
        },
        {
          statusKey: ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
          label: t(TranslationKey["The supplier's price does not fit"]),
          color: 'rgb(0, 123, 255)',
          colorHover: '#1269ec',
        },
      ]
    }
  },
}
