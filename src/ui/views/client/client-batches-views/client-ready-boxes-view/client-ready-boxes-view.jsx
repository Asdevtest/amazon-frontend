import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientReadyBoxesViewModel} from './client-ready-boxes-view.model'
import {styles} from './client-ready-boxes-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientReadyBoxesView

const activeCategory = navBarActiveCategory.NAVBAR_BATCHES
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BOXES_READY_TO_BATCH
@observer
export class ClientReadyBoxesViewRaw extends Component {
  viewModel = new ClientReadyBoxesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      showBoxViewModal,
      curBox,
      volumeWeightCoefficient,
      currentStorekeeper,
      storekeepersData,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      selectedBoxes,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onChangeFilterModel,
      setDataGridState,
      onChangeSortingModel,

      onClickStorekeeperBtn,
      onTriggerOpenModal,
      setCurrentOpenedBox,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.getValue(params.id, 'isDraft') === true && classNames.isDraftRow

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={textConsts.appbarTitle}>
            <MainContent>
              <div className={classNames.boxesFiltersWrapper}>
                <Button
                  disabled={!currentStorekeeper?._id}
                  className={clsx(classNames.button, {[classNames.selectedBoxesBtn]: !currentStorekeeper?._id})}
                  variant="text"
                  color="primary"
                  onClick={onClickStorekeeperBtn}
                >
                  {`Все склады`}
                </Button>

                {storekeepersData
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(storekeeper =>
                    storekeeper.boxesCount !== 0 ? (
                      <Button
                        key={storekeeper._id}
                        disabled={currentStorekeeper?._id === storekeeper._id}
                        className={clsx(classNames.button, {
                          [classNames.selectedBoxesBtn]: currentStorekeeper?._id === storekeeper._id,
                        })}
                        variant="text"
                        color="primary"
                        onClick={() => onClickStorekeeperBtn(storekeeper)}
                      >
                        {storekeeper.name}
                      </Button>
                    ) : null,
                  )}
              </div>

              <DataGrid
                pagination
                useResizeContainer
                classes={{
                  row: classNames.row,
                }}
                isRowSelectable={params => params.row.isDraft === false}
                getRowClassName={getRowClassName}
                selectionModel={selectedBoxes}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={150}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onFilterModelChange={model => onChangeFilterModel(model)}
                onStateChange={setDataGridState}
                onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showBoxViewModal} setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}>
          <BoxViewForm
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const ClientReadyBoxesView = withStyles(styles)(ClientReadyBoxesViewRaw)
