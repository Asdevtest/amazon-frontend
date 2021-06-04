import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {clientUsername, INVENTORY_CARD_LIST} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {InfoCard} from '@components/info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {styles} from './client-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

export class ClientInventoryViewRaw extends Component {
  state = {
    activeCategory: 2,
    activeSubCategory: null,
    drawerOpen: false,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state
    const {classes} = this.props
    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.client}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={this.onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
          >
            <MainContent>
              <Grid container justify="center" spacing={1}>
                {INVENTORY_CARD_LIST.map((el, index) => (
                  <Grid key={index} item>
                    <InfoCard color="primary" viewMore="Показать" value={el.count} title={el.label} />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h5" className={classes.someClass}>
                {textConsts.productsList}
              </Typography>
              {/* ЖДЕМ ГОТОВЫЙ КОМПОНЕНТ ОТ Евгения <InventoryTable />*/}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }
}

export const ClientInventoryView = withStyles(styles)(ClientInventoryViewRaw)
