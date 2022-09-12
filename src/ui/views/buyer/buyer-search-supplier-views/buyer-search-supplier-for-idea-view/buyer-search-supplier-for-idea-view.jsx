import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerSearchSupplierForIdeaModel} from './buyer-search-supplier-for-idea-view.model'
import {styles} from './buyer-search-supplier-for-idea-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_NEW_PRODUCTS
const navbarActiveSubCategory = 2

@observer
export class BuyerSearchSupplierForIdeaViewRaw extends Component {
  viewModel = new BuyerSearchSupplierForIdeaModel({history: this.props.history})

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
            title={`${t(TranslationKey['Supplier search'])} - ${t(TranslationKey['for the idea'])}`}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.btnsWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={selectedRowIds.length === 0}
                  onClick={onPickupSomeItems}
                >
                  {t(TranslationKey['Take on the work of the selected'])}
                </Button>
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  checkboxSelection
                  pagination
                  useResizeContainer
                  classes={{
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
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

export const BuyerSearchSupplierForIdeaView = withStyles(styles)(BuyerSearchSupplierForIdeaViewRaw)
