import { makeAutoObservable, runInAction } from 'mobx'

import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { ICustomProposal } from '@typings/models/proposals/custom-proposal'
import { ICustomRequest } from '@typings/models/requests/custom-request'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

export class VacantDealsDetailsViewModel {
  history?: HistoryType
  requestId?: string
  proposalId?: string
  curProposalId?: string
  showConfirmModal = false
  showRejectModal = false
  showReworkModal = false
  uploadedFiles = []
  request?: ICustomRequest
  requestProposals?: ICustomProposal
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onSubmit: () => {},
  }

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor(history: HistoryType) {
    this.history = history

    if (history.location.state) {
      // @ts-ignore
      this.requestId = history.location.state.requestId
      // @ts-ignore
      this.curProposalId = history.location.state.curProposalId
    }

    this.getDealsVacantCur()
    this.getCustomRequestById()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getCustomRequestById() {
    try {
      const result = (await RequestModel.getCustomRequestById(this.requestId)) as unknown as ICustomRequest

      runInAction(() => {
        this.request = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getDealsVacantCur() {
    try {
      const result = (await RequestProposalModel.getRequestProposalsCustomByRequestId(
        this.requestId,
      )) as unknown as ICustomProposal

      runInAction(() => {
        this.requestProposals = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmDeal(data: any) {
    try {
      await RequestProposalModel.requestProposalResultAccept(this.proposalId, { ...data })

      this.history?.push(`/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/freelance/deals-on-review`)

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickRejectDeal(data: any) {
    try {
      await RequestProposalModel.requestProposalCancel(this.proposalId, { ...data })

      this.history?.push(`/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/freelance/deals-on-review`)

      this.onTriggerOpenModal('showRejectModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickReworkDeal(data: any, files: any) {
    try {
      if (files.length) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: files, type: 'uploadedFiles' })
      }

      await RequestProposalModel.requestProposalResultToCorrect(this.proposalId, {
        ...data,
        linksToMediaFiles: this.uploadedFiles,
      })

      this.history?.push(`/${UserRoleCodeMapForRoutes[this.userInfo?.role]}/freelance/deals-on-review`)

      this.onTriggerOpenModal('showReworkModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickConfirmDealModal(id: string) {
    this.proposalId = id

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickReworkDealModal(id: string) {
    this.proposalId = id

    this.onTriggerOpenModal('showReworkModal')
  }

  onSubmitSendInForRework(id: string) {
    // @ts-ignore
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Are you sure you want to send the result for rework?']),
      onSubmit: () => {
        this.onTriggerOpenModal('showConfirmModal')
        this.onClickReworkDealModal(id)
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRejectDealModal(id: string) {
    this.proposalId = id

    this.onTriggerOpenModal('showRejectModal')
  }

  onTriggerOpenModal(modal: 'showConfirmModal' | 'showRejectModal' | 'showReworkModal') {
    this[modal] = !this[modal]
  }
}
