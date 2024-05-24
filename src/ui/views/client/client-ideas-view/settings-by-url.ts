// * Объект с доп. фильтра в зависимости от текущего роута
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ideaStatusGroupsNames } from '@constants/statuses/idea-status'

import {
  clientAddAsinIdeasColumns,
  clientAllIdeasColumns,
  clientClosedIdeasColumns,
  clientCreateCardIdeasColumns,
  clientNewIdeasColumns,
  clientOnCheckingIdeasColumns,
  clientRealizedIdeasColumns,
  clientSearchSuppliersIdeasColumns,
} from '@components/table/table-columns/client/client-ideas-columns'

export const settingsByUrl = {
  '/client/ideas/new': {
    statusGroup: ideaStatusGroupsNames.NEW,
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientNewIdeasColumns,
    defaultSortingModel: 'createdAt',
    dataGridKey: DataGridTablesKeys.CLIENT_NEW_IDEAS,
  },
  '/client/ideas/on-checking': {
    statusGroup: ideaStatusGroupsNames.ON_CHECKING,
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientOnCheckingIdeasColumns,
    defaultSortingModel: 'dateStatusOnCheck',
    dataGridKey: DataGridTablesKeys.CLIENT_ON_CHECKING_IDEAS,
  },
  '/client/ideas/search-suppliers': {
    statusGroup: ideaStatusGroupsNames.SEARCH_SUPPLIERS,
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientSearchSuppliersIdeasColumns,
    defaultSortingModel: 'status',
    dataGridKey: DataGridTablesKeys.CLIENT_SEARCH_SUPPLIERS_IDEAS,
  },
  '/client/ideas/create-card': {
    statusGroup: ideaStatusGroupsNames.CREATE_CARD,
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientCreateCardIdeasColumns,
    defaultSortingModel: 'dateStatusProductCreating',
    dataGridKey: DataGridTablesKeys.CLIENT_CREATE_CARD_IDEAS,
  },
  '/client/ideas/add-asin': {
    statusGroup: ideaStatusGroupsNames.ADD_ASIN,
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientAddAsinIdeasColumns,
    defaultSortingModel: 'dateStatusAddingAsin',
    dataGridKey: DataGridTablesKeys.CLIENT_ADD_ASIN_IDEAS,
  },
  '/client/ideas/realized': {
    statusGroup: ideaStatusGroupsNames.REALIZED,
    queries: {
      withOrder: true,
      withRequests: true,
    },
    columnsModel: clientRealizedIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_REALIZED_IDEAS,
  },
  '/client/ideas/closed': {
    statusGroup: ideaStatusGroupsNames.CLOSED,
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientClosedIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_CLOSED_IDEAS,
  },
  '/client/ideas/all': {
    statusGroup: ideaStatusGroupsNames.ALL,
    queries: {
      withOrder: true,
      withRequests: true,
    },
    columnsModel: clientAllIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_ALL_IDEAS,
  },
}
