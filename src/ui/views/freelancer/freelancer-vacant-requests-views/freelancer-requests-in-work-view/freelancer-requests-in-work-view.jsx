import React, {Component} from 'react'

import {Divider, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {formatNormDateTime} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import avatar from '../../assets/researcherAvatar.jpg'
import {FreelancerRequestsInWorkViewModel} from './freelancer-requests-in-work-view.model'
import {styles} from './freelancer-requests-in-work-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerProductsRequestsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 1

@observer
class FreelancerRequestsInWorkViewRaw extends Component {
  viewModel = new FreelancerRequestsInWorkViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      getCurrentData,

      drawerOpen,
      showConfirmModal,
      showWarningModal,
      onTriggerOpenModal,
      onTriggerDrawerOpen,
      pushToRequestContent,
      onClickRquestCard,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.FREELANCER}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.FREELANCER}
          >
            <MainContent>
              <Grid
                container
                className={classNames.dashboardCardWrapper}
                spacing={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                {getCurrentData().map(item => (
                  <Grid key={item._id} item>
                    <div className={classNames.cardWrapper} onClick={() => onClickRquestCard(item)}>
                      <div className={classNames.cardTitleBlockWrapper}>
                        <Typography className={classNames.cardTitle}>{item.title}</Typography>

                        <Typography className={classNames.cardSubTitle}>{'Осталось 5 из 15 предложений'}</Typography>

                        <Typography>{`Срок до ${formatNormDateTime(item.timeoutAt)}`}</Typography>
                      </div>

                      <Divider orientation={'horizontal'} />

                      <div className={classNames.cardActionBlockWrapper}>
                        <div className={classNames.userInfoWrapper}>
                          <img src="/assets/img/no-photo.jpg" className={classNames.cardImg} />

                          <Typography>{'Екатерина П.'}</Typography>

                          <Typography className={classNames.userRating}>{'4.9'}</Typography>
                        </div>

                        <Divider orientation={'horizontal'} className={classNames.divider} />

                        <div className={classNames.timeInfoWrapper}>
                          <Typography className={classNames.cardPrice}>
                            {toFixedWithDollarSign(item.price, 2)}
                          </Typography>

                          <Typography className={classNames.cardTime}>{`Время на выполнение: ${
                            item.timeLimitInMinutes / 60
                          } часов `}</Typography>
                        </div>

                        <Button variant="contained" color="primary" className={classNames.actionButton}>
                          {'Предложить сделку'}
                        </Button>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </MainContent>
          </Appbar>
        </Main>
        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={textConsts.confirmMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={() => {
            pushToRequestContent()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <WarningInfoModal
          isWarning
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={textConsts.errorTitle}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const FreelancerRequestsInWorkView = withStyles(styles)(FreelancerRequestsInWorkViewRaw)
