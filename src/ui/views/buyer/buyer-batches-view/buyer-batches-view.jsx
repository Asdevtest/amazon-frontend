import React, {Component} from 'react'

import {Box, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {BATCHES_BOXES_EXAMPLES, BATCHES_HEAD_CELLS} from '@constants/mocks'
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

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerBatchesViewModel} from './buyer-batches-view.model'
import {styles} from './buyer-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').buyerBatchesView

const batchesData = [
  [BATCHES_BOXES_EXAMPLES[0], BATCHES_BOXES_EXAMPLES[2]],
  [BATCHES_BOXES_EXAMPLES[1]],
  [BATCHES_BOXES_EXAMPLES[2], BATCHES_BOXES_EXAMPLES[1]],
  [BATCHES_BOXES_EXAMPLES[0]],
]

const navbarActiveCategory = 4

@observer
class BuyerBatchesViewRaw extends Component {
  viewModel = new BuyerBatchesViewModel({history: this.props.history})

  render() {
    const {
      drawerOpen,
      curPage,
      rowsPerPage,
      selectedBatchIndex,
      showEditBoxesModal,
      onChangePage,
      onChangeRowsPerPage,
      onClickTableRow,
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
          curUserRole={UserRole.BUYER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={className.tableWrapper}>
                <Table
                  renderButtons={this.renderButtons}
                  currentPage={curPage}
                  data={batchesData}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(batchesData.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow()}
                  rowsPerPage={rowsPerPage}
                  selectedBatchIndex={selectedBatchIndex}
                  rowsHandlers={rowsHandlers}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showEditBoxesModal} setOpenModal={onTriggerEditBoxesModal}>
          <EditBatchModal
            batch={isNotUndefined(selectedBatchIndex) ? batchesData[selectedBatchIndex] : undefined}
            setModal={onTriggerEditBoxesModal}
            warehouses={warehouses}
            deliveryOptions={DELIVERY_OPTIONS}
            curUserRole={UserRole.BUYER}
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

export const BuyerBatchesView = withStyles(styles)(BuyerBatchesViewRaw)
