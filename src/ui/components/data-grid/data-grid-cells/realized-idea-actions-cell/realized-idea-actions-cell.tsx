/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

interface RealizedIdeaActionsCellProps {
  row: any
  rowHandlers: {
    onClickToOrder: (id: string) => void
  }
}

export const RealizedIdeaActionsCell: FC<RealizedIdeaActionsCellProps> = memo(({ rowHandlers, row }) => (
  <>
    {(row.variation ? !row.childProduct?.order : !row.parentProduct.order) ? (
      <Button
        isTableButton
        fullWidth
        styleType={ButtonStyle.SUCCESS}
        onClick={() => rowHandlers.onClickToOrder(row.childProduct?._id || row.parentProduct?._id)}
      >
        {t(TranslationKey['To order'])}
      </Button>
    ) : (
      <p>{t(TranslationKey.Ordered)}</p>
    )}
  </>
))
