import { RadioChangeEvent } from 'antd'
import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { ClientModel } from '@models/client-model'
import { PermissionsModel } from '@models/permissions-model'
import { ResearcherModel } from '@models/researcher-model'
import { ShopModel } from '@models/shop-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { Specs } from '@typings/enums/specs'
import { isBuyer, isClient, isFreelancer, isResearcher, isSupervisor } from '@typings/guards/roles'
import { IPermission } from '@typings/models/permissions/permission'
import { IPermissionGroup } from '@typings/models/permissions/permission-group'
import { IPermissions } from '@typings/models/permissions/permissions'
import { IShop } from '@typings/models/shops/shop'
import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

import { PermissionsTab } from './permissions-form.type'

export class PermissionsFormModel {
  permissionTab = PermissionsTab.ASSIGN_PERMISSIONS
  withoutGroupPermissions: IPermission[] = []
  groupPermissions: IPermissionGroup[] = []
  mainLoading = false
  productsLoading = false
  specs: ISpec[] = []
  selectedSpecs: Specs[][] = []
  shops: IShop[] = []
  currentPermissionOptions: string[][] = []
  subUser?: IFullUser
  isProductsLoaded = false

  get userInfo() {
    return UserModel?.userInfo as unknown as IFullUser
  }
  get permissionsOptions() {
    const mainOptions = this.groupPermissions.map(item => ({
      label: item.title,
      value: item._id,
      children: item.permissions.map(el => ({
        label: el.title,
        value: el._id,
      })),
    }))
    const extraOption =
      this.withoutGroupPermissions.length > 0
        ? {
            label: 'Без группы', // t(TranslationKey['Without the group']),
            value: 'WITHOUT_GROUP',
            children: this.withoutGroupPermissions.map(el => ({
              label: el.title,
              value: el._id,
            })),
          }
        : null

    return [...mainOptions, ...(extraOption ? [extraOption] : [])]
  }
  get specsOptions() {
    return this.specs.map(spec => ({
      label: spec.title,
      value: spec.type,
    }))
  }
  get showSpecsCascader() {
    return isFreelancer(this.userInfo?.role)
  }

  constructor(subUser?: IFullUser) {
    this.subUser = subUser

    this.loadData()
    this.initSelectedSpecs()

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.permissionTab,
      () => {
        if (this.permissionTab === PermissionsTab.ACCESS_TO_PRODUCTS && !this.isProductsLoaded) {
          this.getProduts()

          this.setProductsLoadedState(true)
        }
      },
    )
  }

  async getProduts() {
    if (!isFreelancer(this.userInfo?.role)) {
      const response = await PermissionsModel.getProductsPermissionsForUserById(this.subUser?._id)

      console.log('getProductsPermissionsForUserById', response)
    }

    const methodByRole = () => {
      if (isClient(this.userInfo?.role)) {
        return ClientModel.getProductPermissionsData()
      }
      if (isBuyer(this.userInfo?.role)) {
        return BuyerModel.getProductsMyLight()
      }
      if (isSupervisor(this.userInfo?.role)) {
        return SupervisorModel.getProductsMyLight()
      }
      if (isResearcher(this.userInfo?.role)) {
        return ResearcherModel.getProductsVacant()
      }
      if (isClient(this.userInfo?.role)) {
        return ClientModel.getProductPermissionsData()
      }

      return
    }

    if (isClient(this.userInfo?.role)) {
      const response = await PermissionsModel.getPermissionsShopsByGuid(this.subUser?._id)

      console.log('getPermissionsShopsByGuid', response)
    }

    const response = await methodByRole()

    console.log('methodByRole', response)

    this.getShops()
  }

  onChangePermissionTab(event: RadioChangeEvent) {
    this.permissionTab = event.target.value
  }

  onChangePermissionOptions(value: string[][]) {
    this.currentPermissionOptions = value
  }

  onChangeSpecs(value: Specs[][]) {
    this.selectedSpecs = value
  }

  initSelectedSpecs() {
    this.userInfo?.allowedSpec?.forEach(spec => {
      this.selectedSpecs.push([spec.type])
    })
  }

  setProductsLoadedState(loaded: boolean) {
    this.isProductsLoaded = loaded
  }

  async loadData() {
    runInAction(() => (this.mainLoading = true))

    await this.getGroupPermissions()
    await this.getWithoutGroupPermissions()
    await this.getSpecs()

    runInAction(() => {
      this.mainLoading = false

      this.permissionsOptions.forEach(el => {
        el.children?.forEach(item => {
          if (this.subUser?.permissions.includes(item.value)) {
            this.currentPermissionOptions.push([el.value, item.value])
          }
        })
      })
    })
  }

  async getGroupPermissions() {
    try {
      const response = (await PermissionsModel.getGroupPermissions(this.userInfo?.role)) as IPermissionGroup[]

      runInAction(() => {
        this.groupPermissions = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getWithoutGroupPermissions() {
    try {
      const response = (await PermissionsModel.getPermissionsPag({
        groupIds: null, // null - get permissions without groups
        role: this.userInfo?.role,
      })) as IPermissions

      runInAction(() => {
        this.withoutGroupPermissions = response?.rows || []
      })
    } catch (error) {
      console.error(error)
    }
  }

  async setPermissionsForUser(id: string, data: any, allowedItems: any, currentSpec: any) {
    try {
      await PermissionsModel.setPermissionsForUser(id, data)

      if (!isFreelancer(this.userInfo?.role)) {
        await PermissionsModel.setProductsPermissionsForUser({ userId: id, productIds: allowedItems?.selectedProducts })
      }

      if (isClient(this.userInfo?.role)) {
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
    } catch (error) {
      console.error(error)
    }
  }

  async getSpecs() {
    try {
      const response = (await UserModel.getSpecs(false)) as unknown as ISpec[]

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getShops() {
    try {
      const response = (await ShopModel.getMyShops()) as unknown as IShop[]

      console.log('shops', response)

      runInAction(() => {
        this.shops = response
      })
    } catch (error) {
      console.error(error)
    }
  }
}
