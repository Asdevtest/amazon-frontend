// * Объект с доп. фильтра в зависимости от текущего роута
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ideaStatusGroups, ideaStatusGroupsNames } from '@constants/statuses/idea-status'

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
    statuses: ideaStatusGroups[ideaStatusGroupsNames.NEW],
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientNewIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_NEW_IDEAS,
    permissionOptions: { isChild: false },
  },
  '/client/ideas/on-checking': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.ON_CHECKING],
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientOnCheckingIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_ON_CHECKING_IDEAS,
  },
  '/client/ideas/search-suppliers': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.SEARCH_SUPPLIERS],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientSearchSuppliersIdeasColumns,
    defaultSortingModel: 'status',
    dataGridKey: DataGridTablesKeys.CLIENT_SEARCH_SUPPLIERS_IDEAS,
  },
  '/client/ideas/create-card': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.CREATE_CARD],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientCreateCardIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_CREATE_CARD_IDEAS,
  },
  '/client/ideas/add-asin': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.ADD_ASIN],
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientAddAsinIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_ADD_ASIN_IDEAS,
  },
  '/client/ideas/realized': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.REALIZED],
    queries: {
      withOrder: true,
      withRequests: true,
    },
    columnsModel: clientRealizedIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_REALIZED_IDEAS,
  },
  '/client/ideas/closed': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.CLOSED],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientClosedIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_CLOSED_IDEAS,
  },
  '/client/ideas/all': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.ALL],
    queries: {
      withOrder: true,
      withRequests: true,
    },
    columnsModel: clientAllIdeasColumns,
    defaultSortingModel: 'updatedAt',
    dataGridKey: DataGridTablesKeys.CLIENT_ALL_IDEAS,
    permissionOptions: { isParent: true, isChild: false },
  },
}
