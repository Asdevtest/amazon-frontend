/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

interface AddAsinIdeaActionsCellProps {
  row: any
  rowHandlers: {
    onClickAcceptOnAddingAsin: (id: string) => void
  }
}

export const AddAsinIdeaActionsCell: FC<AddAsinIdeaActionsCellProps> = memo(({ rowHandlers, row }) => (
  <Button
    success
    small
    disabled={
      row.originalData.variation
        ? !row?.originalData?.childProduct?.barCode
        : !row?.originalData?.parentProduct?.barCode
    }
    onClick={() => rowHandlers.onClickAcceptOnAddingAsin(row._id)}
  >
    {t(TranslationKey.Accept)}
  </Button>
))
