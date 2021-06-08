import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {SUPERVISOR_PRODUCTS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/supervisor/products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/supervisor/products-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {SupervisorProductsViewModel} from './supervisor-products-view.model'
import {styles} from './supervisor-products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorProductsView

const navbarActiveCategory = 2

@observer
class SupervisorProductsViewRaw extends Component {
  viewModel = new SupervisorProductsViewModel({history: this.props.history})

  render() {
    const {
      drawerOpen,
      selectedProducts,
      productsMy,
      curPage,
      rowsPerPage,
      onChangeDrawerOpen,
      onSelectProduct,
      onChangePage,
      onChangeRowsPerPage,
      onClickTableRow,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onSelectProduct,
      onClickTableRow,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.SUPERVISOR}
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
                  selectedProducts={selectedProducts}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={SUPERVISOR_PRODUCTS_HEAD_CELLS} />)
}

export const SupervisorProductsView = withStyles(styles)(SupervisorProductsViewRaw)
