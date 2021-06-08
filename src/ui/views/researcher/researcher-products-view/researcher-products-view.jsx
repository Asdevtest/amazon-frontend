import React, {Component} from 'react'

import {Box, Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {RESEARCHER_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
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
      onClickCheckBtn,
      onClickAddBtn,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFormFields,
    } = this.viewModel

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
              <Paper className={this.props.classes.card}>
                <Typography variant="h3">{textConsts.cardMainTitle}</Typography>
                <Field
                  label={textConsts.linkAmazon}
                  value={formFields.amazonLink}
                  onChange={onChangeFormFields('amazonLink')}
                />
                <Field
                  label={textConsts.codeOfGood}
                  calue={formFields.productCode}
                  onChange={onChangeFormFields('productCode')}
                />
                <Box className={this.props.classes.boxBtn}>
                  <Button className={this.props.classes.button} onClick={onClickCheckBtn}>
                    {textConsts.buttonCheck}
                  </Button>
                  <SuccessButton onClick={onClickAddBtn}>{textConsts.buttonAdd}</SuccessButton>
                </Box>
              </Paper>

              <Typography variant="h4">{textConsts.mainTitle}</Typography>

              <Table
                currentPage={curPage}
                data={products}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(products.length / rowsPerPage)}
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
  renderHeadRow = (<TableHeadRow headCells={RESEARCHER_HEAD_CELLS} />)
}

export const ResearcherProductsView = withStyles(styles)(ResearcherProductsViewRaw)
