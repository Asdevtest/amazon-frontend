import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {BUYER_MY_PRODUCTS_HEAD_CELLS} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/my-products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/buyer/my-products-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/buyerAvatar.jpg'
import {MyProductsViewModel} from './my-products-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').myProductsView

@observer
export class MyProductsView extends Component {
  viewModel = new MyProductsViewModel({history: this.props.history})
  state = {
    activeCategory: 1,
    activeSubCategory: 0,
    drawerOpen: false,
    rowsPerPage: 5,
    paginationPage: 1,
  }

  componentDidMount() {
    this.viewModel.getProducsMy()
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state
    const {productsMy} = this.viewModel

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

  onChangeCategory = (e, value) => {
    this.setState({activeCategory: value})
  }

  onChangeSubCategory = (e, value) => {
    this.setState({activeSubCategory: value})
  }

  onChangePagination = (e, value) => {
    this.setState({paginationPge: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPge: 1})
  }
}
