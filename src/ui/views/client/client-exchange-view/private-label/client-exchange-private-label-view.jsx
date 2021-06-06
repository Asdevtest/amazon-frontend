/* eslint-disable no-unused-vars */
import {Component} from 'react'

import {
  Button,
  TableCell,
  TableContainer,
  Table as MuiTable,
  TableRow,
  Typography,
  TableHead,
  TableBody,
} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {clientExchangePrivateLabelView, clientExchangeViewTable, clientUsername} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {PrivateLabelCard} from '@components/private-label-card'
import {Table} from '@components/table'
import {ExchangeBodyRow, ExchangeModalBodyRow} from '@components/table-rows/client/exchange'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getRequiredListByKeys} from '@utils/get-required-list-by-keys'

import {styles} from './client-exchange-private-label-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangePrivateLabelView

const {listKeys, productList} = clientExchangePrivateLabelView

const filteredProductList = getRequiredListByKeys(productList, listKeys)

export class ClientExchangePrivateLabelViewRaw extends Component {
  state = {
    activeCategory: 1,
    activeSubCategory: 1,
    drawerOpen: false,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen} = this.state
    const {classes: classNames} = this.props

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
      </>
    )
  }

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

export const ClientExchangePrivateLabelView = withStyles(styles)(ClientExchangePrivateLabelViewRaw)
