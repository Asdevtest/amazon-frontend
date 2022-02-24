import TableRowsIcon from '@mui/icons-material/TableRows'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {tableViewMode} from '@constants/table-view-modes'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {VacantRequestsViewModel} from './vacant-requests-view.model'
import {styles} from './vacant-requests-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerProductsRequestsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 0

@observer
class VacantRequestsViewRaw extends Component {
  viewModel = new VacantRequestsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {viewMode, getCurrentData, drawerOpen, onTriggerDrawerOpen, onClickViewMore, onChangeViewMode} =
      this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.tablePanelWrapper}>
                <div className={classNames.tablePanelViewWrapper}>
                  <Typography className={classNames.tablePanelViewText}>{'Вид'}</Typography>

                  <ToggleButtonGroup exclusive value={viewMode} onChange={onChangeViewMode}>
                    <ToggleButton value={tableViewMode.LIST}>
                      <TableRowsIcon color="primary" />
                    </ToggleButton>
                    <ToggleButton value={tableViewMode.BLOCKS}>
                      <ViewModuleIcon color="primary" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>

              <Grid
                container
                classes={{root: classNames.dashboardCardWrapper}}
                spacing={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                {getCurrentData().map(item =>
                  viewMode === tableViewMode.LIST ? (
                    <VacantRequestListCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
                  ) : (
                    <VacantRequestShortCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
                  ),
                )}
              </Grid>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const VacantRequestsView = withStyles(styles)(VacantRequestsViewRaw)
