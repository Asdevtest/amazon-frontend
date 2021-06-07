import React, {Component} from 'react'

import {Box, Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {FREELANCER_HEAD_CELLS, FREELANCER_PRODUCT_LIST} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/freelancer/table-body-row'
import {TableHeadRow} from '@components/table-rows/freelancer/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/freelancerAvatar.jpg'
import {styles} from './products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerProductsView

class FreelancerProductsViewRaw extends Component {
  state = {
    activeCategory: 1,
    activeSubCategory: 0,
    drawerOpen: false,

    rowsPerPage: 5,
    paginationPage: 1,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen, rowsPerPage, paginationPage} = this.state

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.freelancer}
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
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Paper className={this.props.classes.card}>
                <Typography variant="h3">{textConsts.cardMainTitle}</Typography>
                <Field label={textConsts.linkAmazon} />
                <Field label={textConsts.codeOfGood} />
                <Box className={this.props.classes.boxBtn}>
                  <Button className={this.props.classes.button}>{textConsts.buttonChek}</Button>
                  <SuccessButton>{textConsts.buttonAdd}</SuccessButton>
                </Box>
              </Paper>

              <Typography variant="h4">{textConsts.mainTitle}</Typography>

              <Table
                currentPage={paginationPage}
                data={FREELANCER_PRODUCT_LIST}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(FREELANCER_PRODUCT_LIST.length / rowsPerPage)}
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
  renderHeadRow = (<TableHeadRow headCells={FREELANCER_HEAD_CELLS} />)

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

export const FreelancerProductsView = withStyles(styles)(FreelancerProductsViewRaw)
