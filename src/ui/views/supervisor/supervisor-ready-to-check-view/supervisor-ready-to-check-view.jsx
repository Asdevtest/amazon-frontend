import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
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
import {TableBodyRow} from '@components/table-rows/supervisor/ready-to-check-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/supervisor/ready-to-check-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {SupervisorReadyToCheckViewModel} from './supervisor-ready-to-check-view.model'
import {styles} from './supervisor-ready-to-check-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorReadyToCheckView

const navbarActiveCategory = 1

@observer
class SupervisorReadyToCheckViewRaw extends Component {
  viewModel = new SupervisorReadyToCheckViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      selectedProducts,
      productsReadyToCheck,
      rowsPerPage,
      curPage,
      onSelectProduct,
      onTriggerDrawerOpen,
      onChangePage,
      onChangeRowsPerPage,
      onClickCalculateFees,
      onDoubleClickTableRow,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onSelectProduct,
      onClickCalculateFees,
      onDoubleClickTableRow,
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
                  data={productsReadyToCheck}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(productsReadyToCheck.length / rowsPerPage)}
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

export const SupervisorReadyToCheckView = withStyles(styles)(SupervisorReadyToCheckViewRaw)
