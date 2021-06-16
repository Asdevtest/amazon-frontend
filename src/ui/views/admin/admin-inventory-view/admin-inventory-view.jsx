import {Component} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {adminUsername, ADMIN_PRODUCTS_DATA} from '@constants/mocks'
import {ADMIN_PRODUCTS_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {ProductsBodyRow} from '@components/table-rows/admin/products-body-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './admin-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminInventoryView

export class AdminInventoryViewRaw extends Component {
  state = {
    drawerOpen: false,
    curPage: 1,
    rowsPerPage: 5,
    selectedProducts: [],
  }

  render() {
    const {drawerOpen, curPage, rowsPerPage} = this.state
    const activeCategory = 2
    const {classes: classNames} = this.props
    const rowsHandlers = {}

    return (
      <>
        <Navbar
          activeCategory={activeCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={this.onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5" className={classNames.example}>
                {textConsts.mainTitle}
              </Typography>
              <Table
                currentPage={curPage}
                data={ADMIN_PRODUCTS_DATA}
                handlerPageChange={this.onChangeCurPage}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(ADMIN_PRODUCTS_DATA.length / rowsPerPage)}
                BodyRow={ProductsBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
      </>
    )
  }

  renderHeadRow = (
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell />
      {ADMIN_PRODUCTS_HEAD_CELLS.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
    </TableRow>
  )
  onChangeCurPage = value => {
    this.setState({curPage: value})
  }
  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPage = 1
  }
  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }
}

export const AdminInventoryView = withStyles(styles)(AdminInventoryViewRaw)
