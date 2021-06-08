import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {BUYER_PRODUCTS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/buyer/products-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerProductsViewModel} from './buyer-products-view.model'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductsView

const navbarActiveCategory = 0

@observer
export class BuyerProductsView extends Component {
  viewModel = new BuyerProductsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getProducsVacant()
  }

  render() {
    const {drawerOpen, curPage, productsVacant, rowsPerPage, onChangeDrawerOpen, onChangeCurPage, onChangeRowsPerPage} =
      this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.BUYER}
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
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <Table
                currentPage={curPage}
                data={productsVacant}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(productsVacant.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={BUYER_PRODUCTS_HEAD_CELLS} />)
}
