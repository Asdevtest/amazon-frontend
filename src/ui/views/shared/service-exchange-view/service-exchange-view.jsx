import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {ViewCartsBlock, ViewCartsLine} from '@constants/svg-icons'
import {tableViewMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'
import {ToggleBtnGroupFreelance} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtnFreelancer} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {t} from '@utils/translations'

import {ServiceExchangeViewModel} from './service-exchange-view.model'
import {styles} from './service-exchange-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_SERVICE_EXCHANGE

@observer
class ServiceExchangeViewRaw extends Component {
  viewModel = new ServiceExchangeViewModel({history: this.props.history})

  componentDidMount() {}

  render() {
    const {viewMode, drawerOpen, onTriggerDrawerOpen} = this.viewModel
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
          <Appbar title={t(TranslationKey['My proposals'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.tablePanelWrapper}>
                <div className={classNames.tablePanelViewWrapper}>
                  <ToggleBtnGroupFreelance exclusive value={viewMode} /* onChange={onChangeViewMode} */>
                    <ToggleBtnFreelancer value={tableViewMode.BLOCKS} disabled={viewMode === tableViewMode.BLOCKS}>
                      <ViewCartsBlock
                        className={cx(classNames.viewCart, {
                          [classNames.viewCartSelected]: viewMode === tableViewMode.BLOCKS,
                        })}
                      />
                    </ToggleBtnFreelancer>
                    <ToggleBtnFreelancer value={tableViewMode.LIST} disabled={viewMode === tableViewMode.LIST}>
                      <ViewCartsLine
                        className={cx(classNames.viewCart, {
                          [classNames.viewCartSelected]: viewMode === tableViewMode.LIST,
                        })}
                      />
                    </ToggleBtnFreelancer>
                  </ToggleBtnGroupFreelance>
                </div>

                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by Performer, Description'])}
                  /* value={nameSearchValue} */
                  onSubmit={() => {}}
                />
              </div>
              <div className={classNames.emptyTableWrapper}>
                <img src="/assets/icons/empty-table.svg" />
                <Typography variant="h5" className={classNames.emptyTableText}>
                  {t(TranslationKey.Missing)}
                </Typography>
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ServiceExchangeView = withStyles(ServiceExchangeViewRaw, styles)
