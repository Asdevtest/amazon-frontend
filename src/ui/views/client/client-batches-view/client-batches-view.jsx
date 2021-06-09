import React, {Component} from 'react'

import {Box, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {BATCHES_HEAD_CELLS, BUYER_WAREHOUSE_LIST} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {EditBatchModal} from '@components/screens/batches-view/edit-batch-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/batches-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientBatchesViewModel} from './client-batches-view.model'
import {styles} from './client-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientBatchesView

const navbarActiveCategory = 5

@observer
class ClientBatchesViewRaw extends Component {
  viewModel = new ClientBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getBatchesData()
  }

  render() {
    const {
      drawerOpen,
      batches,
      selectedRow,
      modalEditBoxes,
      rowsPerPage,
      paginationPage,
      onChangeDrawerOpen,
      onChangeRowsPerPage,
      onChangePagination,
      onBatchesonDoubleClick,
      onBatchesonClick,
      onChangeModalEditBoxes,
    } = this.viewModel
    const {classes: className} = this.props
    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>

              {batches !== undefined && (
                <div className={className.tableWrapper}>
                  <Table
                    buttons={this.renderButtons()}
                    currentPage={paginationPage}
                    data={batches}
                    handlerPageChange={onChangePagination}
                    handlerRowsPerPage={onChangeRowsPerPage}
                    pageCount={Math.ceil(batches.length / rowsPerPage)}
                    BodyRow={TableBodyRow}
                    renderHeadRow={this.renderHeadRow()}
                    rowsPerPage={rowsPerPage}
                    rowsHandlers={{
                      selected: selectedRow,
                      onDoubleClick: onBatchesonDoubleClick,
                      onSelected: onBatchesonClick,
                    }}
                  />
                </div>
              )}
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={modalEditBoxes} setOpenModal={onChangeModalEditBoxes}>
          <EditBatchModal
            batch={batches[selectedRow]}
            setModal={onChangeModalEditBoxes}
            warehouseList={BUYER_WAREHOUSE_LIST}
            deliveryList={DELIVERY_OPTIONS}
            curUserRole={userRole.CLIENT}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = () => <TableHeadRow headCells={BATCHES_HEAD_CELLS} />

  renderButtons = () => (
    <Box p={2} mr={0} className={this.props.classes.buttonsWrapper}>
      <Button
        disabled={this.viewModel.selectedRow === null}
        color="secondary"
        onClick={() => this.viewModel.onChangeModalEditBoxes()}
      >
        {textConsts.editBatch}
      </Button>
    </Box>
  )
}

const ClientBatchesView = withStyles(styles)(ClientBatchesViewRaw)

export {ClientBatchesView}
