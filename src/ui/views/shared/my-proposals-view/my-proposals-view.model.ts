/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { Specs } from '@typings/enums/specs'
import { IProposal } from '@typings/models/proposals/proposal'
import { IRequest } from '@typings/models/requests/request'

import { additionalFields, executedStatuses, fieldsForSearch, inTheWorkStatuses } from './my-proposals-view.constants'
import { ProposalsCondition } from './my-proposals-view.types'
import { observerConfig } from './observer-config'
import { proposalsColumns } from './proposals-columns'

export class MyProposalsViewModel extends DataGridFilterTableModel {
  currentProposal: IProposal | null = null
  currentRequest: IRequest | null = null

  selectedSpecType = Specs.DEFAULT

  showRequestDetailModal = false
  showConfirmModal = false
  showRequestDesignerResultModal = false
  showRequestDesignerResultClientModal = false
  showMainRequestResultModal = false
  showRequestResultModal = false

  switcherCondition = ProposalsCondition.IN_THE_WORK

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ allProposals }: { allProposals: boolean }) {
    const rowHandlers = {
      onClickDeleteButton: (proposalId: string, proposalStatus: keyof typeof RequestProposalStatus) =>
        this.onClickDeleteBtn(proposalId, proposalStatus),
      onClickEditButton: (requestId: string, proposalId: string) => this.onClickEditBtn(requestId, proposalId),
      onClickResultButton: (proposalId: string) => this.onClickResultBtn(proposalId),
      onClickOpenButton: (requestId: string) => this.onClickOpenBtn(requestId),
      onChangePerformer: (id: string, userId: string) => this.onChangePerformer(id, userId),
    }

    const columnsModel = proposalsColumns(rowHandlers)

    const additionalPropertiesGetFilters = () => {
      const isDefaultSpecType = this.selectedSpecType === Specs.DEFAULT

      return {
        ...(!isDefaultSpecType ? { specType: { $eq: this.selectedSpecType } } : {}),
      }
    }

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: this.switcherCondition,
      },
    })

    const operatorsSettings = {
      sub: '$any',
    }

    super({
      getMainDataMethod: allProposals
        ? RequestProposalModel.getRequestProposalsPagMyAll
        : RequestProposalModel.getRequestProposalsPagMy,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, additionalFields),
      mainMethodURL: allProposals ? 'request-proposals/pag/my_all?' : 'request-proposals/pag/my?',
      fieldsForSearch,
      tableKey: allProposals ? DataGridTablesKeys.FREELANCER_ALL_PROPOSALS : DataGridTablesKeys.FREELANCER_MY_PROPOSALS,
      additionalPropertiesGetFilters,
      defaultFilterParams,
      operatorsSettings,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, observerConfig)

    this.initHistory()
    this.getTableSettingsPreset()
  }

  onClickDeleteBtn(proposalId: string, proposalStatus: keyof typeof RequestProposalStatus) {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Are you sure you want to cancel the proposal?']),
      onSubmit: () => {
        this.cancelProposalHandler(proposalId, proposalStatus)
        this.onTriggerOpenModal('showConfirmModal')
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async cancelProposalHandler(proposalId: string, proposalStatus: keyof typeof RequestProposalStatus) {
    try {
      switch (proposalStatus) {
        case RequestProposalStatus.CREATED:
        case RequestProposalStatus.OFFER_CONDITIONS_REJECTED:
        case RequestProposalStatus.OFFER_CONDITIONS_CORRECTED:
          await RequestProposalModel.requestProposalCancelBeforDeal(proposalId)
          break
        default:
          await RequestProposalModel.requestProposalCancel(proposalId)
      }

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  onChangeRadioButtonOption(event: CheckboxChangeEvent) {
    this.selectedSpecType = event?.target?.value

    this.getCurrentData()
  }

  onClickEditBtn(requestId: string, proposalId: string) {
    this.history.push(
      `/${
        // @ts-ignore
        UserRoleCodeMapForRoutes[this.userInfo?.role]
      }/freelance/my-proposals/edit-proposal?proposalId=${proposalId}&requestId=${requestId}`,
    )
  }

  onClickOpenBtn(requestId: string) {
    window
      ?.open?.(
        `${window.location.origin}/${
          // @ts-ignore
          UserRoleCodeMapForRoutes[this.userInfo?.role]
        }/freelance/my-proposals/custom-search-request?request-id=${requestId}`,
        '_blank',
      )
      ?.focus?.()
  }

  async getProposalById(proposalId: string) {
    try {
      const response = await RequestProposalModel.getRequestProposalsCustom(proposalId)
      runInAction(() => {
        this.currentProposal = response as unknown as IProposal
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getRequestById(requestId: string) {
    try {
      const response = await RequestModel.getCustomRequestById(requestId)
      runInAction(() => {
        this.currentRequest = response as unknown as IRequest
      })
    } catch (error) {
      console.error(error)
    }
  }
  async onClickResultBtn(proposalId: string) {
    await this.getProposalById(proposalId)

    if (
      executedStatuses.includes(this.currentProposal?.proposal?.status as string) &&
      // @ts-ignore
      this.currentProposal?.request?.spec?.title === freelanceRequestType.DESIGNER
    ) {
      this.onTriggerOpenModal('showRequestDesignerResultClientModal')
    } else if (
      inTheWorkStatuses.includes(this.currentProposal?.proposal?.status as string) &&
      // @ts-ignore
      this.currentProposal?.request?.spec?.title === freelanceRequestType.DESIGNER
    ) {
      this.onTriggerOpenModal('showRequestDesignerResultModal')
      // @ts-ignore
    } else if (this.currentProposal?.request?.spec?.title === freelanceRequestType.BLOGGER) {
      this.onTriggerOpenModal('showRequestResultModal')
    } else {
      this.onTriggerOpenModal('showMainRequestResultModal')
    }
  }

  onOpenRequestDetailModal(id: string) {
    if (window?.getSelection?.()?.toString?.()) {
      return
    }

    try {
      this.getRequestById(id)
      this.onTriggerOpenModal('showRequestDetailModal')
    } catch (error) {
      console.error(error)
    }
  }

  onClickChangeCatigory(event: CheckboxChangeEvent) {
    const currentValue = event?.target?.value
    this.switcherCondition = currentValue

    this.getCurrentData()
  }

  async onClickSendAsResult({
    message,
    files,
    amazonOrderId,
    publicationLinks,
    sourceLink,
  }: {
    message: string
    files: any[]
    amazonOrderId: string
    publicationLinks: string
    sourceLink: string
  }) {
    try {
      let loadedFiles: string[] = []

      if (files.length) {
        // @ts-ignore
        loadedFiles = await onSubmitPostImages.call(this, {
          images: typeof files[0] === 'object' && 'fileLink' in files[0] ? files.map(el => el.fileLink) : files,
          type: 'loadedFiles',
        })
      }

      if (this.currentProposal?.proposal?.status === RequestProposalStatus.TO_CORRECT) {
        await RequestProposalModel.requestProposalResultCorrected(this.currentProposal.proposal._id, {
          reason: message,
          linksToMediaFiles: loadedFiles,
        })
      } else if (
        this.currentProposal?.proposal?.status === RequestProposalStatus.CREATED ||
        this.currentProposal?.proposal?.status === RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
        this.currentProposal?.proposal?.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED
      ) {
        await RequestProposalModel.requestProposalCorrected(this.currentProposal.proposal._id, {
          reason: message,
          linksToMediaFiles: loadedFiles,
        })
      } else {
        if (this.currentProposal?.proposal?.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
          await RequestProposalModel.requestProposalReadyToVerify(this.currentProposal.proposal._id)
        }
      }

      const filesIds = files.map((el: any) => el._id)

      const curentMediaIds = this.currentProposal?.proposal?.media?.map(el => el._id)

      const mediaToRemoveIds = curentMediaIds?.filter(el => !filesIds.includes(el))

      if (mediaToRemoveIds?.length) {
        await RequestModel.editRequestsMediaMany(mediaToRemoveIds.map(el => ({ _id: el, proposalId: null })))
      }

      await RequestProposalModel.requestProposalResultEdit(this.currentProposal?.proposal?._id, {
        result: message,
        media: loadedFiles?.map((el, i) => ({
          fileLink: el,
          commentByPerformer: typeof files[0] === 'object' ? files[i]?.commentByPerformer : '',
          _id: this.currentProposal?.proposal?.media?.some(item => item._id === files[i]?._id) ? files[i]?._id : null,
          index: i,
        })),
        ...(amazonOrderId && { amazonOrderId }),
        ...(publicationLinks && { publicationLinks }),
        ...(sourceLink && {
          sourceFiles: [
            {
              sourceFile: sourceLink,
              comments: '',
            },
          ],
        }),
      })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onChangePerformer(id: string, userId: string) {
    try {
      await RequestProposalModel.onChangePerformer(id, userId)
      toast.success(t(TranslationKey['Performer was changed successfully']))

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
