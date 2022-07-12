import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {UserProfile} from '@components/screens/users-views/user-profile-view/user-profile'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AnotherProfileViewModel} from './another-user-profile-view.model'
import {styles} from './another-user-profile-view.style'

@observer
class AnotherUserProfileViewRaw extends Component {
  viewModel = new AnotherProfileViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      sortModel,
      filterModel,
      curPage,
      rowsPerPage,
      densityModel,
      columnsModel,
      requestStatus,
      drawerOpen,
      tabHistory,
      tabReview,
      user,
      headerInfoData,
      onTriggerDrawerOpen,

      getCurrentData,
      setDataGridState,
      onChangeFilterModel,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeSortingModel,
    } = this.viewModel

    return (
      <>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.User)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {user && (
                <UserProfile
                  isAnotherUser
                  user={user}
                  timer={'14 минут'}
                  headerInfoData={headerInfoData}
                  tabReview={tabReview}
                  tabHistory={tabHistory}
                />
              )}

              {user &&
              [
                mapUserRoleEnumToKey[UserRole.RESEARCHER],
                mapUserRoleEnumToKey[UserRole.SUPERVISOR],
                mapUserRoleEnumToKey[UserRole.BUYER],
              ].includes(user.role) ? (
                <>
                  <Typography variant="h6">{t(TranslationKey['Active offers on the commodity exchange'])}</Typography>

                  <DataGrid
                    pagination
                    useResizeContainer
                    sx={{
                      border: 0,
                      boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                      backgroundColor: '#fff',
                    }}
                    localeText={getLocalizationByLanguageTag()}
                    sortModel={sortModel}
                    filterModel={filterModel}
                    page={curPage}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[15, 25, 50, 100]}
                    rows={getCurrentData()}
                    rowHeight={100}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    density={densityModel}
                    columns={columnsModel}
                    loading={requestStatus === loadingStatuses.isLoading}
                    onSortModelChange={onChangeSortingModel}
                    onPageSizeChange={onChangeRowsPerPage}
                    onPageChange={onChangeCurPage}
                    onStateChange={setDataGridState}
                    onFilterModelChange={model => onChangeFilterModel(model)}
                  />
                </>
              ) : null}
            </MainContent>
          </Appbar>
        </Main>
      </>
    )
  }
}

export const AnotherUserProfileView = withStyles(styles)(AnotherUserProfileViewRaw)
