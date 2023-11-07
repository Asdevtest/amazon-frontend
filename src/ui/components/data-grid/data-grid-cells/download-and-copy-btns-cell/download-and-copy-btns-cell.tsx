/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './download-and-copy-btns-cell.style'

interface DownloadAndCopyBtnsCellProps {
  value: string
  isFirstRow?: boolean
}

export const DownloadAndCopyBtnsCell: FC<DownloadAndCopyBtnsCellProps> = React.memo(({ value, isFirstRow }) => {
  const { classes: styles, cx } = useDataGridCellStyles()

  return (
    <>
      {value ? (
        <div className={styles.shopsReportBtnsWrapper}>
          <div className={cx({ [styles.tooltipWrapperMargin]: isFirstRow })}>
            <Text tooltipInfoContent={isFirstRow ? t(TranslationKey['Download the file to your device']) : ''}>
              <a
                download
                target={'_blank'}
                rel={'noreferrer'}
                href={value}
                className={styles.downloadLink}
                onClick={(e: any) => e.stopPropagation()}
              >
                {t(TranslationKey.View)}
              </a>
            </Text>
          </div>

          <Button
            tooltipInfoContent={isFirstRow ? t(TranslationKey['Copy the link']) : ''}
            className={styles.copyImgButton}
          >
            <CopyValue text={value} />
          </Button>
        </div>
      ) : (
        <p>{'-'}</p>
      )}
    </>
  )
})
