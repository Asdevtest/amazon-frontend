/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

interface CreateCardIdeaActionsProps {
  row: any
  rowHandlers: {
    onClickAcceptOnCreatingProduct: (id: string) => void
  }
}

export const CreateCardIdeaActionsCell: FC<CreateCardIdeaActionsProps> = React.memo(({ rowHandlers, row }) => {
  return (
    <Button
      small
      success
      disabled={!row.childProduct && row.variation}
      onClick={() => rowHandlers.onClickAcceptOnCreatingProduct(row._id)}
    >
      {t(TranslationKey.Accept)}
    </Button>
  )
})
