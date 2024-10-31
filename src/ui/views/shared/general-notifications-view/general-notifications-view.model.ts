/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioChangeEvent } from 'antd'
import { History } from 'history'
import { makeObservable, reaction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { UserModel } from '@models/user-model'

import { checkIsBuyer, checkIsClient, checkIsFreelancer } from '@utils/checks'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { Notification } from '@typings/enums/notification'
import { IProduct } from '@typings/models/products/product'
import { RowHandlers } from '@typings/shared/data-grid'
import { IFullUser } from '@typings/shared/full-user'

import { generalNotificationsColumns } from './general-notifications-columns'
import { notificationDataConverter, observerConfig } from './general-notifications-model.config'

interface IVariations {
  isArchive: boolean
  showIdeaModal: boolean
}

export class GeneralNotificationsViewModel extends DataGridFilterTableModel {
  curNotificationType?: string = undefined

  isArchive = false
  showIdeaModal = false

  currentProduct: IProduct | undefined = undefined
  currentIdeaId: string | undefined = undefined

  sortFields = () => [
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
    },

    {
      field: 'type',
      headerName: t(TranslationKey.Type),
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
    },
  ]

  get userInfo(): IFullUser | undefined {
    return UserModel.userInfo
  }

  get currentConvertedData() {
    return notificationDataConverter(this.currentData)
  }

  constructor({ history }: { history: History }) {
    const rowHandlers: RowHandlers = {
      navigateToHandler: (notification: any, type: string) => this.navigateToHandler(notification, type),
      userInfo: () => UserModel.userInfo,
    }

    const columns = generalNotificationsColumns(rowHandlers)

    const filtersFields = ['type', 'shop', 'createdAt', 'updatedAt']

    if (checkIsFreelancer(UserRoleCodeMap[rowHandlers.userInfo()?.role || 0])) {
      filtersFields.push('user')
    }

    const defaultGetCurrentDataOptions = () => ({
      archive: this.isArchive,
      noCache: true,
    })

    const additionalPropertiesGetFilters = () => ({
      ...(this.curNotificationType && {
        type: {
          $eq: this.curNotificationType,
        },
      }),
    })

    const operatorsSettings = {
      shop: '$any',
    }

    super({
      getMainDataMethod: UserModel.getUsersNotificationsPagMy,
      columnsModel: columns,
      filtersFields,
      mainMethodURL: 'users/notifications/pag/my?',
      fieldsForSearch: ['data'],
      tableKey: DataGridTablesKeys.GENERAL_NOTIFICATIONS,
      defaultGetCurrentDataOptions,
      additionalPropertiesGetFilters,
      operatorsSettings,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    this.history = history

    this.getTableSettingsPreset()

    reaction(
      () => this.isArchive,
      () => this.getCurrentData(),
    )

    makeObservable(this, observerConfig)
  }

  async onClickReadButton() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await UserModel.addNotificationsToArchive(this.selectedRows)
      await this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  toggleVariationHandler(variation: keyof IVariations) {
    this[variation] = !this[variation]
  }

  navigateToHandler(notification: any, type: string) {
    if (!this.userInfo) return

    if (type === Notification.Order) {
      if (checkIsClient(UserRoleCodeMap[this.userInfo?.role])) {
        window
          .open(
            `/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/my-orders/orders/order?orderId=${
              notification?._id
            }&order-human-friendly-id=${notification?.id}`,
          )
          ?.focus()
      } else if (checkIsBuyer(UserRoleCodeMap[this.userInfo?.role])) {
        const isVacOrders = !!notification?.vacOrders.length

        window
          .open(
            `/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/${isVacOrders ? 'free-orders' : 'all-orders'}?orderId=${
              isVacOrders ? notification?.vacOrders?.[0]?.id : notification?.needConfirmOrders?.[0]?.id
            }`,
          )
          ?.focus()
      }
    } else if (type === 'user') {
      window.open(`/another-user?${notification?.sub?._id || notification?.creator?._id}`)?.focus()
    } else if (type === Notification.Idea) {
      this.currentProduct = notification.parentProduct
      this.currentIdeaId = notification.ideaId

      this.toggleVariationHandler('showIdeaModal')
    }
  }

  onClickToChangeNotificationType(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.curNotificationType = currentValue

    this.getCurrentData()
  }
}
