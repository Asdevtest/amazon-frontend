/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component, createRef} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomColumnMenuComponent} from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {MyServicesInfo} from '@components/my-services/my-services-info'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ServiceDetailsViewModel} from './services-detail-view.model'
import {styles} from './services-detail-view.style'

@observer
export class ServiceDetailsViewRaw extends Component {
  chatRef = createRef()
  viewModel = new ServiceDetailsViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      curPage,
      rowCount,
      rowsPerPage,
      announcementData,
      currentData,
      filterModel,
      sortModel,
      columnVisibilityModel,
      densityModel,
      columnsModel,
      requestStatus,
      showConfirmModal,
      confirmModalSettings,

      onChangeFilterModel,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSortingModel,
      onClickBackBtn,
      onClickEditBtn,
      onTriggerOpenModal,
      onClickCloseAnnouncementBtn,
      // onClickNeedCont,
    } = this.viewModel

    const {classes: classNames} = this.props

    // console.log('currentData', currentData)

    return (
      <React.Fragment>
        <MainContent>
          <MyServicesInfo
            announcementData={announcementData}
            onClickEditBtn={onClickEditBtn}
            onClickBackBtn={onClickBackBtn}
            onClickCloseAnnouncementBtn={onClickCloseAnnouncementBtn}
          />

          <div className={classNames.dataGridWrapper}>
            <MemoDataGrid
              disableVirtualization
              pagination
              useResizeContainer
              localeText={getLocalizationByLanguageTag()}
              classes={{
                row: classNames.row,
                root: classNames.root,
                footerContainer: classNames.footerContainer,
                footerCell: classNames.footerCell,
                toolbarContainer: classNames.toolbarContainer,

                iconSeparator: classNames.iconSeparator,
                columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
              }}
              rowCount={rowCount}
              page={curPage}
              pageSize={rowsPerPage}
              sortModel={sortModel}
              filterModel={filterModel}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={currentData}
              rowHeight={143}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
                ColumnMenu: DataGridCustomColumnMenuComponent,
              }}
              columnVisibilityModel={columnVisibilityModel}
              density={densityModel}
              columns={columnsModel}
              loading={requestStatus === loadingStatuses.isLoading}
              onPageChange={onChangeCurPage}
              onSortModelChange={onChangeSortingModel}
              onPageSizeChange={onChangeRowsPerPage}
              onFilterModelChange={onChangeFilterModel}
              // onStateChange={setFirstRowId}
              // onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
            />
          </div>
        </MainContent>

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          isWarning={confirmModalSettings.isWarning}
          title={confirmModalSettings.confirmTitle}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ServiceDetailsView = withStyles(ServiceDetailsViewRaw, styles)
