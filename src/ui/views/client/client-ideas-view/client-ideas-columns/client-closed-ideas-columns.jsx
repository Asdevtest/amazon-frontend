import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import {
  colorByIdeaStatus,
  ideaStatus,
  ideaStatusByCode,
  ideaStatusByKey,
  ideaStatusTranslate,
} from '@constants/statuses/idea-status.ts'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import {
  ActionButtonsCell,
  ManyUserLinkCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductCell,
  TimeFromSecondsCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'

import {
  ProductColumnMenuType,
  getProductColumnMenuItems,
  getProductColumnMenuValue,
} from '@config/data-grid-column-menu/product-column'

import {
  accessToProductColumnMenuConfig,
  createdByColumnMenuConfig,
  createdByFields,
  shopColumnMenuConfig,
  shopFields,
} from '../columns-menu.config'

export const clientClosedIdeasColumns = rowHandlers => {
  const columns = [
    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: params => <Text isCell text={params.row.xid} />,
      width: 100,
      type: 'number',
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'parentProduct',
      headerName: t(TranslationKey['Parent product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parent product'])} />,

      renderCell: params => {
        const product = params.value

        return (
          <ProductCell
            image={product?.images?.[0]}
            title={product?.amazonTitle}
            asin={product?.asin}
            sku={product?.skuByClient}
          />
        )
      },
      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue({ columnType: ProductColumnMenuType.PARENT }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      disableCustomSort: true,
      width: 170,
    },

    {
      field: 'parentProductShop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params?.row?.parentProduct?.shop?.name} />,
      width: 100,
      disableCustomSort: true,

      fields: shopFields,
      columnMenuConfig: shopColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'linksToMediaFiles',
      headerName: t(TranslationKey.Idea),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Idea)} />,

      renderCell: params => <MediaContentCell image={params.value.find(el => checkIsMediaFileLink(el))} />,
      width: 70,
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'comments',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      headerName: t(TranslationKey['Client comment']),

      renderCell: params => <Text isCell text={params.value} />,
      width: 250,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'buyerComment',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      headerName: t(TranslationKey['Client comment']),

      renderCell: params => <Text isCell text={params.value} />,
      width: 250,
      disableCustomSort: true,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'status',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      headerName: t(TranslationKey.Status),

      renderCell: params => (
        <Text
          isCell
          text={ideaStatusTranslate(ideaStatusByCode[params.value])}
          color={colorByIdeaStatus(ideaStatusByCode[params.value])}
        />
      ),
      width: 100,
      disableCustomSort: true,
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

      renderCell: params => <NormDateCell value={params.value} />,
      width: 91,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'reasonReject',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Reason for rejection'])} />,
      headerName: t(TranslationKey['Reason for rejection']),

      renderCell: params => <Text isCell text={params.value} />,
      width: 250,
      filterable: false,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: ({ row }) => (
        <UserCell
          name={row.sub?.name || row.createdBy?.name}
          id={row.sub?._id || row?.createdBy?._id}
          email={row.sub?.email || row?.createdBy?.email}
        />
      ),

      fields: createdByFields,
      columnMenuConfig: createdByColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,

      width: 130,
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'subUsers',
      headerName: t(TranslationKey['Access to product']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Access to product'])} />,
      renderCell: params => {
        const subUsers = params.row?.parentProduct?.subUsers || []
        const subUsersByShop = params.row?.parentProduct?.subUsersByShop || []

        return <ManyUserLinkCell usersData={subUsers?.concat(subUsersByShop)} />
      },
      valueGetter: ({ row }) => {
        const subUsers = row?.parentProduct?.subUsers || []
        const subUsersByShop = row?.parentProduct?.subUsersByShop || []

        return subUsers?.concat(subUsersByShop).join(', ')
      },
      width: 187,
      filterable: false,
      disableCustomSort: true,

      fields: shopFields,
      columnMenuConfig: accessToProductColumnMenuConfig,
      columnKey: columnnsKeys.shared.MULTIPLE,
    },

    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

      renderCell: params => (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey.Restore)}
          firstDisabled={ideaStatusByKey[ideaStatus.CLOSED] === params.row.status}
          secondContent={t(TranslationKey.Close)}
          secondDisabled={ideaStatusByKey[ideaStatus.CLOSED] === params.row.status}
          onClickFirst={() => rowHandlers.onClickRestore(params.row._id)}
          onClickSecond={() => rowHandlers.onClickClose(params.row._id)}
        />
      ),
      width: 140,
      filterable: false,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.IDEAS
    }
    column.sortable = false
  }

  return columns
}
