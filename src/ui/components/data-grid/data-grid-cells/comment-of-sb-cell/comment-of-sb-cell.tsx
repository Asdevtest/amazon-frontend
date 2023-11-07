/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsString } from '@utils/checks'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useDataGridCellStyles } from './comment-of-sb-cell.style'

interface CommentOfSbCellProps {
  productsInWarehouse: any
}

export const CommentOfSbCell: FC<CommentOfSbCellProps> = React.memo(({ productsInWarehouse }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.commentOfSbWrapper}>
      {productsInWarehouse?.length === 1 ? (
        <Tooltip title={productsInWarehouse[0].comment}>
          <div className={styles.multilineTextAlignWrapper}>
            <p className={styles.multilineTextAlignLeft}>
              {(checkIsString(productsInWarehouse[0].comment) &&
                getShortenStringIfLongerThanCount(productsInWarehouse[0].comment, 147)) ||
                ''}
            </p>
          </div>
        </Tooltip>
      ) : (
        <div className={styles.commentOfSbSubWrapper}>
          {productsInWarehouse.some((el: any) => el.comment) && (
            <p className={styles.commentOfSbSubMultiText}>{t(TranslationKey.Comments) + ':'}</p>
          )}
          {productsInWarehouse?.map((item: any, index: number) => (
            <Tooltip key={index} title={item.comment}>
              <p className={styles.commentOfSbSubMultiText}>{`${index}. ${item.comment ? item.comment : '-'}`}</p>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )
})
