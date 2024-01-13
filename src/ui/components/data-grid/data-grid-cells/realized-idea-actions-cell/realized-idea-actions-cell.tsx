/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

interface RealizedIdeaActionsCellProps {
  row: any
  rowHandlers: {
    onClickToOrder: (id: string) => void
  }
}

export const RealizedIdeaActionsCell: FC<RealizedIdeaActionsCellProps> = memo(({ rowHandlers, row }) => (
  <>
    {(row.variation ? !row.childProduct?.order : !row.parentProduct.order) ? (
      <Button small success onClick={() => rowHandlers.onClickToOrder(row.childProduct?._id || row.parentProduct?._id)}>
        {t(TranslationKey['To order'])}
      </Button>
    ) : (
      <Text>{t(TranslationKey.Ordered)}</Text>
    )}
  </>
))
