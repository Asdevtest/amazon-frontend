import React, {Component} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {BUYER_PRODUCTS_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/products-view/table-body-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerProductsViewModel} from './buyer-products-view.model'
import {styles} from './buyer-products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_NEW_PRODUCTS

@observer
export class BuyerProductsViewRaw extends Component {
  viewModel = new BuyerProductsViewModel({history: this.props.history})

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
          curUserRole={UserRole.BUYER}
          activeCategory={navbarActiveCategory}
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
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.BUYER}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  rowsOnly
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

export const BuyerProductsView = withStyles(styles)(BuyerProductsViewRaw)
