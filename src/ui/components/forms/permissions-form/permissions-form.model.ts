import { RadioChangeEvent } from 'antd'
import { DefaultOptionType } from 'antd/es/cascader'
import { makeAutoObservable, runInAction } from 'mobx'
import { KeyboardEvent } from 'react'
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
  selectedUserIds: string[] = []
  // allProductsCount = 0
  // selectedProductsCount = 0
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
        title: item.description,
        children: item.permissions
          .toSorted((a, b) => a.hierarchy - b.hierarchy)
          .map(el => ({
            label: el.title,
            value: el._id,
            title: el.description,
          })),
      }))
    const extraOption =
      this.withoutGroupPermissions.length > 0
        ? {
            label: 'Без группы',
            value: 'WITHOUT_GROUP',
            children: this.withoutGroupPermissions.map(el => ({
              label: el.title,
              value: el._id,
              title: el.description,
            })),
          }
        : null

    return [
      { label: 'Выбрать все', value: 'select-all-permissions', children: undefined },
      ...mainOptions,
      ...(extraOption ? [extraOption] : []),
    ]
  }
  get specsOptions() {
    return this.specs.map(spec => ({
      label: spec.title,
      value: spec.type,
    }))
  }
  get isFreelancer() {
    return isFreelancer(this.userInfo?.role)
  }
  get productsOptions() {
    const mainOptions = this.shops.map(item => ({
      label: item.name,
      value: item._id,
      selected: item.selected,
      children: item.products?.map(el => ({
        label: el.amazonTitle,
        value: el._id,
        selected: el.selected,
        asin: el.asin,
        sku: el.skuByClient,
        image: el.images?.[0],
        subOption: true,
      })),
    }))
    const extraOption =
      this.products.length > 0
        ? {
            label: `Без группы`,
            value: 'WITHOUT_GROUP',
            selected: false,
            children: this.products.map(el => ({
              label: el.amazonTitle,
              value: el._id,
              selected: el.selected,
              asin: el.asin,
              sku: el.skuByClient,
              image: el.images?.[0],
              subOption: true,
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
      } else if (groupId !== 'select-all-permissions') {
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
  get isAssignPermissions() {
    return this.permissionTab === PermissionsTab.ASSIGN_PERMISSIONS
  }
  get customSearchPlaseholder() {
    return this.isAssignPermissions ? 'Search by Title' : 'Search by Title, ASIN, SKU'
  }
  get mainOptions() {
    return this.isAssignPermissions ? this.permissionsOptions : this.productsOptions
  }
  get mainChangeMethod() {
    return this.isAssignPermissions ? this.onChangePermissionOptions : this.onChangeProductsOptions
  }
  get currentMainOptions() {
    return this.isAssignPermissions ? this.currentPermissionOptions : this.currentProductOptions
  }
  get showSkeleton() {
    return this.mainLoading || (this.productsLoading && this.permissionTab === PermissionsTab.ACCESS_TO_PRODUCTS)
  }
  get userIds() {
    return this.subUser?._id ? [this.subUser?._id, ...this.selectedUserIds] : this.selectedUserIds
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
    const hasAllOption = value.some(item => item.includes('select-all-permissions'))
    const allOptionSelected = this.currentPermissionOptions.some(item => item.includes('select-all-permissions'))
    const allOptions = this.permissionsOptions.map(permission => [permission.value])
    const permissionsOptions = allOptions.filter(item => !item.includes('select-all-permissions'))
    const arraysMatch =
      value.length === permissionsOptions.length && value.every(ids => permissionsOptions.flat().includes(ids[0]))

    if (hasAllOption && !allOptionSelected) {
      this.currentPermissionOptions = allOptions
    } else if (!hasAllOption && allOptionSelected) {
      this.currentPermissionOptions = []
    } else if (arraysMatch) {
      this.currentPermissionOptions = allOptions
    } else if (allOptionSelected) {
      this.currentPermissionOptions = value.filter(item => !item.includes('select-all-permissions'))
    } else {
      this.currentPermissionOptions = value
    }
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

  onInputKeyDown(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputValue = (e.target as HTMLInputElement).value

    if ((e.key === 'Backspace' || e.key === 'Delete') && inputValue === '') {
      e.stopPropagation()
      return
    }
  }

  onChangeUsersData(data: string[]) {
    this.selectedUserIds = data
  }

  async getProduts() {
    if (isFreelancer(this.userInfo?.role)) {
      return
    }

    runInAction(() => (this.productsLoading = true))

    const responseProducts = (await PermissionsModel.getProductsPermissionsForUserByIdV2(
      this.subUser?._id,
    )) as unknown as IProducts
    const responseShops = (await PermissionsModel.getPermissionsShopsByGuidV2(this.subUser?._id)) as unknown as IShops

    runInAction(() => {
      this.products = responseProducts?.rows
      /* this.allProductsCount = responseProducts?.count
      this.selectedProductsCount = responseProducts.rows?.reduce(
        (acc: number, el: IProduct) => acc + Number(el.selected),
        0,
      ) */
      this.shops = responseShops.rows
      this.productsOptions.forEach(el => {
        if (el.selected) {
          this.currentProductOptions.push([el.value])
        } else {
          el.children?.forEach(item => {
            if (item.selected) {
              this.currentProductOptions.push([el.value, item.value])
            }
          })
        }
      })
      this.productsLoading = false
    })
  }

  async loadData() {
    runInAction(() => (this.mainLoading = true))

    await this.getGroupPermissions()
    await this.getWithoutGroupPermissions()

    if (this.isFreelancer) {
      await this.getSpecs()
    }

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
      await UserModel.onEditMySubUser({ userIds: this.userIds, ...this.editingPermissions })

      if (!this.isFreelancer) {
        await PermissionsModel.setProductsPermissionsForUser({
          userIds: this.userIds,
          productIds: this.editingProducts.productIds,
        })
      }

      if (isClient(this.userInfo?.role)) {
        await PermissionsModel.patchPermissionsShops({
          userIds: this.userIds,
          shopIds: this.editingProducts.shopIds,
        })
      }

      if (this.isFreelancer) {
        await UserModel.changeSubUserSpec(this.subUser?._id, { allowedSpec: this.selectedSpecs.flat() })
      }

      toast.success(t(TranslationKey['User permissions were changed']))
      this.onUpdateData?.()
    } catch (error) {
      toast.error(t(TranslationKey['User permissions are not changed']))
    } finally {
      this.onCloseModal?.()
    }
  }

  searchfilter(inputValue: string, path: DefaultOptionType[]) {
    if (this.isAssignPermissions) {
      return path.some(option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    } else {
      return path.some(
        option =>
          (option.asin as string)?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
          (option.label as string)?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
          (option.sku as string)?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      )
    }
  }
}
