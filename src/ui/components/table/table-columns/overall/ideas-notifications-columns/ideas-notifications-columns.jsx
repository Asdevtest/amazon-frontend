import { colorByIdeaStatus, ideaStatusByCode } from '@constants/statuses/idea-status.ts'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const ideasNotificationsViewColumns = handlers => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 85,
    // type: 'date',
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 200,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        firstButtonElement={t(TranslationKey.View)}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => handlers.onClickViewBtn(params?.row?.product?._id)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => {
      const product = params?.row?.originalData?.product

      return (
        <ProductCell
          image={product?.images?.[0]}
          title={product?.amazonTitle}
          asin={product?.asin}
          sku={product?.skuByClient}
        />
      )
    },

    width: 260,
    minWidth: 100,
  },

  {
    field: 'createdByName',
    headerName: t(TranslationKey['Updated by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Updated by'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params?.value} userId={params?.row?.originalData?.createdBy._id} />
    ),
    width: 160,
  },

  {
    field: 'status',
    headerName: t(TranslationKey['Idea Status']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Idea Status'])} />,

    renderCell: params => (
      <TextCell text={params?.value} color={colorByIdeaStatus(ideaStatusByCode[params.row.originalData.idea.status])} />
    ),
    width: 120,
  },

  {
    field: 'productName',
    headerName: t(TranslationKey['Name idea']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Name idea'])} />,

    renderCell: params => <TextCell text={params?.row?.productName} />,
    // width: 200,
    flex: 1,
  },
]
