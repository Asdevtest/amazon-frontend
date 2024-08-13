import { makeAutoObservable, makeObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestProposalStatus, RequestProposalStatusTranslate } from '@constants/requests/request-proposal-status'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { GeneralModel } from '@models/general-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { myProposalsDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { Specs } from '@typings/enums/specs'

import {
  additionalFields,
  executedStatuses,
  fieldsForSearch,
  filtersFields,
  inTheWorkStatuses,
  switcherConditions,
} from './my-proposals-view.constants'
import { observerConfig } from './observer-config'
import { proposalsColumns } from './proposals-columns'

export class MyProposalsViewModel extends DataGridFilterTableModel {
  currentProposal = null
  currentRequest = null

  selectedProposalFilters = Object.keys(RequestProposalStatus).map(el => ({
    name: RequestProposalStatusTranslate(el),
    _id: el,
  }))

  selectedSpecType = Specs.DEFAULT

  showRequestDetailModal = false
  showConfirmModal = false
  showRequestDesignerResultModal = false
  showRequestDesignerResultClientModal = false
  showMainRequestResultModal = false
  showRequestResultModal = false

  isInTheWork = true
  switcherCondition = switcherConditions.inTheWork

  get userInfo() {
    return UserModel.userInfo
  }
  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor({ allProposals }) {
    const rowHandlers = {
      onClickDeleteButton: (proposalId, proposalStatus) => this.onClickDeleteBtn(proposalId, proposalStatus),
      onClickEditButton: (requestId, proposalId) => this.onClickEditBtn(requestId, proposalId),
      onClickResultButton: proposalId => this.onClickResultBtn(proposalId),
      onClickOpenButton: requestId => this.onClickOpenBtn(requestId),
      onChangePerformer: (id, userId) => this.onChangePerformer(id, userId),
    }

    const columnsModel = proposalsColumns(rowHandlers)

    const additionalPropertiesGetFilters = () => {
      const specTypeFilters = this.columnMenuSettings.specType.currentFilterData
      const isDefaultSpecType = this.selectedSpecType === Specs.DEFAULT

      return {
        ...(!isDefaultSpecType && specTypeFilters?.length === 0 ? { specType: { $eq: this.selectedSpecType } } : {}),
      }
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
    })

    // defaultGetCurrentDataOptions,
    // additionalPropertiesColumnMenuSettings,
    // additionalPropertiesGetFilters,
    // operatorsSettings,
    // defaultFilterParams,

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.getDataGridState()
    this.getCurrentData()

