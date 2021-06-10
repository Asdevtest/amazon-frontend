import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {clientExchangePrivateLabelView, clientUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {PrivateLabelCard} from '@components/private-label-card'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getRequiredListByKeys} from '@utils/get-required-list-by-keys'

import {ClientExchangePrivateLabelViewModel} from './client-exchange-private-label-view.model'
import {styles} from './client-exchange-private-label-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangePrivateLabelView

const {listKeys, productList} = clientExchangePrivateLabelView

const filteredProductList = getRequiredListByKeys(productList, listKeys)

const navbarActiveCategory = 1
const navbarActiveSubCategory = 1

@observer
export class ClientExchangePrivateLabelViewRaw extends Component {
  viewModel = new ClientExchangePrivateLabelViewModel({history: this.props.history})

  render() {
    const {drawerOpen, onTriggerDrawer} = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
          >
            <MainContent>
              <div className={classNames.mb5}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
                <div className={classNames.cardsWrapper}>
                  {filteredProductList.map((item, index) => (
                    <div key={index} className={classNames.cardWrapper}>
                      <PrivateLabelCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientExchangePrivateLabelView = withStyles(styles)(ClientExchangePrivateLabelViewRaw)
