import React, {Component} from 'react'

import {TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/supervisor/ready-to-check-view/table-body-row'

import {t} from '@utils/translations'

import {SupervisorReadyToCheckViewModel} from './supervisor-ready-to-check-view.model'
import {styles} from './supervisor-ready-to-check-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_READY_TO_CHECK
const navbarActiveSubCategory = 0

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
      productHead,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickTableRowBtn,
    }

    const renderHeadRow = (
      <TableRow>
        {productHead.map((el, i) => (
          <TableCell key={i} align={el.align}>
            {el.label}
          </TableCell>
        ))}
      </TableRow>
    )
    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={`${t(TranslationKey['Supplier search'])} - ${t(TranslationKey['From the Researcher'])}`}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.tableWrapper}>
                <Table
                  rowsOnly
                  noRowsTitle={t(TranslationKey['No new proposals at the moment'])}
                  currentPage={curPage}
                  data={productsReadyToCheck}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(productsReadyToCheck.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={renderHeadRow}
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
}

export const SupervisorReadyToCheckView = withStyles(styles)(SupervisorReadyToCheckViewRaw)
