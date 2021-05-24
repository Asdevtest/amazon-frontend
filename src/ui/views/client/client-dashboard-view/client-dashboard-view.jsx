import {Component} from 'react'

import {Button, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {clientBalance, clientUsername, exchangeSection, inventorySection, ordersSection} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {InfoCard} from '@components/info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './client-dashboard-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientDashboardView

export class ClientDashboardViewRaw extends Component {
  state = {
    activeCategory: 0,
    activeSubCategory: null,
    drawerOpen: false,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state
    const {classes} = this.props

    return (
      <>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.client}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={this.onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
          >
            <MainContent>
              <div className={classes.mb5}>
                <Typography paragraph variant="h6">
                  {textConsts.balance}
                </Typography>
                <Typography className={classes.balanceTitle}>{clientBalance}</Typography>
                <Button className={classes.mr2} color="primary" disableElevation variant="contained">
                  {textConsts.withdraw}
                </Button>
                <Button color="primary" disableElevation>
                  {textConsts.replenish}
                </Button>
              </div>
              <>
                {this.renderCardsSection(inventorySection, textConsts.inventoryTitle)}
                {this.renderCardsSection(ordersSection, textConsts.ordersTitle)}
                {this.renderCardsSection(exchangeSection, textConsts.exchangeTitle)}
              </>
            </MainContent>
          </Appbar>
        </Main>
      </>
    )
  }

  renderCardsSection = (section, title) => (
    <div className={this.props.classes.mb5}>
      <Typography paragraph variant="h5">
        {title}
      </Typography>
      <Grid container justify="center" spacing={3}>
        {section.items.map((item, index) => (
          <Grid item key={index} lg={4} sm={6} xs={12}>
            <InfoCard color={item.color} title={item.title} value={item.value} />
          </Grid>
        ))}
      </Grid>
    </div>
  )

  onChangeCategory = index => {
    this.setState({activeCategory: index})
  }

  onChangeSubCategory = index => {
    this.setState({activeSubCategory: index})
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }
}

const ClientDashboardView = withStyles(styles)(ClientDashboardViewRaw)

export {ClientDashboardView}
