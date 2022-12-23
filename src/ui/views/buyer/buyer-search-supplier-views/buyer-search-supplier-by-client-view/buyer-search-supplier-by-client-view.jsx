import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerSearchSupplierByClientModel} from './buyer-search-supplier-by-client-view.model'
import {styles} from './buyer-search-supplier-by-client-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_NEW_PRODUCTS
const navbarActiveSubCategory = 1

@observer
export class BuyerSearchSupplierByClientViewRaw extends Component {
  viewModel = new BuyerSearchSupplierByClientModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      onTriggerDrawerOpen,
      getCurrentData,
      selectedRowIds,
      columnsModel,
      requestStatus,
      showInfoModal,
      onSelectionModel,
      onTriggerOpenModal,
      onPickupSomeItems,
      setDataGridState,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={`${t(TranslationKey['Supplier search'])} - ${t(TranslationKey['From the Client'])}`}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.btnsWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={selectedRowIds.length === 0}
                  tooltipInfoContent={t(TranslationKey['Assign several supplier search tasks to a Buyer'])}
                  onClick={onPickupSomeItems}
                >
                  {t(TranslationKey['Take on the work of the selected'])}
                </Button>
              </div>
              <div className={classNames.datagridWrapper}>
                <MemoDataGrid
                  checkboxSelection
                  pagination
                  useResizeContainer
                  classes={{
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                  }}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                  }}
                  localeText={getLocalizationByLanguageTag()}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={100}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
                  onStateChange={setDataGridState}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={t(TranslationKey['Taken to Work'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const BuyerSearchSupplierByClientView = withStyles(BuyerSearchSupplierByClientViewRaw, styles)
