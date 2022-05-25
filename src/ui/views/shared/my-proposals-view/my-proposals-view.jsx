// import TableRowsIcon from '@mui/icons-material/TableRows'
// import ViewModuleIcon from '@mui/icons-material/ViewModule'
// import ToggleButton from '@mui/material/ToggleButton'
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {tableViewMode} from '@constants/table-view-modes'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {MyProposalsListCard} from '@components/cards/my-proposals-list-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {MyProposalsViewModel} from './my-proposals-view.model'
import {styles} from './my-proposals-view.style'

const textConsts = getLocalizedTexts(texts, 'en').myProposalsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS

@observer
class MyProposalsViewRaw extends Component {
  viewModel = new MyProposalsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      viewMode,
      getCurrentData,
      drawerOpen,
      showConfirmModal,
      onTriggerDrawerOpen,
      // onChangeViewMode,
      onTriggerOpenModal,
      onSubmitDeleteProposal,
      onClickDeleteBtn,
      onClickEditBtn,
      onClickOpenBtn,
    } = this.viewModel
    const {classes: classNames} = this.props

    const currentData = getCurrentData()

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
              {/* <div className={classNames.tablePanelWrapper}>
                <div className={classNames.tablePanelViewWrapper}>
                  <Typography className={classNames.tablePanelViewText}>{'Вид'}</Typography>

                  <ToggleButtonGroup  exclusive value={viewMode} onChange={onChangeViewMode}>
                    <ToggleButton value={tableViewMode.LIST}>
                      <TableRowsIcon color="primary" />
                    </ToggleButton>
                    <ToggleButton value={tableViewMode.BLOCKS}>
                      <ViewModuleIcon color="primary" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div> */}

              {currentData.length ? (
                <Grid
                  container
                  classes={{root: classNames.dashboardCardWrapper}}
                  spacing={3}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {currentData.map(item =>
                    viewMode === tableViewMode.LIST ? (
                      <MyProposalsListCard
                        key={item._id}
                        item={item}
                        onClickEditBtn={onClickEditBtn}
                        onClickDeleteBtn={onClickDeleteBtn}
                        onClickOpenBtn={onClickOpenBtn}
                      />
                    ) : null,
                  )}
                </Grid>
              ) : (
                <div className={classNames.emptyTableWrapper}>
                  <img src="/assets/icons/empty-table.svg" />
                  <Typography variant="h5" className={classNames.emptyTableText}>
                    {'Предложений пока нет.'}
                  </Typography>
                </div>
              )}
            </MainContent>
          </Appbar>

          <ConfirmationModal
            isWarning
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={textConsts.confirmTitle}
            message={textConsts.confirmMessage}
            successBtnText={textConsts.yesBtn}
            cancelBtnText={textConsts.noBtn}
            onClickSuccessBtn={onSubmitDeleteProposal}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />
        </Main>
      </React.Fragment>
    )
  }
}

export const MyProposalsView = withStyles(styles)(MyProposalsViewRaw)
