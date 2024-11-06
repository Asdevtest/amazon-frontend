import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

export const bindInventoryColumns = [
  {
    dataIndex: 'asin',
    title: `${t(TranslationKey.Product)} / ASIN / SKU`,
    width: 140,
    render: (_: any, record: any) => <ProductCell title={record?.title} asin={record?.asin} sku={record?.sku} />,
  },

  {
    dataIndex: 'marketplace',
    title: 'Marketplace',
    width: 100,
    render: (marketplace: string) => <Text text={marketplace} rows={2} />,
  },
  {
    dataIndex: 'fbaFbmStock',
    title: 'FBA/FBM Stock',
    width: 70,
  },
  {
    dataIndex: 'reserved',
    title: t(TranslationKey.Reserved),
    width: 80,
  },
  {
    dataIndex: 'roi',
    title: t(TranslationKey.ROI),
    width: 70,
  },
]
