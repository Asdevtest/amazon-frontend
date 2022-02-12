import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {RequestModel} from '@models/request-model'
import {RequestProposalModel} from '@models/request-proposal'
import {UserModel} from '@models/user-model'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

export class ResearcherRequestDetailCustomViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  request = undefined
  requestProposals = []
  showWarningModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.request = location.state.request
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getCustomRequestById()
      this.getCustomRequestProposalsByRequestId()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getCustomRequestById() {
    try {
      const result = await RequestModel.getCustomRequestById(this.request.request._id)

      runInAction(() => {
        this.request = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getCustomRequestProposalsByRequestId() {
    try {
      const result = await RequestModel.getRequestProposalsCustomByRequestId(this.request.request._id)

      runInAction(() => {
        this.requestProposals = result.filter(
          requestProposal => requestProposal.proposal.createdById === UserModel.userInfo._id,
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async onSubmitRequestProposalForm(formFields) {
    try {
      const result = this.requestProposal
        ? await RequestProposalModel.updateRequestProposalCustom(this.requestProposal.proposal._id, formFields)
        : await RequestProposalModel.createRequestProposalCustom(this.request.request._id, formFields)

      this.getCustomRequestProposalsByRequestId(result?.guid || this.requestProposal.proposal._id)

      this.warningInfoModalSettings = {
        isWarning: false,
        title: textConsts.successTitle,
      }

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      this.error = error

      this.warningInfoModalSettings = {
        isWarning: true,
        title: textConsts.failTitle,
      }

      this.onTriggerOpenModal('showWarningModal')
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
