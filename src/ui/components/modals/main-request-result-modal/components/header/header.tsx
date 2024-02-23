import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CheckCircleIcon } from '@components/shared/svg-icons'

import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './header.styles'

interface HeaderProps {
  isClient: boolean
  executionTime: number
  asin: string
  humanFriendlyId: number
}

export const Header: FC<HeaderProps> = memo(props => {
  const { isClient, executionTime, asin, humanFriendlyId } = props

  const { classes: styles, cx } = useStyles()

  const title = isClient
    ? `${t(TranslationKey['Result of the request'])} / ID ${humanFriendlyId}`
    : t(TranslationKey['Result of the request'])

  return (
    <div className={styles.header}>
      <div className={styles.flexContainer}>
        <CheckCircleIcon className={styles.icon} />
        <p className={cx(styles.title, styles.bold)}>{title}</p>
      </div>

      {isClient ? (
        <div className={styles.flexContainer}>
          <p className={styles.text}>
            <span className={styles.textSecond}>{`${t(TranslationKey['Time to complete'])}: `}</span>
            <span className={styles.bold}>{minsToTime(executionTime)}</span>
          </p>

          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} textStyles={styles.text} />
        </div>
      ) : null}
    </div>
  )
})
