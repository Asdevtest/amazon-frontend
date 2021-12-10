import React, {Component} from 'react'

import {Box, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {BATCHES_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'
import {warehouses} from '@constants/warehouses'

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

import {isNotUndefined} from '@utils/checks'
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
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      rowsPerPage,
      paginationPage,
      batches,
      selectedBatchIndex,
      showEditBoxesModal,

      onChangeDrawerOpen,
      onChangeRowsPerPage,
      onChangePagination,

      onClickTableRow,
      onDoubleClickTableRow,
      onTriggerEditBoxesModal,
    } = this.viewModel
    const {classes: className} = this.props
    const rowsHandlers = {
      onClickTableRow,
      onDoubleClickTableRow,
    }

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
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
            setDrawerOpen={onChangeDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>

              {batches !== undefined && (
                <div className={className.tableWrapper}>
                  <Table
                    renderButtons={this.renderButtons}
                    currentPage={paginationPage}
                    data={batches}
                    handlerPageChange={onChangePagination}
                    handlerRowsPerPage={onChangeRowsPerPage}
                    pageCount={Math.ceil(batches.length / rowsPerPage)}
                    BodyRow={TableBodyRow}
                    renderHeadRow={this.renderHeadRow()}
                    selectedBatchIndex={selectedBatchIndex}
                    rowsPerPage={rowsPerPage}
                    rowsHandlers={rowsHandlers}
                  />
                </div>
              )}
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showEditBoxesModal} setOpenModal={onTriggerEditBoxesModal}>
          <EditBatchModal
            batch={isNotUndefined(selectedBatchIndex) ? batches[selectedBatchIndex] : undefined}
            setModal={onTriggerEditBoxesModal}
            warehouses={warehouses}
            deliveryOptions={DELIVERY_OPTIONS}
            curUserRole={UserRole.CLIENT}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = () => <TableHeadRow headCells={BATCHES_HEAD_CELLS} />

  renderButtons = () => (
    <Box p={2} mr={0} className={this.props.classes.buttonsWrapper}>
      <Button
        disabled={this.viewModel.selectedBatchIndex === undefined}
        color="secondary"
        onClick={() => this.viewModel.onTriggerEditBoxesModal()}
      >
        {textConsts.editBatch}
      </Button>
    </Box>
  )
}

const ClientBatchesView = withStyles(styles)(ClientBatchesViewRaw)

export {ClientBatchesView}
