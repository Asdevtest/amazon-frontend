/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridColDef } from '@mui/x-data-grid-premium'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { PermissionsModel } from '@models/permissions-model'
import { ResearcherModel } from '@models/researcher-model'
import { ShopModel } from '@models/shop-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { IShop } from '@components/data-grid/data-grid-cells/shop-notification-message-cell/shop-notification.type'

import { checkIsClient, checkIsFreelancer } from '@utils/checks'
import { addIdDataConverter, clientInventoryDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IPermission } from '@typings/models/permissions/permission'
import { IPermissionGroup } from '@typings/models/permissions/permission-group'
import { IPermissionProduct } from '@typings/models/permissions/permission-product'
import { IUserFreelanceSpecs } from '@typings/models/user/users-freelance-specs'
import { IFullUser } from '@typings/shared/full-user'

import { getColumnsModel } from './helpers/get-columns-model'
import { observerConfig } from './observer-config'

export class SubUsersViewModel extends DataGridTableModel {
  singlePermissions: IPermission[] = []
  groupPermissions: IPermissionGroup[] = []
  shopsData: IShop[] = []
  specs: IUserFreelanceSpecs[] = []
  curUserProductPermissions: IPermissionProduct[] = []
  curUserShopsPermissions: string[] = []
  productPermissionsData = []
  selectedSubUser: IFullUser | null = null

  showAddSubUserModal = false
  showPermissionModal = false
  showConfirmModal = false

  get userRole() {
    // @ts-ignore
    return UserModel?.userInfo?.role
  }

  constructor(history: any) {
    const rowHandlers = {
      onClickRemoveBtn: (row: IFullUser) => this.onClickRemoveBtn(row),
      onClickEditBtn: (row: IFullUser) => this.onClickEditBtn(row),
      onClickSaveComment: (id: string, comment?: string) => this.onClickSaveComment(id, comment),
    }

    super({
      getMainDataMethod: UserModel.getMySubUsers,
      columnsModel: getColumnsModel(history.location.pathname)(rowHandlers) as unknown as GridColDef[],
      tableKey: DataGridTablesKeys.OVERALL_SUB_USERS,
      fieldsForSearch: ['name', 'email'],
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.getDataGridState()

    this.getCurrentData()
    this.getGroupPermissions()
    this.getSinglePermissions()

    if (checkIsClient(UserRoleCodeMap[this.userRole])) {
      this.getShops()
    }
  }

  async onClickSaveComment(id: string, comment?: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await UserModel.patchSubNote(id, comment)

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions(this.userRole)

      runInAction(() => {
        this.groupPermissions = result as IPermissionGroup[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions(this.userRole)

      runInAction(() => {
        this.singlePermissions = result as IPermission[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickEditBtn(row: IFullUser) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      runInAction(() => {
        this.selectedSubUser = row
      })

      if (!checkIsFreelancer(UserRoleCodeMap[this.userRole])) {
        const result = await PermissionsModel.getProductsPermissionsForUserById(row._id)

        runInAction(() => {
          this.curUserProductPermissions = result as IPermissionProduct[]
        })
      }

      const methodByRole = () => {
        switch (UserRoleCodeMap[this.userRole]) {
          case UserRole.CLIENT:
            return ClientModel.getProductPermissionsData({})

          case UserRole.BUYER:
            return BuyerModel.getProductsMyLight()

          case UserRole.SUPERVISOR:
            return SupervisorModel.getProductsMyLight()

          case UserRole.RESEARCHER:
            return ResearcherModel.getProductsVacant()

          case UserRole.FREELANCER:
            return []

          default:
            return ClientModel.getProductPermissionsData()
        }
      }

      if (checkIsClient(UserRoleCodeMap[this.userRole])) {
        const result = await PermissionsModel.getPermissionsShopsByGuid(row._id)
        runInAction(() => {
          this.curUserShopsPermissions = result as string[]
        })
      }

      const productPermissionsData = await methodByRole()

      runInAction(() => {
        this.productPermissionsData = clientInventoryDataConverter(
          // @ts-ignore
          productPermissionsData?.rows || productPermissionsData,
        )
          .filter((el: any) => !el.originalData.archive)
          .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      if (checkIsFreelancer(UserRoleCodeMap[this.userRole])) {
        this.getSpecs()
      }

      this.onTriggerOpenModal('showPermissionModal')

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onClickRemoveBtn(row: IFullUser) {
    this.selectedSubUser = row

    this.onTriggerOpenModal('showConfirmModal')
  }

  async setPermissionsForUser(id: string, data: any, allowedItems: any, currentSpec: any) {
    try {
      await PermissionsModel.setPermissionsForUser(id, data)

      if (!checkIsFreelancer(UserRoleCodeMap[this.userRole])) {
        await PermissionsModel.setProductsPermissionsForUser({ userId: id, productIds: allowedItems?.selectedProducts })
      }

      if (checkIsClient(UserRoleCodeMap[this.userRole])) {
        await PermissionsModel.patchPermissionsShops({ userId: id, shopIds: allowedItems?.selectedShops })
      }

      if (currentSpec) {
        await UserModel.changeSubUserSpec(id, { allowedSpec: currentSpec })
      }

      toast.success(t(TranslationKey['User permissions were changed']))
    } catch (error) {
      toast.error(t(TranslationKey['User permissions are not changed']))

      console.error(error)
    }
  }

  async onSubmitUserPermissionsForm(permissions: any, subUserId: string, allowedItems: any, currentSpec: any) {
    try {
      await this.setPermissionsForUser(subUserId, { permissions, permissionGroups: [] }, allowedItems, currentSpec)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async linkSubUser(data: { email: string }) {
    try {
      await UserModel.linkSubUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  async unlinkSubUser() {
    try {
      await UserModel.unlinkSubUser({ userId: this.selectedSubUser?._id })

      toast.success(t(TranslationKey['Sub-user removed']))
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitlinkSubUser(email: string) {
    try {
      await this.linkSubUser({ email })
      this.getCurrentData()

      this.onTriggerOpenModal('showAddSubUserModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitUnlinkSubUser() {
    try {
      await this.unlinkSubUser()
      this.getCurrentData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.error(error)
    }
  }
}
