/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, runInAction } from 'mobx'

import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ProductModel } from '@models/product-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { roles } from './management-tab-view-constants'
import { DataIdsType, MemberType, Members } from './management-tab-view.types'

export class ManagementTabViewModel {
  requestStatus: string | undefined = undefined

  private initialMember: MemberType = { _id: '', name: '' }
  private initialDataIds: DataIdsType = {
    productId: '',
    buyerId: '',
    checkedById: '',
    clientId: '',
  }
  private productIdFromUrl: string | null = new URL(window.location.href).searchParams.get('product-id')
  // private isEmptyStore = false
  private dataIds: DataIdsType = this.initialDataIds
  private product: IProduct | undefined = undefined

  infoModalText: string | undefined = undefined
  showInfoModal = false

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

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  private setRequestStatus(requestStatus: string) {
    this.requestStatus = requestStatus
  }

  async onComponentDidMount() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      if (this.productIdFromUrl) {
        await this.onGetProduct(this.productIdFromUrl)
      }

      const promises = roles.map(role => AdministratorModel.getUsersByRole(role))
      const results = await Promise.all(promises)

      const [clients, supervisors, researchers, buyers] = results

      runInAction(() => {
        // @ts-ignore
        this.clients = clients
        // @ts-ignore
        this.supervisors = supervisors
        // @ts-ignore
        this.researchers = researchers
        // @ts-ignore
        this.buyers = buyers

        this.client = this.findMemberByIdOrPickDefailtMember(this.clients, this.product?.client?._id, this.client)
        this.buyer = this.findMemberByIdOrPickDefailtMember(this.buyers, this.product?.buyer?._id, this.buyer)
        this.supervisor = this.findMemberByIdOrPickDefailtMember(
          this.supervisors,
          this.product?.checkedBy?._id,
          this.supervisor,
        )
        this.researcher = this.findMemberByIdOrPickDefailtMember(
          this.researchers,
          this.product?.createdBy?._id,
          this.researcher,
        )
      })

      this.updateDataIdsAndDisabledFlags()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (e) {
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  private async onGetProduct(id: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await ProductModel.getProductById(id)

      runInAction(() => {
        // @ts-ignore
        this.product = result

        const currentProductStatus = Number(this.product?.status)

        // this.isEmptyStore = this.product?.shopId.length === 0 // empty store check
        this.isEditableClient = currentProductStatus === 200 || currentProductStatus === 275
        this.isEditableBuyer = currentProductStatus <= 200 || currentProductStatus === 275
        this.isEditableSupervisor = true
        this.isEditableResearcher = currentProductStatus < 200
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onUpdateMember() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await AdministratorModel.bindOrUnbindUserToProduct(this.dataIds)

      if (this.productIdFromUrl) {
        await this.onGetProduct(this.productIdFromUrl)
      }

      this.updateDataIdsAndDisabledFlags()

      runInAction(() => {
        this.infoModalText = t(TranslationKey['The members are saved!'])
      })

      this.onTriggerOpenModal()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error: any) {
      runInAction(() => {
        this.infoModalText = `${error.body.message}!`
      })

      this.onTriggerOpenModal()

      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  private onMemberChange = (event: SelectChangeEvent<string>, memberType: number) => {
    const selectedMemberId = event.target.value

    switch (memberType) {
      case Members.Client:
        this.client = this.findMemberByIdOrPickDefailtMember(this.clients, selectedMemberId, this.initialMember)
        this.updateDataIdsAndDisabledFlags()
        break
      case Members.Buyer:
        this.buyer = this.findMemberByIdOrPickDefailtMember(this.buyers, selectedMemberId, this.initialMember)
        this.updateDataIdsAndDisabledFlags()
        break
      case Members.Supervisor:
        this.supervisor = this.findMemberByIdOrPickDefailtMember(this.supervisors, selectedMemberId, this.initialMember)
        this.updateDataIdsAndDisabledFlags()
        break
      case Members.Researcher:
        this.researcher = this.findMemberByIdOrPickDefailtMember(this.researchers, selectedMemberId, this.initialMember)
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
      buyerId: this.buyer._id || null,
      checkedById: this.supervisor._id || null,
      clientId: this.client._id || null,
    }

    const foundResearcher = this.researchers?.find(member => member._id === this.product?.createdBy?._id)

    this.isDisabledClient = this.client._id === (this.product?.client?._id ?? '')
    this.isDisabledBuyer = this.buyer._id === (this.product?.buyer?._id ?? '')
    this.isDisabledSupervisor = this.supervisor._id === (this.product?.checkedBy?._id ?? '')
    this.isDisabledResearcher = foundResearcher ? this.researcher._id === (this.product?.createdBy?._id ?? '') : true
  }

  private findMemberByIdOrPickDefailtMember(
    members: MemberType[],
    memberId: string | undefined,
    defaultMember: MemberType,
  ): MemberType {
    return members.find(member => member._id === memberId) || defaultMember
  }

  onClickToggleInfoModal() {
    this.onComponentDidMount()

    this.onTriggerOpenModal()
  }

  onTriggerOpenModal() {
    this.showInfoModal = !this.showInfoModal
  }
}
