import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {BUYER_MY_PRODUCTS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/my-products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/buyer/my-products-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerMyProductsViewModel} from './buyer-my-products-view.model'
import {styles} from './buyer-my-products-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').myProductsView

const navbarActiveCategory = 1

@observer
export class BuyerMyProductsViewRaw extends Component {
  viewModel = new BuyerMyProductsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getProductsMy()
  }

  render() {
    const {
      productsMy,
      drawerOpen,
      curPage,
      rowsPerPage,
      onChangePage,
      onChangeRowsPerPage,
      onTriggerDrawerOpen,
      onClickTableRow,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickTableRow,
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
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  currentPage={curPage}
                  data={productsMy}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(productsMy.length / rowsPerPage)}
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

  renderHeadRow = (<TableHeadRow headCells={BUYER_MY_PRODUCTS_HEAD_CELLS} />)
}

export const BuyerMyProductsView = withStyles(styles)(BuyerMyProductsViewRaw)
