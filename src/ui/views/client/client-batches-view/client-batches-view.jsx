import React, {Component} from 'react'

import {Box, Button, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {BATCHES_BOXES_EXAMPLES, BATCHES_HEAD_CELLS, BUYER_WAREHOUSE_LIST, BUYER_DELIVERY_LIST} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
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
import {styles} from './client-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientBatchesView

const batchesData = [
  [BATCHES_BOXES_EXAMPLES[0], BATCHES_BOXES_EXAMPLES[2]],
  [BATCHES_BOXES_EXAMPLES[1]],
  [BATCHES_BOXES_EXAMPLES[2], BATCHES_BOXES_EXAMPLES[1]],
  [BATCHES_BOXES_EXAMPLES[0]],
]

class ClientBatchesViewRaw extends Component {
  state = {
    activeCategory: 4,
    activeSubCategory: null,
    drawerOpen: false,
    selected: null,
    modalEditBoxes: false,
    rowsPerPage: 5,
    paginationPage: 1,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.buyer}
          setSubItem={this.onChangeSubCategory}
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
              <Typography variant="h3">{textConsts.mainTitle}</Typography>

              <Table
                buttons={this.renderButtons()}
                currentPage={this.state.paginationPage}
                data={batchesData}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(batchesData.length / this.state.rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow()}
                rowsPerPage={this.state.rowsPerPage}
                rowsHandlers={{
                  selected: this.state.selected,
                  onDoubleClick: this.onBatchesonDoubleClick,
                  onSelected: this.onBatchesonClick,
                }}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={this.state.modalEditBoxes} setOpenModal={this.onChangeModalEditBoxes}>
          <EditBatchModal
            batch={[[BATCHES_BOXES_EXAMPLES]]}
            setModal={this.onChangeModalEditBoxes}
            warehouseList={BUYER_WAREHOUSE_LIST}
            deliveryList={BUYER_DELIVERY_LIST}
            type={'client'}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = () => <TableHeadRow headCells={BATCHES_HEAD_CELLS} />

  renderButtons = () => (
    <Box p={2} mr={0} className={this.props.classes.buttonsWrapper}>
      <Button
        disabled={this.selected === null}
        color="secondary"
        onClick={() => this.setState({modalEditBoxes: !this.state.modalEditBoxes})}
      >
        {textConsts.editBatch}
      </Button>
    </Box>
  )

  onChangeModalEditBoxes = () => {
    this.setState({modalEditBoxes: !this.state.modalEditBoxes})
  }

  onBatchesonClick = index => {
    this.setState({selected: index})
  }

  onBatchesonDoubleClick = index => {
    this.setState({selected: index, modalEditBoxes: !this.state.modalEditBoxes})
  }

  onChangePagination = (e, value) => {
    this.setState({paginationPge: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPge: 1})
  }
  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }

  onChangeCategory = (e, value) => {
    this.setState({activeCategory: value})
  }

  onChangeSubCategory = (e, value) => {
    this.setState({activeSubCategory: value})
  }
}

const ClientBatchesView = withStyles(styles)(ClientBatchesViewRaw)

export {ClientBatchesView}
