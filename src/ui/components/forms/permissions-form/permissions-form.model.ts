import { RadioChangeEvent } from 'antd'
import { DefaultOptionType } from 'antd/es/cascader'
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
import { IProducts } from '@typings/models/products/products'
import { IShop } from '@typings/models/shops/shop'
import { IShops } from '@typings/models/shops/shops'
import { IFullUser } from '@typings/shared/full-user'
import { ISpec } from '@typings/shared/spec'

import { PermissionsFormProps } from './permissions-form'
import { PermissionsTab } from './permissions-form.config'

export class PermissionsFormModel {
  permissionTab = PermissionsTab.ASSIGN_PERMISSIONS
  withoutGroupPermissions: IPermission[] = []
  groupPermissions: IPermissionGroup[] = []
  mainLoading = false
  productsLoading = false
  specs: ISpec[] = []
  selectedSpecs: Specs[] = []
  shops: IShop[] = []
  products: IProduct[] = []
  allProductsCount = 0
  selectedProductsCount = 0
  currentPermissionOptions: string[][] = []
  currentProductOptions: string[][] = []
  searchFocus = false
  subUser?: IFullUser
  onCloseModal?: () => void
  onUpdateData?: () => void

  get userInfo() {
    return UserModel?.userInfo as unknown as IFullUser
  }
  get permissionsOptions() {
    const mainOptions = this.groupPermissions
      .toSorted((a, b) => a.hierarchy - b.hierarchy)
      .map(item => ({
        label: item.title,
        value: item._id,
        children: item.permissions
          .toSorted((a, b) => a.hierarchy - b.hierarchy)
          .map(el => ({
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
      children: item.products?.map(el => ({
        label: el.amazonTitle,
        value: el._id,
        selected: el.selected,
        asin: el.asin,
        sku: el.skuByClient,
      })),
    }))
    const extraOption =
      this.products.length > 0
        ? {
            label: `Без группы`, // (${this.selectedProductsCount}/${this.allProductsCount}),
            value: 'WITHOUT_GROUP',
            children: this.products.map(el => ({
              label: el.amazonTitle,
              value: el._id,
              selected: el.selected,
              asin: el.asin,
              sku: el.skuByClient,
            })),
          }
        : null

    return [...(extraOption ? [extraOption] : []), ...mainOptions]
  }
  get editingPermissions() {
    const permissions: string[] = []
    const permissionGroups: string[] = []

    this.currentPermissionOptions.forEach(el => {
      const [groupId, permissionId] = el

      if (permissionId) {
        permissions.push(permissionId)
      } else {
        permissionGroups.push(groupId)
      }
    })

    return { permissions, permissionGroups }
  }
  get editingProducts() {
    const shopIds: string[] = []
    const productIds: string[] = []

    this.currentProductOptions.forEach(el => {
      const [shopId, productId] = el

      if (productId) {
        productIds.push(productId)
      } else if (shopId === 'WITHOUT_GROUP') {
        this.products.forEach(product => productIds.push(product._id))
      } else {
        shopIds.push(shopId)
      }
    })

    return { shopIds, productIds }
  }
  get showCustomSearchPlaseholder() {
    return !this.searchFocus && !this.mainLoading
  }

  constructor({ subUser, onCloseModal, onUpdateData }: PermissionsFormProps) {
    this.subUser = subUser
    this.onCloseModal = onCloseModal
    this.onUpdateData = onUpdateData
    this.loadData()
    this.initSelectedSpecs()

    makeAutoObservable(this, undefined, { autoBind: true })
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

  onChangeSpecs(value: Specs[]) {
    this.selectedSpecs = value
  }

  initSelectedSpecs() {
    this.userInfo?.allowedSpec?.forEach(spec => this.selectedSpecs.push(spec.type))
  }

  onChangeSearchFocus(value: boolean) {
    this.searchFocus = value
  }

  async getProduts() {
    if (isFreelancer(this.userInfo?.role)) {
      return
    }

    const responseProducts = (await PermissionsModel.getProductsPermissionsForUserByIdV2(
      this.subUser?._id,
    )) as unknown as IProducts
    const responseShops = (await PermissionsModel.getPermissionsShopsByGuidV2(this.subUser?._id)) as unknown as IShops

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
          el.children?.forEach(item => {
            if (item.selected) {
              this.currentProductOptions.push([el.value, item.value])
            }
          })
        }
      })
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
        if (this.subUser?.permissionGroups.includes(el.value)) {
          this.currentPermissionOptions.push([el.value])
        }

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

  async onEditSubUser() {
    try {
      await PermissionsModel.onEditMySubUser(this.subUser?._id, this.editingPermissions)

      if (!this.showSpecsCascader) {
        await PermissionsModel.setProductsPermissionsForUser({
          userId: this.subUser?._id,
          productIds: this.editingProducts.productIds,
        })
      }

      if (isClient(this.userInfo?.role)) {
        await PermissionsModel.patchPermissionsShops({
          userId: this.subUser?._id,
          shopIds: this.editingProducts.shopIds,
        })
      }

      if (this.showSpecsCascader) {
        await UserModel.changeSubUserSpec(this.subUser?._id, { allowedSpec: this.selectedSpecs.flat() })
      }

      this.onCloseModal?.()
      toast.success(t(TranslationKey['User permissions were changed']))
      this.onUpdateData?.()
    } catch (error) {
      toast.error(t(TranslationKey['User permissions are not changed']))
    }
  }

  filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
}
