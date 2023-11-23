import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './label-with-copy.styles'

import { LinkWithCopy } from '../link-with-copy'

interface LabelWithCopyProps {
  lableLinkTitle: string
  lableLinkTitleSize?: 'medium'
  direction?: 'row' | 'column'
  labelValue?: string
  labelTitle?: string
  labelTitleSize?: 'medium'
  labelTitleFontWeight?: 'bold'
  labelTitleColor?: 'gray'
  labelWrapperStyles?: string
}

export const LabelWithCopy: FC<LabelWithCopyProps> = memo(
  ({
    labelTitle,
    labelValue,
    lableLinkTitle,
    direction,
    labelTitleSize,
    labelTitleFontWeight,
    lableLinkTitleSize,
    labelTitleColor,
    labelWrapperStyles,
  }) => {
    const { classes: styles, cx } = useStyles()

    const validLink = getAmazonImageUrl(labelValue)

    return (
      <div
        className={cx(styles.labelWrapper, labelWrapperStyles, { [styles.labelWrapperColumn]: direction === 'column' })}
      >
        {labelTitle && (
          <p
            className={cx(styles.labelText, {
              [styles.labelTextBold]: labelTitleFontWeight === 'bold',
              [styles.mediumLabelText]: labelTitleSize === 'medium',
              [styles.grayLabelText]: labelTitleColor === 'gray',
            })}
          >{`${labelTitle}:`}</p>
        )}
        {labelValue ? (
          <LinkWithCopy
            title={lableLinkTitle}
            url={validLink}
            valueToCopy={validLink}
            linkTextSize={lableLinkTitleSize}
          />
        ) : (
          <p className={styles.labelText}>{t(TranslationKey['Not available'])}</p>
        )}
      </div>
    )
  },
)
