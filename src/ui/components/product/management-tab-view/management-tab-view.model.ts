import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

import { History } from 'history'
import { makeAutoObservable, runInAction } from 'mobx'

import { UserRolesForAdminProduct } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AdministratorModel } from '@models/administrator-model'
import { ProductModel } from '@models/product-model'

import { IHistory } from '../../../../types/history'
import { IProduct } from '../../../../types/product'
import { DataIdsType, MemberType, Members } from './management-tab-view.types'

export class ManagementTabViewModel {
  history: History<unknown>
  requestStatus = ''

  private initialMember: MemberType = { _id: '', name: '' }
  private initialDataIds: DataIdsType = {
    productId: '',
    buyerId: '',
    supervisorId: '',
    clientId: '',
  }
  private productIdFromUrl: string | null = new URL(window.location.href).searchParams.get('product-id')
  private isEmptyStore = false
  private dataIds: DataIdsType = this.initialDataIds
  private product: IProduct | undefined = undefined

  client: MemberType = this.initialMember
  clients: MemberType[] = []
  buyer: MemberType = this.initialMember
  buyers: MemberType[] = []
  supervisor: MemberType = this.initialMember
  supervisors: MemberType[] = []
  researcher: MemberType = this.initialMember
  researchers: MemberType[] = []

  isDisabledClient = true
  isDisabledBuyer = true
  isDisabledSupervisor = true
  isDisabledResearcher = true

  isEditableClient = false
  isEditableBuyer = false
  isEditableSupervisor = false
  isEditableResearcher = false

  constructor({ history }: IHistory) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  private setRequestStatus(requestStatus: string) {
    this.requestStatus = requestStatus
  }

  async initialize() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      if (this.productIdFromUrl) {
        await this.onGetProduct(this.productIdFromUrl)
      }

      const promises = Object.keys(UserRolesForAdminProduct).map(roleCode =>
        AdministratorModel.getUsersByRole(roleCode),
      )
      const result = await Promise.all(promises)
      const [clients, supervisors, researchers, buyers] = result

      runInAction(() => {
        this.clients = clients
        this.supervisors = supervisors
        this.researchers = researchers
        this.buyers = buyers
      })

      this.client = this.findMemberById(this.clients, this.product?.client?._id, this.client)
      this.buyer = this.findMemberById(this.buyers, this.product?.buyer?._id, this.buyer)
      this.supervisor = this.findMemberById(this.supervisors, this.product?.checkedBy?._id, this.supervisor)
      this.researcher = this.findMemberById(this.researchers, this.product?.createdBy?._id, this.researcher)

      this.updateDataIdsAndDisabledFlags()

      this.setRequestStatus(loadingStatuses.success)
    } catch (e) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  private async onGetProduct(id: string) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await ProductModel.getProductById(id)

      runInAction(() => {
        this.product = result
      })

      const currentProductStatus = Number(this.product?.status)
      this.isEmptyStore = this.product?.shopIds?.length === 0
      this.isEditableClient = currentProductStatus === 200 || (currentProductStatus === 275 && this.isEmptyStore)
      this.isEditableBuyer = currentProductStatus <= 200 || (currentProductStatus === 275 && this.isEmptyStore)
      this.isEditableSupervisor = true
      this.isEditableResearcher = currentProductStatus < 200

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onUpdateMember() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.bindOrUnbindUserToProduct(this.dataIds)

      if (this.productIdFromUrl) {
        await this.onGetProduct(this.productIdFromUrl)
      }

      this.updateDataIdsAndDisabledFlags()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  private onMemberChange = (event: SelectChangeEvent<string>, memberType: number) => {
    const selectedMemberId = event.target.value

    let selectedMember = null

    switch (memberType) {
      case Members.Client:
        selectedMember = this.clients.find(member => member._id === selectedMemberId)
        this.client = selectedMember || this.initialMember
        this.updateDataIdsAndDisabledFlags()
        break
      case Members.Buyer:
        selectedMember = this.buyers.find(member => member._id === selectedMemberId)
        this.buyer = selectedMember || this.initialMember
        this.updateDataIdsAndDisabledFlags()
        break
      case Members.Supervisor:
        selectedMember = this.supervisors.find(member => member._id === selectedMemberId)
        this.supervisor = selectedMember || this.initialMember
        this.updateDataIdsAndDisabledFlags()
        break
      case Members.Researcher:
        selectedMember = this.researchers.find(member => member._id === selectedMemberId)
        this.researcher = selectedMember || this.initialMember
        this.updateDataIdsAndDisabledFlags()
        break
      default:
        break
    }
  }

  onChangeClient(event: SelectChangeEvent<string>) {
    this.onMemberChange(event, Members.Client)
  }

  onChangeBuyer(event: SelectChangeEvent<string>) {
    this.onMemberChange(event, Members.Buyer)
  }

  onChangeSupervisor(event: SelectChangeEvent<string>) {
    this.onMemberChange(event, Members.Supervisor)
  }

  onChangeResearcher(event: SelectChangeEvent<string>) {
    this.onMemberChange(event, Members.Researcher)
  }

  private updateDataIdsAndDisabledFlags() {
    this.dataIds = {
      productId: this.product?._id ?? '',
      buyerId: this.buyer._id,
      supervisorId: this.supervisor._id,
      clientId: this.client._id,
    }

    const foundResearcher = this.researchers?.find(member => member._id === this.product?.createdBy?._id)

    this.isDisabledClient = this.client._id === (this.product?.client?._id ?? '')
    this.isDisabledBuyer = this.buyer._id === (this.product?.buyer?._id ?? '')
    this.isDisabledSupervisor = this.supervisor._id === (this.product?.checkedBy?._id ?? '')
    this.isDisabledResearcher = foundResearcher ? this.researcher._id === (this.product?.createdBy?._id ?? '') : true
  }

  private findMemberById(members: MemberType[], memberId: string | undefined, defaultValue: MemberType): MemberType {
    return members.find(member => member._id === memberId) || defaultValue
  }
}
