import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  colorByProductStatus,
  translateStatusForResearcher,
} from '@constants/product/product-status'
import { mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AsinCell,
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

export const researcherProductsViewColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
    renderCell: params => <AsinCell asin={params.row.asin} />,
    width: 180,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => {
      const status = t(translateStatusForResearcher(ProductStatusByCode[params.row.status]))
      const color = [
        ProductStatusByKey[ProductStatus.NEW_PRODUCT],
        ProductStatusByKey[ProductStatus.DEFAULT],
        ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
        ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
        ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
      ].includes(params.row.status)
        ? colorByProductStatus(ProductStatusByCode[params.row.status])
        : null

      return <MultilineTextCell leftAlign text={status} color={color} />
    },
    width: 280,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
    renderCell: params => (
      <MultilineStatusCell leftAlign status={mapProductStrategyStatusEnum[params.row.strategyStatus]} />
    ),
    width: 180,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
    renderCell: params => <ToFixedWithDollarSignCell leftAlign value={params.row.amazon} fix={2} />,
    type: 'number',
    width: 150,
  },

  {
    field: 'supervisorComment',
    headerName: t(TranslationKey["Supervisor's comment"]),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey["Supervisor's comment"])} />,
    renderCell: params => <MultilineTextCell leftAlign twoLines text={params.row.checkednotes} />,
    filterable: false,
    sortable: false,
    flex: 1,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: params => <NormDateCell value={params.row.createdAt} />,
    width: 115,
  },
]
