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

import {isNotUndefined, isUndefined} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/adminAvatar.jpg'
import {AdminWarehouseBatchesViewModel} from './admin-warehouse-batches-view.model'
import {styles} from './admin-warehouse-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').adminBatchesView

const navbarActiveCategory = 4
const navbarActiveSubCategory = 2

@observer
class AdminWarehouseBatchesViewRaw extends Component {
  viewModel = new AdminWarehouseBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      batches,
      drawerOpen,
      curPage,
      rowsPerPage,
      selectedBatchIndex,
      showEditBoxesModal,
      onChangePage,
      onChangeRowsPerPage,
      onClickTableRow,
      onTriggerDrawerOpen,
      onTriggerEditBoxesModal,
      onDoubleClickTableRow,
    } = this.viewModel
    const {classes: className} = this.props
    const rowsHandlers = {
      onClickTableRow,
      onDoubleClickTableRow,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.ADMIN}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>

              <div className={className.tableWrapper}>
                <Table
                  currentPage={curPage}
                  data={batches}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(batches.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow()}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={rowsHandlers}
                  renderButtons={this.renderButtons}
                  selectedBatchIndex={selectedBatchIndex}
                />
              </div>
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

  renderButtons = () => {
    const {selectedBatchIndex, onTriggerEditBoxesModal} = this.viewModel
    const {classes: classNames} = this.props
    return (
      <Box p={2} mr={0} className={classNames.buttonsWrapper}>
        <Button disabled={isUndefined(selectedBatchIndex)} color="secondary" onClick={onTriggerEditBoxesModal}>
          {textConsts.editBatch}
        </Button>
      </Box>
    )
  }
}

export const AdminWarehouseBatchesView = withStyles(styles)(AdminWarehouseBatchesViewRaw)
