import React, {Component} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {SUPERVISOR_PRODUCTS_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/supervisor/products-view/table-body-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {SupervisorProductsViewModel} from './supervisor-products-view.model'
import {styles} from './supervisor-products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorProductsView

const navbarActiveCategory = 2

@observer
class SupervisorProductsViewRaw extends Component {
  viewModel = new SupervisorProductsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      selectedProducts,
      productsMy,
      curPage,
      rowsPerPage,
      onTriggerDrawerOpen,
      onSelectProduct,
      onChangePage,
      onChangeRowsPerPage,
      onClickTableRow,
      onClickCalculateFees,
      onClickResearcherName,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onSelectProduct,
      onClickTableRow,
      onClickCalculateFees,
      onClickResearcherName,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.SUPERVISOR}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.SUPERVISOR}
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

  renderHeadRow = (
    <TableRow>
      {SUPERVISOR_PRODUCTS_HEAD_CELLS.map((item, index) => (
        <TableCell key={index} align={item.align}>
          {item.label}
        </TableCell>
      ))}
    </TableRow>
  )
}

export const SupervisorProductsView = withStyles(styles)(SupervisorProductsViewRaw)
