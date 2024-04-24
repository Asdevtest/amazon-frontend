import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CheckCircleIcon } from '@components/shared/svg-icons'

import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './header.styles'

interface HeaderProps {
  isClient: boolean
  asin: string
  executionTime: number
  humanFriendlyId: number
}

export const Header: FC<HeaderProps> = memo(props => {
  const { isClient, asin, executionTime, humanFriendlyId } = props

  const { classes: styles, cx } = useStyles()

  const currentRequestId = humanFriendlyId ? ` / ID ${humanFriendlyId}` : ''
  const title = `${t(TranslationKey['Result of the request'])}${currentRequestId}`

  return (
    <div className={styles.header}>
      <div className={styles.flexContainer}>
        <CheckCircleIcon className={styles.icon} />
        <p className={cx(styles.title, styles.bold)}>{title}</p>
      </div>

      <div className={styles.flexContainer}>
        {!isClient ? (
          <p className={styles.text}>
            <span className={styles.textSecond}>{`${t(TranslationKey['Time to complete'])}: `}</span>
            <span className={styles.bold}>{minsToTime(executionTime)}</span>
          </p>
        ) : null}

        <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} textStyles={styles.text} />
      </div>
    </div>
  )
})
