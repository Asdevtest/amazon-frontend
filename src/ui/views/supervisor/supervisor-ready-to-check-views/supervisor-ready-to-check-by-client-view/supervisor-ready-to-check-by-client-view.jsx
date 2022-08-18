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
                  tooltipInfoContent={t(TranslationKey['Assign several product cards to a Supervisor'])}
                  disabled={selectedRowIds.length === 0}
                  onClick={onPickupSomeItems}
                >
                  {t(TranslationKey['Take on the work of the selected'])}
                </Button>
              </div>

              <DataGrid
                checkboxSelection
                pagination
                useResizeContainer
                sx={{
                  border: 0,
                  boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                  backgroundColor: '#fff',
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

export const SupervisorReadyToCheckByClientView = withStyles(styles)(SupervisorReadyToCheckByClientViewRaw)
