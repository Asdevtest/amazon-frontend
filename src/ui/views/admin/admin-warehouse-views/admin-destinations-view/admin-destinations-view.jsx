import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {AddOrEditDestinationForm} from '@components/forms/add-or-edit-destination-form'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminDestinationsViewModel} from './admin-destinations-view.model'
import {styles} from './admin-destinations-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = 2

@observer
class AdminDestinationsViewRaw extends Component {
  viewModel = new AdminDestinationsViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      destinationToEdit,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      drawerOpen,

      curPage,
      rowsPerPage,
      showAddOrEditDestinationModal,
      confirmModalSettings,
      showConfirmModal,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,
      onClickAddBtn,
      onClickCancelBtn,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onSubmitCreateDestination,
      onSubmitEditDestination,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Destinations)} history={history} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.placeAddBtnWrapper}>
                <Button success onClick={() => onClickAddBtn()}>
                  {t(TranslationKey['Add a destination'])}
                </Button>
              </div>

              <MemoDataGrid
                pagination
                useResizeContainer
                classes={{
                  root: classNames.root,
                  footerContainer: classNames.footerContainer,
                  footerCell: classNames.footerCell,
                  toolbarContainer: classNames.toolbarContainer,
                }}
                localeText={getLocalizationByLanguageTag()}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={120}
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
              />

              <Modal
                openModal={showAddOrEditDestinationModal}
                setOpenModal={() => onTriggerOpenModal('showAddOrEditDestinationModal')}
              >
                <AddOrEditDestinationForm
                  destinationToEdit={destinationToEdit}
                  onCloseModal={() => onClickCancelBtn()}
                  onCreateSubmit={onSubmitCreateDestination}
                  onEditSubmit={onSubmitEditDestination}
                />
              </Modal>

              <ConfirmationModal
                isWarning={confirmModalSettings.isWarning}
                openModal={showConfirmModal}
                setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
                title={t(TranslationKey.Attention)}
                message={confirmModalSettings.message}
                successBtnText={t(TranslationKey.Yes)}
                cancelBtnText={t(TranslationKey.No)}
                onClickSuccessBtn={confirmModalSettings.onClickSuccess}
                onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
export const AdminDestinationsView = withStyles(AdminDestinationsViewRaw, styles)
