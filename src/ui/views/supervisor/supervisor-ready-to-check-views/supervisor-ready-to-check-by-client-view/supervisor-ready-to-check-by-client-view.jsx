import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {SupervisorReadyToCheckByClientViewModel} from './supervisor-ready-to-check-by-client-view.model'
import {styles} from './supervisor-ready-to-check-by-client-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_READY_TO_CHECK
const navbarActiveSubCategory = 1

@observer
class SupervisorReadyToCheckByClientViewRaw extends Component {
  viewModel = new SupervisorReadyToCheckByClientViewModel({history: this.props.history})

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
      changeColumnsModel,
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
            title={`${t(TranslationKey['Ready to check'])} - ${t(TranslationKey['From the Client'])}`}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.btnsWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  tooltipInfoContent={t(TranslationKey['Assign several product cards to a Supervisor'])}
                  disabled={selectedRowIds.length === 0}
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
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  componentsProps={{
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
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

export const SupervisorReadyToCheckByClientView = withStyles(SupervisorReadyToCheckByClientViewRaw, styles)
