import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  colorByProductStatus,
  translateStatusForResearcher,
} from '@constants/product/product-status'
import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, TextCell } from '@components/data-grid/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const researcherProductsViewColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
    renderCell: params => <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={params.value} />,
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

      return <TextCell text={status} color={color} />
    },
    width: 280,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
    renderCell: params => (
      <TextCell status={productStrategyStatusesEnum[params.row.strategyStatus]?.replace(/_/g, ' ')} />
    ),
    width: 180,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,
    renderCell: params => <TextCell text={toFixedWithDollarSign(params.row.amazon)} />,
    type: 'number',
    width: 150,
  },

  {
    field: 'supervisorComment',
    headerName: t(TranslationKey["Supervisor's comment"]),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey["Supervisor's comment"])} />,
    renderCell: params => <TextCell text={params.row.checkednotes} />,
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
