import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {ReplyFeedbackForm} from '@components/forms/reply-feedback-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminFeedbackViewModel} from './admin-feedback-view.model'
import {styles} from './admin-feedback-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_FEEDBACK

@observer
export class AdminFeedbackViewRaw extends Component {
  viewModel = new AdminFeedbackViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedFeedback,
      showReplyFeedbackModal,
      nameSearchValue,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      requestStatus,
      drawerOpen,
      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onTriggerDrawer,
      setDataGridState,
      onChangeSortingModel,

      onChangeFilterModel,
      onChangeNameSearchValue,
      onTriggerOpenModal,

      onClickWriteBtn,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={activeCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Feedback)}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by name, email'])}
                  value={nameSearchValue}
                  onChange={onChangeNameSearchValue}
                />
              </div>

              <DataGrid
                disableVirtualization
                pagination
                useResizeContainer
                localeText={getLocalizationByLanguageTag()}
                classes={{
                  row: classNames.row,
                  footerContainer: classNames.footerContainer,
                  footerCell: classNames.footerCell,
                  toolbarContainer: classNames.toolbarContainer,
                }}
                density={densityModel}
                columns={columnsModel}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowHeight={100}
                rowsPerPageOptions={[15, 25, 50, 100]}
                loading={requestStatus === loadingStatuses.isLoading}
                components={{
                  Toolbar: DataGridCustomToolbar,
                }}
                getRowHeight={() => 'auto'}
                rows={getCurrentData()}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />

              <Modal
                openModal={showReplyFeedbackModal}
                setOpenModal={() => onTriggerOpenModal('showReplyFeedbackModal')}
              >
                <ReplyFeedbackForm
                  feedback={selectedFeedback}
                  onCloseModal={() => onTriggerOpenModal('showReplyFeedbackModal')}
                  onSubmit={onClickWriteBtn}
                />
              </Modal>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminFeedbackView = withStyles(AdminFeedbackViewRaw, styles)
