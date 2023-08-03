import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Tabs } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { checkIsAdmin, checkIsClient, checkIsResearcher } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './product-wrapper.style'

import { Freelance } from '../freelance'
import { Integrations } from '../integrations'
import { ManagementTabView } from '../management-tab-view'
import { Orders } from '../orders'
import { SuppliersAndIdeas } from '../suppliers-and-ideas'

import { BottomCard } from './bottom-card'
import { TopCard } from './top-card'

const tabsValues = {
  MAIN_INFO: 'MAIN_INFO',
  ORDERS: 'ORDERS',
  INTEGRATIONS: 'INTEGRATIONS',
  LISTING: 'LISTING',
  SUPPLIERS_AND_IDEAS: 'SUPPLIERS_AND_IDEAS',
  FREELANCE: 'FREELANCE',
  MANAGEMENT: 'MANAGEMENT',
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

    const [tabIndex, setTabIndex] = useState(getTab(showTab))

    useEffect(() => {
      seturUserRole(() => UserRoleCodeMap[userRole])
    }, [userRole])

    return (
      <>
        {SettingsModel.languageTag && (
          <div className={classNames.mainWrapper}>
            <Tabs
              variant={'fullWidth'}
              classes={{
                root: classNames.rootTabs,
                indicator: classNames.indicator,
                flexContainer: classNames.flexContainerTabs,
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
                classes={{
                  root: classNames.rootTab,
                }}
              />

              {(checkIsClient(curUserRole) || checkIsAdmin(curUserRole)) && (
                <ITab
                  tooltipInfoContent={t(TranslationKey['All orders related to this product'])}
                  label={t(TranslationKey.Orders)}
                  value={tabsValues.ORDERS}
                  classes={{
                    root: classNames.rootTab,
                  }}
                />
              )}

              {(checkIsClient(curUserRole) || checkIsAdmin(curUserRole)) && (
                <ITab
                  tooltipInfoContent={t(TranslationKey['Goods from the store, linked to the product card'])}
                  label={t(TranslationKey.Integrations)}
                  value={tabsValues.INTEGRATIONS}
                  classes={{
                    root: classNames.rootTab,
                  }}
                />
              )}

              {(checkIsClient(curUserRole) || checkIsAdmin(curUserRole)) && (
                <ITab
                  label={t(TranslationKey.Freelance)}
                  value={tabsValues.FREELANCE}
                  classes={{
                    root: classNames.rootTab,
                  }}
                />
              )}

              {/* {!checkIsBuyer(curUserRole) && <ITab label={t(TranslationKey.Content)} value={tabsValues.LISTING} />} */}

              {!checkIsResearcher(curUserRole) && (
                <ITab
                  label={t(TranslationKey['Suppliers and Ideas'])}
                  value={tabsValues.SUPPLIERS_AND_IDEAS}
                  withIcon={!!product.ideaCount}
                  classes={{
                    root: classNames.rootTab,
                  }}
                />
              )}

              {checkIsAdmin(curUserRole) && (
                <ITab
                  label={t(TranslationKey.Management)}
                  value={tabsValues.MANAGEMENT}
                  classes={{
                    root: classNames.rootTab,
                  }}
                />
              )}
            </Tabs>

            <TabPanel ismodalproductcard={modal} value={tabIndex} index={tabsValues.MAIN_INFO}>
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

            <TabPanel ismodalproductcard={modal} value={tabIndex} index={tabsValues.ORDERS}>
              <Orders
                modal={modal}
                productId={product._id}
                showAtProcessOrders={getTab(showTab) === tabsValues.ORDERS}
              />
            </TabPanel>

            <TabPanel ismodalproductcard={modal} value={tabIndex} index={tabsValues.INTEGRATIONS}>
              <Integrations modal={modal} productId={product._id} />
            </TabPanel>

            {/* <TabPanel value={tabIndex} index={tabsValues.LISTING}>
        <Listing productId={product._id} onClickBack={() => setTabIndex(tabsValues.MAIN_INFO)} />
      </TabPanel> */}

            <TabPanel ismodalproductcard={modal} value={tabIndex} index={tabsValues.FREELANCE}>
              <Freelance modal={modal} productId={product._id} />
            </TabPanel>

            <TabPanel ismodalproductcard={modal} value={tabIndex} index={tabsValues.SUPPLIERS_AND_IDEAS}>
              <SuppliersAndIdeas productId={product._id} product={product} />
            </TabPanel>

            <TabPanel value={tabIndex} index={tabsValues.MANAGEMENT}>
              <ManagementTabView product={product} />
            </TabPanel>
          </div>
        )}
      </>
    )
  },
)
