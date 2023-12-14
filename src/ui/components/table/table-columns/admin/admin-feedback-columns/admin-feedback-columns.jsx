import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextAlignLeftCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NormalActionBtnCell,
  UserCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { t } from '@utils/translations'

export const adminFeedbackViewColumns = handlers => [
  {
    field: 'userName',
    headerName: t(TranslationKey.User),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
    renderCell: params => {
      const user = params.row.originalData.user

      return <UserCell userId={user?._id} name={user?.name} email={user?.email} rating={user?.rating} />
    },
    width: 320,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
  },

  {
    field: 'text',
    headerName: t(TranslationKey.Reviews),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reviews)} />,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
    width: 700,
  },

  {
    field: 'media',
    headerName: t(TranslationKey.Files),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: params => <PhotoAndFilesSlider showPreviews smallSlider files={params.value} />,
    width: 300,
    align: 'center',
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    filterable: false,
    sortable: false,
    width: 180,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey.View)}
        // isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        onClickOkBtn={() => handlers.onClickOpenFeedbackBtn(params.row.originalData)}
      />
    ),
  },
]
