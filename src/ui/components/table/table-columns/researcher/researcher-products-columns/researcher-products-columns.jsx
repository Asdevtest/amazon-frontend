import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  colorByProductStatus,
  translateStatusForResearcher,
} from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  AsinCell,
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const researcherProductsViewColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => {
      return <AsinCell asin={params.value} />
    },
    width: 180,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 280,
    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={t(translateStatusForResearcher(ProductStatusByCode[params.row.originalData.status]))}
        color={
          [
            ProductStatusByKey[ProductStatus.NEW_PRODUCT],
            ProductStatusByKey[ProductStatus.DEFAULT],
            ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
            ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
            ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
          ].includes(params.row.originalData.status)
            ? colorByProductStatus(ProductStatusByCode[params.row.originalData.status])
            : null
        }
      />
    ),
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell leftAlign status={params.value} />,
    width: 180,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedWithDollarSignCell leftAlign value={params.row.amazon} fix={2} />,

    type: 'number',
    width: 150,
    // flex: 1,
  },

  // {
  //   field: 'bsr',
  //   headerName: t(TranslationKey.BSR),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

  //   renderCell: params => <MultilineTextCell text={params.value} />,
  //   type: 'number',
  //   minWidth: 150,

  //   flex: 1,
  // },

  {
    field: 'supervisorComment',
    headerName: t(TranslationKey["Supervisor's comment"]),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey["Supervisor's comment"])} />,

    renderCell: params => <MultilineTextCell leftAlign twoLines text={params.value} />,

    filterable: false,
    sortable: false,
    flex: 1,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    minWidth: 150,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },
]
