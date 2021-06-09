import React, {Component} from 'react'

import {Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {RESEARCHER_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {ResearcherAddProductForm} from '@components/forms/reasearcher-add-product-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/researcher/table-body-row'
import {TableHeadRow} from '@components/table-rows/researcher/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/researcherAvatar.jpg'
import {ResearcherProductsViewModel} from './researcher-products-view.model'
import {styles} from './researcher-products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherProductsView

const navbarActiveCategory = 1

@observer
class ResearcherProductsViewRaw extends Component {
  viewModel = new ResearcherProductsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getPropducts()
  }

  render() {
    const {
      drawerOpen,
      rowsPerPage,
      curPage,
      formFields,
      products,
      error,
      actionStatus,
      onClickCheckBtn,
      onClickAddBtn,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFormFields,
      onClickTableRow,
    } = this.viewModel
    const {classes: classNames} = this.props
    const rowsHandlers = {
      onClickTableRow,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.RESEARCHER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeTriggerDrawerOpen}
          >
            <MainContent>
              <Paper className={classNames.card}>
                <Typography variant="h6">{textConsts.cardMainTitle}</Typography>
                <div className={classNames.formWrapper}>
                  <ResearcherAddProductForm
                    formFields={formFields}
                    errorMsg={error}
                    actionStatus={actionStatus}
                    onChangeFormFields={onChangeFormFields}
                    onClickCheckBtn={onClickCheckBtn}
                    onClickAddBtn={onClickAddBtn}
                  />
                </div>
              </Paper>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  currentPage={curPage}
                  data={products}
                  handlerPageChange={onChangeCurPage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(products.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={rowsHandlers}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
  renderHeadRow = (<TableHeadRow headCells={RESEARCHER_HEAD_CELLS} />)
}

export const ResearcherProductsView = withStyles(styles)(ResearcherProductsViewRaw)
