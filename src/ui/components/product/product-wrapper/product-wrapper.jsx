import { memo, useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CustomSwitcher } from '@components/shared/custom-switcher'
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

export const ProductWrapper = memo(
  ({
    showTab,
    user,
    imagesForLoad,
    showProgress,
    progressValue,
    alertFailedText,
    product,
    productVariations,
    navigateToProduct,
    unbindProductHandler,
    shops,
    productBase,
    userRole,
    modal,
    handleSupplierButtons,
    selectedSupplier,
    formFieldsValidationErrors,
    platformSettings,
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
    showBindProductModal,
    productsToBind,
    onTriggerOpenModal,
    onClickGetProductsToBind,
    onClickHsCode,
    onClickNextButton,
    loadMorePermissionsDataHadler,
    onClickSubmitSearch,
    openModal,
  }) => {
    const { classes: classNames } = useClassNames()

    const [curUserRole, seturUserRole] = useState(UserRoleCodeMap[userRole])

    const [tabIndex, setTabIndex] = useState(getTab(showTab))

    const isClientOrAdmin = checkIsClient(curUserRole) || checkIsAdmin(curUserRole)

    useEffect(() => {
      seturUserRole(() => UserRoleCodeMap[userRole])
    }, [userRole])

    return (
      <>
        {SettingsModel.languageTag && (
          <div className={classNames.mainWrapper}>
            <CustomSwitcher
              fullWidth
              switchMode="medium"
              condition={tabIndex}
              switcherSettings={[
                {
                  label: () => t(TranslationKey['Basic information']),
                  value: tabsValues.MAIN_INFO,
                },

                isClientOrAdmin && {
                  label: () => t(TranslationKey.Orders),
                  value: tabsValues.ORDERS,
                },

                isClientOrAdmin && {
                  label: () => t(TranslationKey.Integrations),
                  value: tabsValues.INTEGRATIONS,
                },
                isClientOrAdmin && {
                  label: () => t(TranslationKey.Freelance),
                  value: tabsValues.FREELANCE,
                },

                !checkIsResearcher(curUserRole) && {
                  icon: product.ideasOnCheck > 0,
                  label: () => t(TranslationKey['Suppliers and Ideas']),
                  value: tabsValues.SUPPLIERS_AND_IDEAS,
                },

                checkIsAdmin(curUserRole) && {
                  label: () => t(TranslationKey.Management),
                  value: tabsValues.MANAGEMENT,
                },
              ].filter(item => item)}
              changeConditionHandler={value => {
                setTabIndex(value)
                setCurrentTab && setCurrentTab(value)
              }}
            />

            <TabPanel value={tabIndex} index={tabsValues.MAIN_INFO}>
              <TopCard
                languageTag={SettingsModel.languageTag}
                platformSettings={platformSettings}
                modal={modal}
                user={user}
                imagesForLoad={imagesForLoad}
                showProgress={showProgress}
                progressValue={progressValue}
                alertFailedText={alertFailedText}
                curUserRole={curUserRole}
                product={product}
                productVariations={productVariations}
                navigateToProduct={navigateToProduct}
                unbindProductHandler={unbindProductHandler}
                shops={shops}
                productBase={productBase}
                selectedSupplier={selectedSupplier}
                actionStatus={actionStatus}
                acceptMessage={acceptMessage}
                showAcceptMessage={showAcceptMessage}
                showBindProductModal={showBindProductModal}
                productsToBind={productsToBind}
                handleProductActionButtons={handleProductActionButtons}
                formFieldsValidationErrors={formFieldsValidationErrors}
                loadMorePermissionsDataHadler={loadMorePermissionsDataHadler}
                onClickSubmitSearch={onClickSubmitSearch}
                onClickNextButton={onClickNextButton}
                onTriggerOpenModal={onTriggerOpenModal}
                onClickGetProductsToBind={onClickGetProductsToBind}
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

            <TabPanel value={tabIndex} index={tabsValues.ORDERS}>
              <Orders
                modal={modal}
                productId={product._id}
                showAtProcessOrders={getTab(showTab) === tabsValues.ORDERS}
              />
            </TabPanel>

            <TabPanel value={tabIndex} index={tabsValues.INTEGRATIONS}>
              <Integrations modal={modal} productId={product._id} />
            </TabPanel>

            {/* <TabPanel value={tabIndex} index={tabsValues.LISTING}>
        <Listing productId={product._id} onClickBack={() => setTabIndex(tabsValues.MAIN_INFO)} />
      </TabPanel> */}

            <TabPanel value={tabIndex} index={tabsValues.FREELANCE}>
              <Freelance modal={modal} productId={product._id} />
            </TabPanel>

            <TabPanel value={tabIndex} index={tabsValues.SUPPLIERS_AND_IDEAS}>
              <SuppliersAndIdeas productId={product._id} product={product} openModal={openModal} />
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
