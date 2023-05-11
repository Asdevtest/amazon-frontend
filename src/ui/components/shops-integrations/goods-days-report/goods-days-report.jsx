import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {WithSearchSelect} from '@components/shared/selects/with-search-select'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {GoodsDaysReportModel} from './goods-days-report.model'
import {styles} from './goods-days-report.style'

@observer
class GoodsDaysReportRaw extends Component {
  viewModel = new GoodsDaysReportModel({history: this.props.history, curShop: this.props.curShop})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      successModalText,
      selectedRows,
      confirmModalSettings,
      currentShop,
      shopsData,
      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      showConfirmModal,
      showSuccessModal,

      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onClickShopBtn,
      changeColumnsModel,
      onTriggerOpenModal,
      onSelectionModel,
      onClickDeleteBtn,
    } = this.viewModel
    const {classes: className} = this.props

    return (
      <React.Fragment>
        <div>
          <div className={className.shopsFiltersWrapper}>
            <WithSearchSelect
              selectedItemName={
                (!currentShop?._id && t(TranslationKey['All shops'])) || (currentShop && currentShop.name)
              }
              data={shopsData.filter(shop => currentShop?.id !== shop._id)}
              searchFields={['name']}
              firstItems={
                <>
                  {currentShop?._id && (
                    <Button
                      disabled={!currentShop?._id}
                      // tooltipInfoContent={t(TranslationKey['Filter for sorting by store'])}
                      className={className.button}
                      variant="text"
                      color="primary"
                      onClick={onClickShopBtn}
                    >
                      {t(TranslationKey['All shops'])}
                    </Button>
                  )}
                </>
              }
              onClickSelect={shop => onClickShopBtn(shop)}
            />
          </div>

          <div className={className.btnsWrapper}>
            <Button
              danger
              disabled={!selectedRows.length || selectedRows.length > 1}
              variant="contained"
              onClick={onClickDeleteBtn}
            >
              {t(TranslationKey.Remove)}
            </Button>
          </div>

          <div className={className.dataGridWrapper}>
            <MemoDataGrid
              pagination
              useResizeContainer
              checkboxSelection
              localeText={getLocalizationByLanguageTag()}
              classes={{
                row: className.row,
                root: className.root,
                footerContainer: className.footerContainer,
                footerCell: className.footerCell,
                toolbarContainer: className.toolbarContainer,
              }}
              selectionModel={selectedRows}
              sortModel={sortModel}
              filterModel={filterModel}
              page={curPage}
              pageSize={rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={getCurrentData()}
              // rowHeight={100}
              getRowHeight={() => 'auto'}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
              }}
              componentsProps={{
                toolbar: {
                  columsBtnSettings: {columnsModel, changeColumnsModel},
                },
              }}
              density={densityModel}
              columns={columnsModel}
              loading={requestStatus === loadingStatuses.isLoading}
              onSelectionModelChange={onSelectionModel}
              onSortModelChange={onChangeSortingModel}
              onPageSizeChange={onChangeRowsPerPage}
              onPageChange={onChangeCurPage}
              onStateChange={setDataGridState}
              onFilterModelChange={model => onChangeFilterModel(model)}
            />
          </div>

          <SuccessInfoModal
            openModal={showSuccessModal}
            setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
            title={successModalText}
            successBtnText={t(TranslationKey.Ok)}
            onClickSuccessBtn={() => {
              onTriggerOpenModal('showSuccessModal')
            }}
          />

          <ConfirmationModal
            isWarning={confirmModalSettings.isWarning}
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={confirmModalSettings.title}
            message={confirmModalSettings.message}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={confirmModalSettings.onSubmit}
            onClickCancelBtn={confirmModalSettings.onCancel}
          />
        </div>
      </React.Fragment>
    )
  }
}

export const GoodsDaysReport = withStyles(GoodsDaysReportRaw, styles)