    this.setDefaultStatuses()
    makeObservable(this, observerConfig)
  }

  onClickDeleteBtn(proposalId, proposalStatus) {
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

  async cancelProposalHandler(proposalId, proposalStatus) {
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

  onChangeRadioButtonOption(event) {
    this.selectedSpecType = event.target.value
    this.getCurrentData()
  }

  onClickEditBtn(requestId, proposalId) {
    this.history.push(
      `/${
        UserRoleCodeMapForRoutes[this.userInfo.role]
      }/freelance/my-proposals/edit-proposal?proposalId=${proposalId}&requestId=${requestId}`,
    )
  }
  onClickOpenBtn(requestId) {
    window
      ?.open?.(
        `${window.location.origin}/${
          UserRoleCodeMapForRoutes[this.userInfo.role]
        }/freelance/my-proposals/custom-search-request?request-id=${requestId}`,
        '_blank',
      )
      ?.focus?.()
  }

  async getRequestsProposalsPagMy() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const method = this.allProposals
        ? RequestProposalModel.getRequestProposalsPagMyAll
        : RequestProposalModel.getRequestProposalsPagMy
      const response = await method({
        filters: this.getFilters(),
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        noCache: true,
      })

      runInAction(() => {
        this.requests = myProposalsDataConverter(response.rows)
        this.rowCount = response.count
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }
  async getProposalById(proposalId) {
    try {
      const response = await RequestProposalModel.getRequestProposalsCustom(proposalId)
      runInAction(() => {
        this.currentProposal = response
      })
    } catch (error) {
      console.error(error)
    }
  }
  async getRequestById(requestId) {
    try {
      const response = await RequestModel.getCustomRequestById(requestId)
      runInAction(() => {
        this.currentRequest = response
      })
    } catch (error) {
      console.error(error)
    }
  }
  async onClickResultBtn(proposalId) {
    await this.getProposalById(proposalId)
    if (
      executedStatuses.includes(this.currentProposal?.proposal?.status) &&
      this.currentProposal?.request.spec?.title === freelanceRequestType.DESIGNER
    ) {
      this.onTriggerOpenModal('showRequestDesignerResultClientModal')
    } else if (
      inTheWorkStatuses.includes(this.currentProposal?.proposal?.status) &&
      this.currentProposal?.request.spec?.title === freelanceRequestType.DESIGNER
    ) {
      this.onTriggerOpenModal('showRequestDesignerResultModal')
    } else if (this.currentProposal?.request.spec?.title === freelanceRequestType.BLOGGER) {
      this.onTriggerOpenModal('showRequestResultModal')
    } else {
      this.onTriggerOpenModal('showMainRequestResultModal')
    }
  }

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, this.currentSearchValue, exclusion, filtersFields, [
        'asin',
        'title',
        'humanFriendlyId',
        'skuByClient',
      ]),
    )
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatus.IS_LOADING)

      const mainUrl = this.allProposals ? 'request-proposals/pag/my_all?filters=' : 'request-proposals/pag/my?filters='

      const data = await GeneralModel.getDataForColumn(
        this.getTableByColumn(column),
        column,
        `${mainUrl}${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          const filterData =
            column === 'status'
              ? data.filter(status =>
                  this.isInTheWork ? inTheWorkStatuses.includes(status) : executedStatuses.includes(status),
                )
              : data
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: {
              ...this.columnMenuSettings[column],
              filterData,
            },
          }
        })
      }
      this.setFilterRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatus.FAILED)
      console.error(error)
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

  setDefaultStatuses() {
    this.onChangeFullFieldMenuItem(this.isInTheWork ? inTheWorkStatuses : executedStatuses, 'status')
  }

  onClickChangeCatigory(event) {
    const currentValue = event.target.value
    this.switcherCondition = currentValue

    if (currentValue === switcherConditions.inTheWork) {
      this.isInTheWork = true
    } else {
      this.isInTheWork = false
    }
    this.setDefaultStatuses()
    this.getRequestsProposalsPagMy()
  }
  async onClickSendAsResult({ message, files, amazonOrderId, publicationLinks, sourceLink }) {
    try {
      if (files.length) {
        await onSubmitPostImages.call(this, {
          images: typeof files[0] === 'object' && 'fileLink' in files[0] ? files.map(el => el.fileLink) : files,
          type: 'loadedFiles',
        })
      }
      if (this.currentProposal.proposal.status === RequestProposalStatus.TO_CORRECT) {
        await RequestProposalModel.requestProposalResultCorrected(this.currentProposal.proposal._id, {
          reason: message,
          linksToMediaFiles: this.loadedFiles,
        })
      } else if (
        this.currentProposal.proposal.status === RequestProposalStatus.CREATED ||
        this.currentProposal.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
        this.currentProposal.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED
      ) {
        await RequestProposalModel.requestProposalCorrected(this.currentProposal.proposal._id, {
          reason: message,
          linksToMediaFiles: this.loadedFiles,
        })
      } else {
        if (this.currentProposal.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
          await RequestProposalModel.requestProposalReadyToVerify(this.currentProposal.proposal._id)
        }
      }
      const filesIds = files.map(el => el._id)
      const curentMediaIds = this.currentProposal.proposal?.media?.map(el => el._id)
      const mediaToRemoveIds = curentMediaIds.filter(el => !filesIds.includes(el))
      if (mediaToRemoveIds.length) {
        await RequestModel.editRequestsMediaMany(mediaToRemoveIds.map(el => ({ _id: el, proposalId: null })))
      }
      await RequestProposalModel.requestProposalResultEdit(this.currentProposal.proposal._id, {
        result: message,
        media: this.loadedFiles.map((el, i) => ({
          fileLink: el,
          commentByPerformer: typeof files[0] === 'object' ? files[i]?.commentByPerformer : '',
          _id: this.currentProposal.proposal?.media?.some(item => item._id === files[i]?._id) ? files[i]?._id : null,
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
