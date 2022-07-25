import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {VacantDealsListCard} from '@components/cards/vacant-deals-list-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {DealsOnReviewModel} from './deals-on-review-view.model'
import {styles} from './deals-on-review-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW

@observer
class DealsOnReviewViewRaw extends Component {
  viewModel = new DealsOnReviewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, deals, onTriggerDrawerOpen, onClickViewMore} = this.viewModel
    const {classes: classNames} = this.props

    console.log(deals)
    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['Deals on review'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.dealsOnReviewWrapper}>
                {deals.map((deal, index) => (
                  <VacantDealsListCard
                    key={index}
                    showDetails
                    item={deal}
                    onClickViewMore={onClickViewMore}
                    // onClickGetToWorkModal={onClickGetToWorkModal}
                  />
                ))}
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const DealsOnReviewView = withStyles(styles)(DealsOnReviewViewRaw)
