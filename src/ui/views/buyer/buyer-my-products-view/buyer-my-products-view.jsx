import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {BUYER_MY_PRODUCTS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

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

const textConsts = getLocalizedTexts(texts, 'ru').myProductsView

const navbarActiveCategory = 1

@observer
export class BuyerMyProductsView extends Component {
  viewModel = new BuyerMyProductsViewModel({history: this.props.history})
  state = {
    drawerOpen: false,
    rowsPerPage: 5,
    paginationPage: 1,
  }

  componentDidMount() {
    this.viewModel.getProducsMy()
  }

  render() {
    const {drawerOpen} = this.state
    const {productsMy} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.BUYER}
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
              <Typography variant="h3">{textConsts.mainTitle}</Typography>

              <Table
                currentPage={this.state.paginationPage}
                data={productsMy}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(productsMy.length / this.state.rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={this.state.rowsPerPage}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={BUYER_MY_PRODUCTS_HEAD_CELLS} />)

  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }

  onChangePagination = (e, value) => {
    this.setState({paginationPge: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPge: 1})
  }
}
