import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Alert, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {MyRequestsViewModel} from './my-requests-view.model'
import {styles} from './my-requests-view.style'

@observer
class MyRequestsViewRaw extends Component {
  viewModel = new MyRequestsViewModel({
    history: this.props.history,
    location: this.props.location,
    isRequestsAtWork: this.props.isRequestsAtWork,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      requestStatus,
      currentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      showConfirmModal,
      showRequestForm,
      requestFormSettings,
      onClickAddBtn,

      acceptMessage,
      showAcceptMessage,
      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,
      onClickTableRow,
      removeCustomSearchRequest,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getCellClassName = params =>
      params.row.originalData.countProposalsByStatuses.waitedProposals && classNames.waitingCheckedBacklighting

    return (
      <React.Fragment>
        <MainContent>
          <div className={classNames.placeRequestBtnWrapper}>
            <Button
              success
              tooltipInfoContent={t(TranslationKey['Opens the form to create a request'])}
              onClick={() => onClickAddBtn()}
            >
              {t(TranslationKey['Create a request'])}
            </Button>
          </div>
          <div className={classNames.datagridWrapper}>
            <MemoDataGrid
              disableVirtualization
              pagination
              localeText={getLocalizationByLanguageTag()}
              getCellClassName={getCellClassName}
              classes={{
                row: classNames.row,
                root: classNames.root,
                footerContainer: classNames.footerContainer,
                footerCell: classNames.footerCell,
                toolbarContainer: classNames.toolbarContainer,

                columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
              }}
              sortModel={sortModel}
              filterModel={filterModel}
              page={curPage}
              pageSize={rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={currentData}
              rowHeight={100}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
              }}
              density={densityModel}
              columns={columnsModel}
              loading={requestStatus === loadingStatuses.isLoading}
              onSortModelChange={onChangeSortingModel}
              onPageSizeChange={onChangeRowsPerPage}
              onPageChange={onChangeCurPage}
              onStateChange={setDataGridState}
              onFilterModelChange={model => onChangeFilterModel(model)}
              onRowDoubleClick={e => onClickTableRow(e.row)}
            />
          </div>
        </MainContent>
        <Modal openModal={showRequestForm} setOpenModal={() => onTriggerOpenModal('showRequestForm')}>
          <Typography variant="h5">{t(TranslationKey['New request'])}</Typography>
          <CustomSearchRequestForm
            setOpenModal={() => onTriggerOpenModal('showRequestForm')}
            requestToEdit={requestFormSettings.request}
            isEdit={requestFormSettings.isEdit}
            onSubmit={requestFormSettings.onSubmit}
          />
        </Modal>

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to cancel the search request?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            removeCustomSearchRequest()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
        {acceptMessage && showAcceptMessage ? (
          <div className={classNames.acceptMessageWrapper}>
            <Alert elevation={5} severity="success">
              {acceptMessage}
            </Alert>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export const MyRequestsView = withStyles(MyRequestsViewRaw, styles)
