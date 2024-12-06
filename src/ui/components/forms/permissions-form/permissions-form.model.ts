import { RadioChangeEvent } from 'antd'
import { DefaultOptionType } from 'antd/es/cascader'
import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { KeyboardEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { PermissionsModel } from '@models/permissions-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { Roles } from '@typings/enums/roles'
import { Specs } from '@typings/enums/specs'
import { isAdmin, isBuyer, isClient, isFreelancer, isStorekeeper } from '@typings/guards/roles'
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
import { PermissionsTab, SELECT_ALL_PERMISSION, SELECT_ALL_PRODUCTS, WITHOUT_GROUP } from './permissions-form.config'

export class PermissionsFormModel {
  permissionTab = PermissionsTab.ASSIGN_PERMISSIONS
  withoutGroupPermissions: IPermission[] = []
  groupPermissions: IPermissionGroup[] = []
  mainLoading = false
  productsLoading = false
  buttonLoading = false
  specs: ISpec[] = []
  selectedSpecs: Specs[] = []
  shops: IShop[] = []
  products: IProduct[] = []
  selectedUserIds: string[] = []
  currentPermissionOptions: string[][] = []
  currentProductOptions: string[][] = []
  searchFocus = false
  subUser?: IFullUser
  onCloseModal?: () => void
  onUpdateData?: () => void
  searchValue: string = ''
  currentMultupleRole?: Roles

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
            value: WITHOUT_GROUP,
            children: this.withoutGroupPermissions.map(el => ({
              label: el.title,
              value: el._id,
              title: el.description,
            })),
          }
        : null

    return [
      { label: 'Выбрать все', value: SELECT_ALL_PERMISSION, children: undefined },
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
  get isAdmin() {
    return isAdmin(this.userInfo?.role)
  }
  get hasExpiredRoles() {
    return this.isFreelancer || isStorekeeper(this.userInfo?.role) || this.isAdmin
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
            value: WITHOUT_GROUP,
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

    return [
      { label: 'Выбрать все', value: SELECT_ALL_PRODUCTS, children: undefined, selected: false },
      ...(extraOption ? [extraOption] : []),
      ...mainOptions,
    ]
  }
  get editingPermissions() {
    const permissions: string[] = []
    const permissionGroups: string[] = []

    this.currentPermissionOptions.forEach(el => {
      const [groupId, permissionId] = el

      if (permissionId) {
        permissions.push(permissionId)
      } else if (groupId === WITHOUT_GROUP) {
        this.withoutGroupPermissions.forEach(permission => permissions.push(permission._id))
      } else if (groupId !== SELECT_ALL_PERMISSION) {
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
      } else if ([WITHOUT_GROUP, SELECT_ALL_PRODUCTS].includes(shopId)) {
        this.products.forEach(product => productIds.push(product._id))
      } else if (shopId && !productId && isBuyer(this.userInfo?.role)) {
        const shop = this.shops.find(({ _id }) => _id === shopId)

        if (shop?.products) {
          shop.products.forEach(({ _id }) => productIds.push(_id))
        }
      } else if (shopId) {
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
  get disableSubmit() {
    const hasEnoughUsers = this.subUser ? this.userIds.length > 0 : this.userIds.length >= 2

    return this.mainLoading || !hasEnoughUsers
  }
  get showRolesSelect() {
    return this.subUser && this.subUser?.allowedRoles?.length > 1 && this.isAdmin
  }

  constructor({ subUser, onCloseModal, onUpdateData }: PermissionsFormProps) {
    this.subUser = subUser

    if (this.isAdmin) {
      this.currentMultupleRole = subUser?.role
    }

    this.onCloseModal = onCloseModal
    this.onUpdateData = onUpdateData

    this.loadData()
    this.initSelectedSpecs()

    reaction(
      () => this.currentMultupleRole,
      () => {
        if (this.currentMultupleRole) {
          this.loadData()
        }
      },
    )

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangePermissionTab(event: RadioChangeEvent) {
    this.permissionTab = event.target.value
  }

  onChangePermissionOptions(value: string[][]) {
    const hasAllOption = value.some(item => item.includes(SELECT_ALL_PERMISSION))
    const allOptionSelected = this.currentPermissionOptions.some(item => item.includes(SELECT_ALL_PERMISSION))
    const allOptions = this.permissionsOptions.map(permission => [permission.value])
    const permissionsOptions = allOptions.filter(item => !item.includes(SELECT_ALL_PERMISSION))
    const arraysMatch =
      value.length === permissionsOptions.length &&
      value.every(ids => permissionsOptions.flat().includes(ids[1] || ids[0]))

    if (hasAllOption && !allOptionSelected) {
      this.currentPermissionOptions = allOptions
    } else if (!hasAllOption && allOptionSelected) {
      this.currentPermissionOptions = []
    } else if (arraysMatch) {
      this.currentPermissionOptions = allOptions
    } else if (allOptionSelected) {
      this.currentPermissionOptions = value.filter(item => !item.includes(SELECT_ALL_PERMISSION))
    } else {
      this.currentPermissionOptions = value
    }
  }

  onChangeProductsOptions(value: string[][]) {
    const hasAllOption = value.some(item => item.includes(SELECT_ALL_PRODUCTS))
    const allOptionSelected = this.currentProductOptions.some(item => item.includes(SELECT_ALL_PRODUCTS))
    const allOptions = this.productsOptions.map(permission => [permission.value])
    const productsOptions = allOptions.filter(item => !item.includes(SELECT_ALL_PRODUCTS))
    const arraysMatch =
      value.length === productsOptions.length && value.every(ids => productsOptions.flat().includes(ids[1] || ids[0]))

    if (hasAllOption && !allOptionSelected) {
      this.currentProductOptions = allOptions
    } else if (!hasAllOption && allOptionSelected) {
      this.currentProductOptions = []
    } else if (arraysMatch) {
      this.currentProductOptions = allOptions
    } else if (allOptionSelected) {
      this.currentProductOptions = value.filter(item => !item.includes(SELECT_ALL_PRODUCTS))
    } else {
      this.currentProductOptions = value
    }
  }

  onChangeSpecs(value: Specs[]) {
    this.selectedSpecs = value
  }

  initSelectedSpecs() {
    this.subUser?.allowedSpec?.forEach(spec => this.selectedSpecs.push(spec.type))
  }

  onChangeSearchFocus(value: boolean) {
    this.searchFocus = value
  }

  onSeacrh(value: string) {
    if (value.length) {
      this.onChangeSearchFocus(true)
    } else {
      this.onChangeSearchFocus(false)
    }
  }

  onInputKeyDown(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputValue = (e.target as HTMLInputElement).value

    if ((e.key === 'Backspace' || e.key === 'Delete') && inputValue === '') {
      e.stopPropagation()
      return
    }
  }

  onChangeUsersData(userIds: string[]) {
    this.selectedUserIds = userIds
  }

  onChangeMultipleRole(role: Roles) {
    this.currentMultupleRole = role
  }

  async loadData() {
    runInAction(() => (this.mainLoading = true))

    await this.getGroupPermissions()
    await this.getWithoutGroupPermissions()

    if (this.isFreelancer) {
      await this.getSpecs()
    }

    runInAction(() => {
      const { permissionGroups, permissions } = this.subUser || {}
      this.mainLoading = false

      this.permissionsOptions.forEach(option => {
        if (permissionGroups?.includes(option.value)) {
          this.currentPermissionOptions.push([option.value])
        }

        option.children?.forEach(childOption => {
          if (permissions?.includes(childOption.value)) {
            this.currentPermissionOptions.push([option.value, childOption.value])
          }
        })
      })

      const allPermissionsExist = this.groupPermissions.every(option => permissionGroups?.includes(option._id))

      if (allPermissionsExist) {
        this.currentPermissionOptions.push([SELECT_ALL_PERMISSION])
      }
    })

    this.getProduts()
  }

  async getGroupPermissions() {
    try {
      const response = (await PermissionsModel.getGroupPermissions(
        this.currentMultupleRole || this.userInfo?.role,
      )) as IPermissionGroup[]

      runInAction(() => {
        this.groupPermissions = response || []
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.groupPermissions = []
      })
    }
  }

  async getWithoutGroupPermissions() {
    try {
      const response = (await PermissionsModel.getPermissionsPag({
        groupIds: null, // null - get permissions without groups
        role: this.currentMultupleRole || this.userInfo?.role,
      })) as IPermissions

      runInAction(() => {
        this.withoutGroupPermissions = response?.rows || []
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.withoutGroupPermissions = []
      })
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
      runInAction(() => (this.buttonLoading = true))

      await UserModel.onEditMySubUser({
        userIds: this.userIds,
        ...this.editingPermissions,
        role: this.currentMultupleRole,
      })

      if (!this.hasExpiredRoles) {
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
        await UserModel.changeSubUserSpec({ userIds: this.userIds, allowedSpec: this.selectedSpecs.flat() })
      }

      toast.success(t(TranslationKey['User permissions were changed']))
    } catch (error) {
      toast.error(t(TranslationKey['User permissions are not changed']))
    } finally {
      runInAction(() => {
        this.buttonLoading = false
        this.currentMultupleRole = undefined
      })
      this.onUpdateData?.()
      this.onCloseModal?.()
    }
  }

  async getProductsPermissions() {
    try {
      const response = (await PermissionsModel.getProductsPermissionsForUserByIdV2(
        this.subUser?._id,
      )) as unknown as IProducts

      return response.rows
    } catch (e) {
      console.error(e)
    }
  }

  async getPermissionsShops() {
    try {
      const response = (await PermissionsModel.getPermissionsShopsByGuidV2(this.subUser?._id)) as unknown as IShops

      return response.rows
    } catch (e) {
      console.error(e)
    }
  }

  async getProduts() {
    if (this.hasExpiredRoles) {
      return
    }

    runInAction(() => (this.productsLoading = true))

    const products = await this.getProductsPermissions()
    const shops = (isClient(this.userInfo?.role) || isBuyer(this.userInfo?.role)) && (await this.getPermissionsShops())

    runInAction(() => {
      this.products = products || []
      this.shops = shops || []
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

      const allProductsExist = !this.products.some(option => !option.selected)
      const allShopsExist = !this.shops.some(
        option => !option.selected && option.products?.some(child => !child.selected),
      )

      if (allProductsExist && allShopsExist) {
        this.currentProductOptions.push([SELECT_ALL_PRODUCTS])
      }

      this.productsLoading = false
    })
  }

  searchFilter(inputValue: string, path: DefaultOptionType[]) {
    this.searchValue = inputValue

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
