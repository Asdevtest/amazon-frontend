import { RadioChangeEvent } from 'antd'
import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { PermissionsModel } from '@models/permissions-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { Specs } from '@typings/enums/specs'
import { isClient, isFreelancer } from '@typings/guards/roles'
import { IPermission } from '@typings/models/permissions/permission'
import { IPermissionGroup } from '@typings/models/permissions/permission-group'
import { IPermissions } from '@typings/models/permissions/permissions'
import { IProduct } from '@typings/models/products/product'
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
  shops: any[] = []
  products: any[] = []
  allProductsCount = 0
  selectedProductsCount = 0
  currentPermissionOptions: string[][] = []
  currentProductOptions: string[][] = []
  subUser?: IFullUser

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
  get shopsOptions() {
    const mainOptions = this.shops.map(item => ({
      label: item.name,
      value: item._id,
      children: item.products.map((el: any) => ({
        label: el.amazonTitle,
        value: el._id,
        selected: el.selected,
      })),
    }))
    const extraOption =
      this.products.length > 0
        ? {
            label: `Без группы (${this.selectedProductsCount}/${this.allProductsCount})`, // t(TranslationKey['Without the group']),
            value: 'WITHOUT_GROUP',
            children: this.products.map(el => ({
              label: el.amazonTitle,
              value: el._id,
              selected: el.selected,
            })),
          }
        : null

    return [...(extraOption ? [extraOption] : []), ...mainOptions]
  }

  constructor(subUser?: IFullUser) {
    this.subUser = subUser

    this.loadData()
    this.initSelectedSpecs()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getProduts() {
    if (isFreelancer(this.userInfo?.role)) {
      return
    }

    const responseProducts: any = await PermissionsModel.getProductsPermissionsForUserByIdV2(this.subUser?._id)
    const responseShops: any = await PermissionsModel.getPermissionsShopsByGuidV2(this.subUser?._id)

    runInAction(() => {
      this.products = responseProducts?.rows
      this.allProductsCount = responseProducts?.count
      this.selectedProductsCount = responseProducts.rows?.reduce(
        (acc: number, el: IProduct) => acc + Number(el.selected),
        0,
      )
      this.shops = responseShops.rows

      this.shopsOptions.forEach(el => {
        if (el.children?.length === 0) {
          this.currentProductOptions.push([el.value])
        } else {
          el.children?.forEach((item: any) => {
            if (item.selected) {
              this.currentProductOptions.push([el.value, item.value])
            }
          })
        }
      })
    })
  }

  onChangePermissionTab(event: RadioChangeEvent) {
    this.permissionTab = event.target.value
  }

  onChangePermissionOptions(value: string[][]) {
    this.currentPermissionOptions = value
  }

  onChangeProductsOptions(value: string[][]) {
    this.currentProductOptions = value
  }

  onChangeSpecs(value: Specs[][]) {
    this.selectedSpecs = value
  }

  initSelectedSpecs() {
    this.userInfo?.allowedSpec?.forEach(spec => {
      this.selectedSpecs.push([spec.type])
    })
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

    this.getProduts()
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
}
