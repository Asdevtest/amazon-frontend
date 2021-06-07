import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {SUPERVISOR_PRODUCTS_DATA, SUPERVISOR_PRODUCTS_HEAD_CELLS} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/supervisor/products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/supervisor/products-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {SupervisorReadyToCheckViewModel} from './supervisor-ready-to-check-view.model'
import {styles} from './supervisor-ready-to-check-view.style'

const textConsts = getLocalizedTexts(texts, 'en').supervisorReadyToCheckView

@observer
class SupervisorReadyToCheckViewRaw extends Component {
  viewModel = new SupervisorReadyToCheckViewModel({history: this.props.history})
  state = {
    activeCategory: 1,
    activeSubCategory: 0,
    drawerOpen: false,
    rowsPerPage: 5,
    paginationPage: 1,
    selectedProducts: [],
  }

  componentDidMount() {
    this.viewModel.getProducsVacant()
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen, selectedProducts} = this.state
    const {classes: classNames} = this.props
    const tableHandlers = {
      onSelectProduct: this.onSelectProduct,
    }
    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.supervisor}
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
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  currentPage={this.state.paginationPage}
                  data={SUPERVISOR_PRODUCTS_DATA}
                  handlerPageChange={this.onChangePagination}
                  handlerRowsPerPage={this.onChangeRowsPerPage}
                  pageCount={Math.ceil(SUPERVISOR_PRODUCTS_DATA.length / this.state.rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={this.state.rowsPerPage}
                  handlers={tableHandlers}
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

  onSelectProduct = (item, index) => {
    const {selectedProducts} = this.state
    const newSelectedProducts = [...selectedProducts]
    const findRequestIndex = selectedProducts.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedProducts.splice(findRequestIndex, 1)
    } else {
      newSelectedProducts.push(index)
    }
    console.log(newSelectedProducts)
    this.setState({selectedProducts: newSelectedProducts})
  }

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

export const SupervisorReadyToCheckView = withStyles(styles)(SupervisorReadyToCheckViewRaw)
