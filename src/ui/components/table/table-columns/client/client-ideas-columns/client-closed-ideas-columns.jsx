import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { colorByIdeaStatus, ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status.ts'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import {
  ClosedIdeaActionsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
  TimeFromSecondsCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientClosedIdeasColumns = (rowHandlers, shops) => [
  {
    field: 'parentProduct',
    headerName: t(TranslationKey['Parent product']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parent product'])} />,

    renderCell: params => {
      const product = params.value

      return (
        <ProductAsinCell
          image={product?.images?.slice()[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skusByClient={product?.skusByClient?.slice()[0]}
        />
      )
    },
    width: 265,
    sortable: false,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: ['parentProductShopIds', 'childProductShopIds'],
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Shop)} />,

    renderCell: params => (
      <MultilineTextCell
        twoLines
        text={shops?.find(el => params?.row?.parentProduct?.shopIds?.includes(el?._id))?.name}
      />
    ),
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.client.IDEA_SHOPS,
  },

  {
    field: 'linksToMediaFiles',
    headerName: t(TranslationKey.Idea),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

    renderCell: params => <SmallRowImageCell image={params.value.find(el => checkIsImageLink(el))} />,
    width: 96,
    sortable: false,
    filterable: false,
  },

  {
    field: 'comments',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'buyerComment',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    headerName: t(TranslationKey['Client comment']),

    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={95} text={params.value} />,
    width: 250,
    sortable: false,
    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'status',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    headerName: t(TranslationKey.Status),

    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={ideaStatusTranslate(ideaStatusByCode[params.value])}
        color={colorByIdeaStatus(ideaStatusByCode[params.value])}
      />
    ),
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.client.IDEAS_STATUS,
  },

  {
    field: 'intervalStatusNew',
    headerName: t(TranslationKey.New),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.New)} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusOnCheck',
    headerName: t(TranslationKey['On checking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['On checking'])} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalStatusSupplierSearch',
    headerName: t(TranslationKey['Supplier search']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Supplier search'])} />,

    renderCell: params => <TimeFromSecondsCell seconds={params.value} />,
    width: 110,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'intervalsSum',
    headerName: t(TranslationKey['Elapsed time']),
    renderHeader: () => (
      <MultilineTextHeaderCell
        color={SettingsModel.uiTheme === UiTheme.dark ? '#DD2121' : '#FF1616'}
        text={t(TranslationKey['Elapsed time'])}
      />
    ),

    renderCell: params => (
      <TimeFromSecondsCell
        color={SettingsModel.uiTheme === UiTheme.dark ? '#DD2121' : '#FF1616'}
        seconds={params.value}
      />
    ),

    width: 105,
    columnKey: columnnsKeys.shared.DATE_DETAILS,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey['Status Updated']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Status Updated'])} />,

    renderCell: params => <ShortDateCell value={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    renderCell: params => <ClosedIdeaActionsCell row={params.row} rowHandlers={rowHandlers} />,
    width: 280,
    filterable: false,
    sortable: false,
  },
]
