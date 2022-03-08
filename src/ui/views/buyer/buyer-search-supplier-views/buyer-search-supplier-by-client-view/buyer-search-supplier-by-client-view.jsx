import React, {Component} from 'react'

import {TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {BUYER_PRODUCTS_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/products-view/table-body-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {BuyerSearchSupplierByClientModel} from './buyer-search-supplier-by-client-view.model'
import {styles} from './buyer-search-supplier-by-client-view.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerSearchSupplierByClientView

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
      curPage,
      productsVacant,
      rowsPerPage,
      onClickTableRowBtn,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickTableRowBtn,
    }
    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.tableWrapper}>
                <Table
                  rowsOnly
                  noRowsTitle={textConsts.noRowsTitle}
                  currentPage={curPage}
                  data={productsVacant}
                  handlerPageChange={onChangeCurPage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(productsVacant.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={tableRowHandlers}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderHeadRow = (
    <TableRow>
      {BUYER_PRODUCTS_HEAD_CELLS.map((el, i) => (
        <TableCell key={i} align={el.align}>
          {el.label}
        </TableCell>
      ))}
    </TableRow>
  )
}

export const BuyerSearchSupplierByClientView = withStyles(styles)(BuyerSearchSupplierByClientViewRaw)
