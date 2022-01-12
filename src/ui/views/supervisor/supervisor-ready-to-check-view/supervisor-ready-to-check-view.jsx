import React, {Component} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {SUPERVISOR_PRODUCTS_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/supervisor/ready-to-check-view/table-body-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {SupervisorReadyToCheckViewModel} from './supervisor-ready-to-check-view.model'
import {styles} from './supervisor-ready-to-check-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorReadyToCheckView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_READY_TO_CHECK

@observer
class SupervisorReadyToCheckViewRaw extends Component {
  viewModel = new SupervisorReadyToCheckViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      productsReadyToCheck,
      rowsPerPage,
      curPage,
      onTriggerDrawerOpen,
      onChangePage,
      onChangeRowsPerPage,
      onClickTableRowBtn,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickTableRowBtn,
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
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.SUPERVISOR}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  rowsOnly
                  currentPage={curPage}
                  data={productsReadyToCheck}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(productsReadyToCheck.length / rowsPerPage)}
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
      {SUPERVISOR_PRODUCTS_HEAD_CELLS.map((el, i) => (
        <TableCell key={i} align={el.align}>
          {el.label}
        </TableCell>
      ))}
    </TableRow>
  )
}

export const SupervisorReadyToCheckView = withStyles(styles)(SupervisorReadyToCheckViewRaw)
