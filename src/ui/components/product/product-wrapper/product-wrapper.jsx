/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { Box, Tabs } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab/i-tab'

import { checkIsAdmin, checkIsBuyer, checkIsClient, checkIsResearcher } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './product-wrapper.style'

import { Freelance } from '../freelance'
import { Integrations } from '../integrations'
import { Listing } from '../listing'
import { Orders } from '../orders'
import { SuppliersAndIdeas } from '../suppliers-and-ideas'

import { BottomCard } from './bottom-card'
import { TopCard } from './top-card'
import { IdeaCardsModal } from '@components/modals/idea-cards-modal'

const tabsValues = {
  MAIN_INFO: 'MAIN_INFO',
  ORDERS: 'ORDERS',
  INTEGRATIONS: 'INTEGRATIONS',
  LISTING: 'LISTING',
  SUPPLIERS_AND_IDEAS: 'SUPPLIERS_AND_IDEAS',
  FREELANCE: 'FREELANCE',
}

const getTab = tabKey => {
  switch (tabKey) {
    case 'orders':
      return tabsValues.ORDERS

    case 'ideas':
      return tabsValues.SUPPLIERS_AND_IDEAS

    default:
      return tabsValues.MAIN_INFO
  }
}

const TabPanel = ({ children, value, index, isModalProductCard, ...other }) => (
  <div
    role="tabpanel"
    style={isModalProductCard && { width: '100%', height: 'calc(100% - 40px)', overflowY: 'auto' }}
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box paddingTop={3}>{children}</Box>}
  </div>
)

export const ProductWrapper = observer(
  ({
    showTab,
    user,
    imagesForLoad,
    showProgress,
    progressValue,
    alertFailedText,
    product,
    shops,
    productBase,
    userRole,
    modal,

    handleSupplierButtons,
    selectedSupplier,
    formFieldsValidationErrors,
    onClickSupplier,
    onClickSetProductStatusBtn,
    onChangeField,
    actionStatus,
    handleProductActionButtons,
    setCurrentTab,
    onClickParseProductData,
    onChangeImagesForLoad,
    acceptMessage,
    showAcceptMessage,
    onClickHsCode,
  }) => {
    const { classes: classNames } = useClassNames()

    const [curUserRole, seturUserRole] = useState(UserRoleCodeMap[userRole])
    useEffect(() => {
      seturUserRole(() => UserRoleCodeMap[userRole])
    }, [SettingsModel.languageTag, userRole])

    const [tabIndex, setTabIndex] = React.useState(getTab(showTab))

    const [showModal, setShowModal] = useState(false)

    return (
      <>
        {SettingsModel.languageTag && (
          <div className={classNames.mainWrapper}>
            <div onClick={() => setShowModal(true)}>CLICK</div>
            <Tabs
              variant={'fullWidth'}
              classes={{
                root: classNames.row,
                indicator: classNames.indicator,
              }}
              value={tabIndex}
              onChange={(e, value) => {
                setTabIndex(value)
                setCurrentTab && setCurrentTab(value)
              }}
            >
              <ITab
                tooltipInfoContent={t(TranslationKey['General product information from the Amazon page'])}
                value={tabsValues.MAIN_INFO}
                label={t(TranslationKey['Basic information'])}
              />

              {(checkIsClient(curUserRole) || checkIsAdmin(curUserRole)) && (
                <ITab
                  tooltipInfoContent={t(TranslationKey['All orders related to this product'])}
                  label={t(TranslationKey.Orders)}
                  value={tabsValues.ORDERS}
                />
              )}

              {(checkIsClient(curUserRole) || checkIsAdmin(curUserRole)) && (
                <ITab
                  tooltipInfoContent={t(TranslationKey['Goods from the store, linked to the product card'])}
                  label={t(TranslationKey.Integrations)}
                  value={tabsValues.INTEGRATIONS}
                />
              )}

              {(checkIsClient(curUserRole) || checkIsAdmin(curUserRole)) && (
                <ITab label={t(TranslationKey.Freelance)} value={tabsValues.FREELANCE} />
              )}

              {/* {!checkIsBuyer(curUserRole) && <ITab label={t(TranslationKey.Content)} value={tabsValues.LISTING} />} */}

              {!checkIsResearcher(curUserRole) && (
                <ITab
                  label={t(TranslationKey['Suppliers and Ideas'])}
                  value={tabsValues.SUPPLIERS_AND_IDEAS}
                  withIcon={!!product.ideaCount}
                />
              )}
            </Tabs>

            <TabPanel isModalProductCard={modal} value={tabIndex} index={tabsValues.MAIN_INFO}>
              <TopCard
                modal={modal}
                user={user}
                imagesForLoad={imagesForLoad}
                showProgress={showProgress}
                progressValue={progressValue}
                alertFailedText={alertFailedText}
                curUserRole={curUserRole}
                product={product}
                shops={shops}
                productBase={productBase}
                selectedSupplier={selectedSupplier}
                actionStatus={actionStatus}
                acceptMessage={acceptMessage}
                showAcceptMessage={showAcceptMessage}
                handleProductActionButtons={handleProductActionButtons}
                formFieldsValidationErrors={formFieldsValidationErrors}
                onChangeField={onChangeField}
                onClickSetProductStatusBtn={onClickSetProductStatusBtn}
                onClickSupplierBtns={handleSupplierButtons}
                onClickSupplier={onClickSupplier}
                onClickParseProductData={onClickParseProductData}
                onChangeImagesForLoad={onChangeImagesForLoad}
                onClickHsCode={onClickHsCode}
              />
              {!checkIsResearcher(curUserRole) && (
                <BottomCard
                  curUserRole={curUserRole}
                  product={product}
                  productBase={productBase}
                  formFieldsValidationErrors={formFieldsValidationErrors}
                  onChangeField={onChangeField}
                />
              )}
            </TabPanel>

            <TabPanel isModalProductCard={modal} value={tabIndex} index={tabsValues.ORDERS}>
              <Orders
                modal={modal}
                productId={product._id}
                showAtProcessOrders={getTab(showTab) === tabsValues.ORDERS}
              />
            </TabPanel>

            <TabPanel isModalProductCard={modal} value={tabIndex} index={tabsValues.INTEGRATIONS}>
              <Integrations modal={modal} productId={product._id} />
            </TabPanel>

            {/* <TabPanel value={tabIndex} index={tabsValues.LISTING}>
              <Listing productId={product._id} onClickBack={() => setTabIndex(tabsValues.MAIN_INFO)} />
            </TabPanel> */}

            <TabPanel isModalProductCard={modal} value={tabIndex} index={tabsValues.FREELANCE}>
              <Freelance modal={modal} productId={product._id} />
            </TabPanel>

            <TabPanel isModalProductCard={modal} value={tabIndex} index={tabsValues.SUPPLIERS_AND_IDEAS}>
              <SuppliersAndIdeas productId={product._id} product={product} />
            </TabPanel>

            {showModal && (
              <IdeaCardsModal
                openModal={showModal}
                setOpenModal={() => setShowModal(false)}
                productId={product._id}
                product={product}
              />
            )}
          </div>
        )}
      </>
    )
  },
)
