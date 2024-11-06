/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

interface RealizedIdeaActionsCellProps {
  row: any
  rowHandlers: {
    onClickToOrder: (id: string) => void
  }
}

export const RealizedIdeaActionsCell: FC<RealizedIdeaActionsCellProps> = memo(({ rowHandlers, row }) => (
  <div style={{ width: '100%' }}>
    {(row.variation ? !row.childProduct?.order : !row.parentProduct.order) ? (
      <CustomButton
        block
        type="primary"
        size="small"
        onClick={() => rowHandlers.onClickToOrder(row.childProduct?._id || row.parentProduct?._id)}
      >
        {t(TranslationKey['To order'])}
      </CustomButton>
    ) : (
      <p>{t(TranslationKey.Ordered)}</p>
    )}
  </div>
))
