import { Tabs, TabsProps } from 'antd'
import { observer } from 'mobx-react'
import { FC, useCallback, useMemo } from 'react'
import { FcIdea } from 'react-icons/fc'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './main-product-form.style'

import { BasicInfo } from './components'
import { ProductTubs } from './main-product-form.config'
import { MainProductFormModel } from './main-product-form.model'

export interface MainProductFormProps {
  productId: string
  onClose: () => void
  onSubmit?: () => void
}

export const MainProductForm: FC<MainProductFormProps> = observer(props => {
  const { productId, onClose, onSubmit } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new MainProductFormModel(productId), [])

  const generateProductTabs = useCallback(() => {
    const tabs: TabsProps['items'] = [
      {
        key: ProductTubs.MAIN_INFO,
        label: t(TranslationKey['Basic information']),
        children: <BasicInfo product={viewModel.product} onClose={onClose} />,
      },
    ]

    if (viewModel.isClient || viewModel.isAdmin) {
      tabs.push(
        {
          key: ProductTubs.ORDERS,
          label: t(TranslationKey.Orders),
          children: 'Orders',
        },
        {
          key: ProductTubs.INTEGRATIONS,
          label: t(TranslationKey.Integrations),
          children: 'Integrations',
        },
        {
          key: ProductTubs.FREELANCE,
          label: t(TranslationKey.Freelance),
          children: 'Freelance',
        },
      )
    }

    if (viewModel.isClient) {
      tabs.push({
        key: ProductTubs.REPORTS,
        label: t(TranslationKey.Reports),
        children: 'Reports',
      })
    }

    if (!viewModel.isResearcher) {
      tabs.push({
        key: ProductTubs.SUPPLIERS_AND_IDEAS,
        label: t(TranslationKey['Suppliers and Ideas']),
        children: 'SuppliersAndIdeas',
        icon: Boolean(viewModel.product?.ideasOnCheck) && <FcIdea size={16} />,
      })
    }

    if (viewModel.isAdmin) {
      tabs.push({
        key: ProductTubs.MANAGEMENT,
        label: t(TranslationKey.Management),
        children: 'Management',
      })
    }

    return tabs
  }, [viewModel.product])

  return (
    <div className={styles.root}>
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey={viewModel.tabValue}
        items={generateProductTabs()}
        onChange={viewModel.onChangeTabValue}
      />
    </div>
  )
})
