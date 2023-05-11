import {Typography} from '@mui/material'

import {Component} from 'react'

import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'

import {t} from '@utils/translations'

import {styles} from './moderator-settings-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SETTINGS
export class ModeratorSettingsViewRaw extends Component {
  state = {
    drawerOpen: false,
  }

  render() {
    const {drawerOpen} = this.state
    const {classes: classNames} = this.props

    return (
      <>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={this.onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={this.onTriggerDrawer} title={t(TranslationKey.Settings)}>
            <MainContent>
              <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>
            </MainContent>
          </Appbar>
        </Main>
      </>
    )
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }
}

export const ModeratorSettingsView = withStyles(ModeratorSettingsViewRaw, styles)
