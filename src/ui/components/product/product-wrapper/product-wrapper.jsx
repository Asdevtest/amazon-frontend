import { memo, useEffect, useState } from 'react'
import { FcIdea } from 'react-icons/fc'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { chosenStatusesByFilter } from '@constants/statuses/inventory-product-orders-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { TabPanel } from '@components/shared/tab-panel'

import { ReportsView } from '@views/shared/reports-view'

import { checkIsAdmin, checkIsClient, checkIsResearcher } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './product-wrapper.style'

import { Freelance } from '../freelance-tab-view'
import { Integrations } from '../integrations'
import { ManagementTabView } from '../management-tab-view'
import { Orders } from '../orders'
import { SuppliersAndIdeas } from '../suppliers-and-ideas'

import { BottomCard } from './bottom-card'
import { TopCard } from './top-card'

const tabsValues = {
  MAIN_INFO: 'MAIN_INFO',
  ORDERS: 'ORDERS',
  REPORTS: 'REPORTS',
  INTEGRATIONS: 'INTEGRATIONS',
  LISTING: 'LISTING',
  SUPPLIERS_AND_IDEAS: 'SUPPLIERS_AND_IDEAS',
  FREELANCE: 'FREELANCE',
  MANAGEMENT: 'MANAGEMENT',
}

export const getTab = tabKey => {
  switch (tabKey) {
    case 'orders':
      return tabsValues.ORDERS
    case 'ideas':
      return tabsValues.SUPPLIERS_AND_IDEAS
    default:
      return tabsValues.MAIN_INFO
  }
}

export const getOrderStatus = status => {
  switch (status) {
    case 'atProcess':
      return chosenStatusesByFilter.AT_PROCESS
    case 'pending':
      return chosenStatusesByFilter.PENDING
    default:
      return chosenStatusesByFilter.ALL
  }
}

export const ProductWrapper = memo(
  ({
    showTab,
    filterStatus,
    user,
    imagesForLoad,
    showProgress,
    progressValue,
    product,
    productVariations,
    navigateToProduct,
    unbindProductHandler,
    shops,
    productBase,
    userRole,
    modal,
    formFieldsValidationErrors,
    onClickSetProductStatusBtn,
    onChangeField,
    actionStatus,
    handleProductActionButtons,
    setCurrentTab,
    onClickParseProductData,
    onChangeImagesForLoad,
    showBindProductModal,
    productsToBind,
    onTriggerOpenModal,
    onClickGetProductsToBind,
    onClickHsCode,
    onClickNextButton,
    loadMorePermissionsDataHadler,
    onClickSubmitSearch,
    onClickSaveSupplierBtn,
    onSaveForceProductData,
    onRemoveSupplier,
  }) => {
    const { classes: styles } = useStyles()

    const [curUserRole, seturUserRole] = useState(UserRoleCodeMap[userRole])
    const [tabIndex, setTabIndex] = useState(tabsValues.MAIN_INFO)

    const isClientOrAdmin = checkIsClient(curUserRole) || checkIsAdmin(curUserRole)

    useEffect(() => {
      seturUserRole(() => UserRoleCodeMap[userRole])
    }, [userRole])

    useEffect(() => {
      const url = new URL(window.location.href)
      const tab = url.searchParams.get('show-tab')

      if (tab === 'orders') {
        setTabIndex(tabsValues.ORDERS)
      }

      if (tab === 'reports') {
        setTabIndex(tabsValues.REPORTS)
      }

      if (tab === 'freelance') {
        setTabIndex(tabsValues.FREELANCE)
      }
    }, [])

    return (
      <div className={styles.mainWrapper}>
        <CustomRadioButton
          size="large"
          options={[
            {
              label: t(TranslationKey['Basic information']),
              value: tabsValues.MAIN_INFO,
            },
            isClientOrAdmin && {
              label: t(TranslationKey.Orders),
              value: tabsValues.ORDERS,
            },
            checkIsClient(curUserRole) && {
              label: t(TranslationKey.Reports),
              value: tabsValues.REPORTS,
            },
            isClientOrAdmin && {
              label: t(TranslationKey.Integrations),
              value: tabsValues.INTEGRATIONS,
            },
            isClientOrAdmin && {
              label: t(TranslationKey.Freelance),
              value: tabsValues.FREELANCE,
            },
            !checkIsResearcher(curUserRole) && {
              badge: product?.ideasOnCheck && <FcIdea size={16} />,
              label: t(TranslationKey['Suppliers and Ideas']),
              value: tabsValues.SUPPLIERS_AND_IDEAS,
            },
            checkIsAdmin(curUserRole) && {
              label: t(TranslationKey.Management),
              value: tabsValues.MANAGEMENT,
            },
          ].filter(item => item)}
          className={styles.customSwitcher}
          value={tabIndex}
          onChange={e => {
            setTabIndex(e?.target?.value)
            setCurrentTab && setCurrentTab(e?.target?.value)
          }}
        />

        <TabPanel value={tabIndex} index={tabsValues.MAIN_INFO}>
          <TopCard
            languageTag={SettingsModel.languageTag}
            modal={modal}
            user={user}
            imagesForLoad={imagesForLoad}
            showProgress={showProgress}
            progressValue={progressValue}
            curUserRole={curUserRole}
            product={product}
            productVariations={productVariations}
            navigateToProduct={navigateToProduct}
            unbindProductHandler={unbindProductHandler}
            shops={shops}
            productBase={productBase}
            actionStatus={actionStatus}
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
            onClickParseProductData={onClickParseProductData}
            onChangeImagesForLoad={onChangeImagesForLoad}
            onClickHsCode={onClickHsCode}
            onClickSaveSupplierBtn={onClickSaveSupplierBtn}
            onSaveForceProductData={onSaveForceProductData}
            onRemoveSupplier={onRemoveSupplier}
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
          <Orders modal={modal} productId={product?._id} filterStatus={getOrderStatus(filterStatus)} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.REPORTS}>
          <ReportsView modal={modal} productId={product?._id} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.INTEGRATIONS}>
          <Integrations userRole={curUserRole} modal={modal} productId={product?._id} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.FREELANCE}>
          <Freelance modal={modal} productId={product?._id} filterStatus={filterStatus} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.SUPPLIERS_AND_IDEAS}>
          <SuppliersAndIdeas productId={product?._id} product={product} />
        </TabPanel>

        <TabPanel value={tabIndex} index={tabsValues.MANAGEMENT}>
          <ManagementTabView product={product} />
        </TabPanel>
      </div>
    )
  },
)
