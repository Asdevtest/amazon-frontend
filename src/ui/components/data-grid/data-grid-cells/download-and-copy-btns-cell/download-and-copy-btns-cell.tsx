import { FC, MouseEvent, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'

import { checkIsHasHttp } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './download-and-copy-btns-cell.style'

interface DownloadAndCopyBtnsCellProps {
  value: string
  isFirstRow?: boolean
  showViewTooltip?: boolean
}

export const DownloadAndCopyBtnsCell: FC<DownloadAndCopyBtnsCellProps> = memo(
  ({ value, isFirstRow, showViewTooltip = true }) => {
    const { classes: styles } = useStyles()

    const validLink = checkIsHasHttp(value) ? value : getAmazonImageUrl(value, true)

    const isShowViewTooltip = isFirstRow && showViewTooltip

    return (
      <>
        {value ? (
          <div className={styles.shopsReportBtnsWrapper}>
            <Button
              isTableButton
              variant={ButtonVariant.OUTLINED}
              tooltipInfoContent={isShowViewTooltip ? t(TranslationKey['Download the file to your device']) : ''}
            >
              <a
                download
                target="_blank"
                rel="noreferrer noopener"
                href={validLink}
                className={styles.downloadLink}
                onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}
              >
                {t(TranslationKey.View)}
              </a>
            </Button>

            <Button
              isTableButton
              variant={ButtonVariant.OUTLINED}
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
