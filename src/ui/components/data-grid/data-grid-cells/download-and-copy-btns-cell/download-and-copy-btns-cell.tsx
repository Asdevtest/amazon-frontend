/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, MouseEvent } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Text } from '@components/shared/text'

import { checkIsHasHttp } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './download-and-copy-btns-cell.style'

interface DownloadAndCopyBtnsCellProps {
  value: string
  isFirstRow?: boolean
  showViewTooltip?: boolean
}

export const DownloadAndCopyBtnsCell: FC<DownloadAndCopyBtnsCellProps> = React.memo(
  ({ value, isFirstRow, showViewTooltip = true }) => {
    const { classes: styles, cx } = useStyles()

    const validLink = checkIsHasHttp(value) ? value : getAmazonImageUrl(value, true)

    const isShowViewTooltip = isFirstRow && showViewTooltip

    return (
      <>
        {value ? (
          <div className={styles.shopsReportBtnsWrapper}>
            <div className={cx({ [styles.tooltipWrapperMargin]: isShowViewTooltip })}>
              <Text tooltipInfoContent={isShowViewTooltip ? t(TranslationKey['Download the file to your device']) : ''}>
                <a
                  download
                  target={'_blank'}
                  rel={'noreferrer'}
                  href={validLink}
                  className={styles.downloadLink}
                  onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}
                >
                  {t(TranslationKey.View)}
                </a>
              </Text>
            </div>

            <Button
              tooltipInfoContent={isFirstRow ? t(TranslationKey['Copy the link']) : ''}
              className={styles.copyImgButton}
            >
              <CopyValue text={validLink} />
            </Button>
          </div>
        ) : (
          <p>{'-'}</p>
        )}
      </>
    )
  },
)
